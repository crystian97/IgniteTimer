import { createGlobalStyle } from "styled-components";

export const GlobalStyle= createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    :focus{
        outline:0;
        box-shadow: 0 0 0 2px ${props=>props.theme['green-500']};
    }
    body{
        background: #333;
        color: #fff;
    }
    body,input,textarea,button{
        font-family: 'Roboto',sans-serif;
        font-weight: bold;
        font-size: 1rem;
    }
`;
