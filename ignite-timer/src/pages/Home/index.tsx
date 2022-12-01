import{Play} from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmount, Separator, StartCountDownButton, TaskInput } from './styles';
export function Home() {
return(
  <HomeContainer>
    <form action="">
      <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        type="text" 
        id="task" 
        placeholder='Dê um nome para seu projeto' 
      />
      <datalist>
        <option value="projeto 1"/>
        <option value="projeto 2"/>
        <option value="projeto 3"/>
        <option value="Banana"/>

      </datalist>

      <label htmlFor="minutesAmout">durante</label>
      <MinutesAmount 
            type="number" 
            id="minutesAmount" 
            placeholder='00' 
            step={5}
            min={5}
            max={60}
        />

      <span>minutos.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountDownButton disabled type="submit"><Play/> Começar</StartCountDownButton>
    </form>
  </HomeContainer>
)
}
