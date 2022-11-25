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
    border-radius: 4px;
    border: 0;
    background-color: ${props=>props.theme['green-700']};
    color:${props=>props.theme['gray-300']};

`;