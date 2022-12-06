import { useEffect, useState } from 'react';
import{HandPalm, Play} from 'phosphor-react';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
import * as zod from 'zod';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmount, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './Countdown';
const newCycleValidationSchema=zod.object({
  task:zod.string().min(1,'Informe a tarefa'),
  minutesAmount:zod.number().min(1,'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'o ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>
interface Cycle{
  id:string
  task:string
  minutesAmount:number
  startDate:Date
  interruptDate?:Date
  finishedDate?:Date
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
    setAmountSecondsPassed(0)
    reset()
  }
  function handleInterruptCycle(){
    setCycles(
      (state)=> state.map((cycle)=>{
        if(cycle.id===activeCycleId){
          return {...cycle,interruptDate:new Date()}
        }else{
          return cycle
        }
      }),
    )
    setActiveCycleId(null)

  }
  const activeCycle=cycles.find((cycle)=>cycle.id=== activeCycleId)
  const totalSeconds = activeCycle? activeCycle.minutesAmount *60:0
  const currentSeconds = activeCycle? totalSeconds - amountSecondsPassed:0
  const minutesAmount = Math.floor(currentSeconds/60)
  const secondsAmount = currentSeconds %60
  const minutes = String(minutesAmount).padStart(2,'0')
  const  seconds = String(secondsAmount).padStart(2,'0')

  useEffect(()=>{
    if(activeCycle)
      document.title= `${minutes}:${seconds}`
  },[minutes,seconds,activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task
  useEffect(()=>{
    let interval:number
    if(activeCycle){
      interval=setInterval(()=>{
        const secondsDifference = differenceInSeconds(new Date(),activeCycle.startDate)
        if(secondsDifference>= totalSeconds){
          setCycles(
            (state)=> state.map((cycle)=>{
              if(cycle.id===activeCycleId){
                return {...cycle,finishedDate:new Date()}
              }else{
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        }else{
          setAmountSecondsPassed(secondsDifference)
        }
      },1000)
    }
    return ()=>{
      clearInterval(interval)
    }
  },[activeCycle,totalSeconds,activeCycleId])
  
return(
  <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      <NewCycleForm/>
      <Countdown/>

      {activeCycle?(
        <StopCountDownButton onClick={handleInterruptCycle} type="button"><HandPalm/> Interromper</StopCountDownButton>
      ):(
      <StartCountDownButton disabled={isSubmitDisabled} type="submit"><Play/> Começar</StartCountDownButton>

      )}
    </form>
  </HomeContainer>
)
}
