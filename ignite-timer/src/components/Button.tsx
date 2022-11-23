import styles from './Button.module.css';
import { ButtonContainer, ButtonVaiant } from './Button.styles';
interface ButtonProps{
    variant?:ButtonVaiant;
}

export function Button({variant = 'primary'}:ButtonProps){
    return(
        <ButtonContainer variant={variant}>Enviar</ButtonContainer>
    )
}