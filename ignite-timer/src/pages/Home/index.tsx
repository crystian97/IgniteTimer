import { createContext, useEffect, useState } from 'react';
import{HandPalm, Play} from 'phosphor-react';
import {useForm} from 'react-hook-form'
import { differenceInSeconds } from 'date-fns';
import {  HomeContainer, 
         StartCountDownButton, StopCountDownButton } from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle{
  id:string
  task:string
  minutesAmount:number
  interruptedDate?:Date
  finishedDate?:Date
}
interface CyclesContextType{
  activeCycle:Cycle|undefined,
  activeCycleId:string | null
}
export const CyclesContext = createContext({} as CyclesContextType) 
export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const [activeCycleId,setActiveCycleId] = useState<string|null>(null)
  
 
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
  
  
return(
  <HomeContainer>
    <CyclesContext.Provider value={{activeCycle,activeCycleId}}>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      <NewCycleForm/>
      <Countdown />
      </CyclesContext.Provider>

      {activeCycle?(
        <StopCountDownButton onClick={handleInterruptCycle} type="button"><HandPalm/> Interromper</StopCountDownButton>
      ):(
      <StartCountDownButton disabled={isSubmitDisabled} type="submit"><Play/> Começar</StartCountDownButton>

      )}
    </form>
  </HomeContainer>
)
}
