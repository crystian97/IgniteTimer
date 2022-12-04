import { useState } from 'react';
import{Play} from 'phosphor-react';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmount, Separator, StartCountDownButton, TaskInput } from './styles';
const newCycleValidationSchema=zod.object({
  task:zod.string().min(1,'Informe a tarefa'),
  minutesAmount:zod.number().min(5,'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'o ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>
interface Cycle{
  id:string
  task:string
  minutesAmount:number
}
export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const{register,handleSubmit,watch,reset} = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0
    }
  });
  function handleCreateNewCycle(data:NewCycleFormData){
    console.log(data)
    reset()
  }
  const task = watch('task')
  const isSubmitDisabled = !task
  
return(
  <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        type="text" 
        id="task" 
        placeholder='Dê um nome para seu projeto'
        {...register('task')}

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
            // max={60}
            {...register('minutesAmount',{
              valueAsNumber:true
            })}
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

      <StartCountDownButton disabled={isSubmitDisabled} type="submit"><Play/> Começar</StartCountDownButton>
    </form>
  </HomeContainer>
)
}
