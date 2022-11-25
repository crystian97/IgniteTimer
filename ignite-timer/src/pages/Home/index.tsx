import{Play} from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer } from './styles';
export function Home() {
return(
  <HomeContainer>
    <form action="">
      <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <input type="text" id="Task" />

      <label htmlFor="minutesAmout">durante</label>
      <input type="number" id="minutesAmount" />

      <span>minutos.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <span>:</span>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <button type="submit"><Play/> Começar</button>
    </form>
  </HomeContainer>
)
}
