import { FormContainer, MinutesAmount, TaskInput } from "./styles";

export function NewCycleForm(){
    return(<FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          list='listTask'
          type="text" 
          id="task" 
          disabled={!!activeCycle}
          placeholder='Dê um nome para seu projeto'
          {...register('task')}
  
        />
        <datalist id='listTask'>
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
              min={1}
              max={60}
              {...register('minutesAmount',{
                valueAsNumber:true
              })}
              disabled={!!activeCycle}
          />
  
        <span>minutos.</span>
        </FormContainer>)
}