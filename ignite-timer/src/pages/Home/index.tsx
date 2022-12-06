import { useEffect, useState } from 'react';
import{Play} from 'phosphor-react';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
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
  startDate:Date
}
export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const [activeCycleId,setActiveCycleId] = useState<string|null>(null)
  const [amountSecondsPassed,setAmountSecondsPassed] = useState(0)
  const{register,handleSubmit,watch,reset} = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0
    }
  });
 
  function handleCreateNewCycle(data:NewCycleFormData){
    const id=String(new Date().getTime())
    const newCycle:Cycle={
      id,
      task:data.task,
      minutesAmount:data.minutesAmount,
      startDate:new Date()
    }
    setCycles((state)=>[...state,newCycle])
    setActiveCycleId(id)
    reset()
  }
  const activeCycle=cycles.find((cycle)=>cycle.id=== activeCycleId)
  const totalSeconds = activeCycle? activeCycle.minutesAmount *60:0
  const currentSeconds = activeCycle? totalSeconds - amountSecondsPassed:0
  const minutesAmount = Math.floor(currentSeconds/60)
  const secondsAmount = currentSeconds %60
  const minutes = String(minutesAmount).padStart(2,'0')
  const  seconds = String(secondsAmount).padStart(2,'0')
  const task = watch('task')
  const isSubmitDisabled = !task
  useEffect(()=>{
    let interval:number
    if(activeCycle){
      interval=setInterval(()=>{
        setAmountSecondsPassed(differenceInSeconds(new Date(),activeCycle.startDate))
      },1000)
    }
    return ()=>{
      clearInterval(interval)
    }
  },[activeCycle])
return(
  <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        list='listTask'
        type="text" 
        id="task" 
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
            min={5}
            max={60}
            {...register('minutesAmount',{
              valueAsNumber:true
            })}
        />

      <span>minutos.</span>
      </FormContainer>

      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>

      <StartCountDownButton disabled={isSubmitDisabled} type="submit"><Play/> Começar</StartCountDownButton>
    </form>
  </HomeContainer>
)
}
