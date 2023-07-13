import {Form } from 'react-bootstrap'
import { SectionType } from './SectionType'

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string 
}

const commonStyles = { height: '200px'}

const getPlaceholder = ({type, loading}: {type: SectionType, loading?: boolean})=>{
    if(type == SectionType.From) return 'Introducir texto'
    if(loading == true) return 'Cargando...'
    return 'Traduccion'
}

export const TextArea = ({ type, loading, value, onChange}: Props) => {
    const styles = type == SectionType.From 
    ?  commonStyles
    :  {...commonStyles, backgroundColor: '#f5f5f5'}

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        onChange(event.target.value)
    }

    return(
        <Form.Control 
        as='textarea'
        onChange={handleChange}
        value={value}
        placeholder={getPlaceholder({type, loading})}
        autoFocus={type == SectionType.From}
        style={styles}
        />
    )
}