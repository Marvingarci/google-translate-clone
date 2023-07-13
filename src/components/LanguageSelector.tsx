import {Form} from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { FromLanguage, Language } from '../types'

// interface Props {
//     onChange : (language: Language) => void
// }

type Props= 
| { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: 'to', value: Language, onChange: (language: Language) => void }

// React.FC<you can say what you passing as props here using interface>
export const LanguageSelector = ({onChange, type, value}: Props) =>{

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        onChange(event.target.value as Language)
    }
    return(
        <Form.Select onChange={handleChange} value={value} aria-label='Seleccion el idioma'>
            {type == 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                    <option value={key} key={key}>{value}</option>
                ))
            }
        </Form.Select>
    )
}