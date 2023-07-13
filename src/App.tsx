import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack} from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrorIcon } from './components/icons';
import { LanguageSelector } from './components/LanguageSelector';
import { TextArea } from './components/TextArea';
import { SectionType } from './components/SectionType';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const { loading, fromLanguage, toLanguage, result, fromText, interchangeLanguages,  setFromLanguage, setToLanguage, setFromText, setResult } = useStore()
  console.log(fromLanguage, toLanguage)
 
  const debouncedFromText = useDebounce(fromText, 1000)

  useEffect(()=>{
    if(debouncedFromText=='') return

    translate({fromLanguage, toLanguage, text: debouncedFromText})
    .then(result =>{
      if(result == null) return
      setResult(result)
    })
    .catch(()=> setResult('Error'))
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <>
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
            type='from'
            value={fromLanguage}
            onChange={setFromLanguage}/>
            <TextArea 
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant="link" disabled={fromLanguage == AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrorIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
            type='to'
            value={toLanguage}
            onChange={setToLanguage}/>
            <TextArea
            type={SectionType.To}
            value={result}
            onChange={setResult}
            loading={loading}
            />
          </Stack>
        </Col>

      </Row>
      <button onClick={() => setFromLanguage('es')}>Cambiar a Español</button>
    </Container>
    </>
  )
}

export default App
