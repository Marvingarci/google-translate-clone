import { Configuration, OpenAIApi ,ChatCompletionRequestMessageRoleEnum } from 'openai'
import { FromLanguage, Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({apiKey})
const openai = new OpenAIApi(configuration)

export async function translate ({
    fromLanguage,
    toLanguage,
    text
}:{
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}){

    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'You are an AI that translates text. You receive a text from the user, Dont answer, just translate the text. The original language is surrounded by `{{` and `}}`. you can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Hola mundo {{Español}} [[English]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Hello world'
        }    
    ]

    const fromCode = fromLanguage == 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `${{text}} {{${{fromCode}}}} [[${{toCode}}]]`
            }
        ]
    })

    return completion.data.choices[0].message?.content
}

