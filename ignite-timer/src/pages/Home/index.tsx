import { createContext, useEffect, useState } from 'react';
import{HandPalm, Play} from 'phosphor-react';
import {FormProvider, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import {  HomeContainer, 
         StartCountDownButton, StopCountDownButton } from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle{
  id:string
  task:string
  minutesAmount:number
  interruptedDate?:Date
  finishedDate?:Date,
  startDate: Date

}
interface CyclesContextType{
  activeCycle:Cycle|undefined,
  activeCycleId:string | null,
  amountSecondsPassed:number,
  setSecondsAmountPassed:(seconds:number)=>void,
  markCurrentCycleAsFinished: () => void

}
export const CyclesContext = createContext({} as CyclesContextType) 
const newCycleValidationSchema=zod.object({
  task:zod.string().min(1,'Informe a tarefa'),
  minutesAmount:zod.number().min(1,'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'o ciclo precisa ser no máximo 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const [activeCycleId,setActiveCycleId] = useState<string|null>(null)
  const [amountSecondsPassed,setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0
    }
  });
  const {handleSubmit,watch,reset} = newCycleForm
  const activeCycle=cycles.find((cycle)=>cycle.id=== activeCycleId)

 function setSecondsPassed(seconds:number){
  setAmountSecondsPassed(seconds)

 }
  function markCurrentCycleAsFinished(){
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }
  function handleCreateNewCycle(data: NewCycleFormData){
    const id = String(new Date().getTime())
    const newCycle:Cycle={
      id,
      task:data.task,
      minutesAmount:data.minutesAmount,
      startDate:new Date(),
    
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
  

  const task = watch('task')
  const isSubmitDisabled = !task
  
  
return(
  <HomeContainer>
 
  <form onSubmit={handleSubmit(handleCreateNewCycle)} >
      <CyclesContext.Provider value={{activeCycle,activeCycleId,amountSecondsPassed,setSecondsAmountPassed, markCurrentCycleAsFinished
}}>
      <FormProvider {...newCycleForm}>
        <NewCycleForm/>
      </FormProvider>

      <Countdown />
      </CyclesContext.Provider >

      {activeCycle?(
        <StopCountDownButton onClick={handleInterruptCycle} type="button"><HandPalm/> Interromper</StopCountDownButton>
      ):(
      <StartCountDownButton disabled={isSubmitDisabled} type="submit"><Play/> Começar</StartCountDownButton>

      )}
  </form>
  </HomeContainer>
)
}
