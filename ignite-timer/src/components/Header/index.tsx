import { HeaderContainer } from "./styles";
import {Timer,Scroll} from 'phosphor-react';
import {NavLink} from 'react-router-dom'
import LogoIgnite from '../../assets/Logo.svg';
export function Header(){
    return( 
    <HeaderContainer>
        <img src={LogoIgnite} alt="" />
        <nav>
            <NavLink to="/" title="timer">
                <Timer size={24}/>
            </NavLink>
            <NavLink to="/history" title="Histórico">
                <Scroll size={24}/>
            </NavLink>
        </nav>
    </HeaderContainer>
    )
}