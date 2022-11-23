import styled ,{css}from 'styled-components'
export type ButtonVaiant = 'primary' |'secondary'|'danger'|'success' | 'neutral';
interface ButtonContainerProps{
    variant?:ButtonVaiant;
}
const buttonVariants={
    primary:'purple',
    secondary:'orange',
    danger:'red',
    success:'green'

}
export const ButtonContainer= styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    background-color: ${props=>props.theme.primary};
    color:${props=>props.theme.white};

    /* ${props=>{
        return css`background-color:${buttonVariants[props.variant]}`
    }} */
`;