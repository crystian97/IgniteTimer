import { createContext, ReactNode, useState, useReducer  } from "react";
import {  Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction, interruptedDateAction, markCurrentCycleAsFinishedAction } from "./actions";
interface CreateCycleData{
    task:string
    minutesAmount:number
}


interface CyclesContextType {
  cycles:Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
  createNewCycle:(data:CreateCycleData) =>void
  interruptCurrentCycle:()=>void

}
interface CycleContextProviderProps{
    children:ReactNode
}
interface CyclesState{
  cycles:Cycle[]
  activeCycleId:string|null
}
export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({children}:CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,{
    cycles:[],
    activeCycleId:null
  });
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const{activeCycleId,cycles} = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0);
    
  }

  function interruptCurrentCycle() {
  
    dispatch(interruptedDateAction())
  }
  return(
  <CyclesContext.Provider
    value={{
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      setSecondsPassed,
      markCurrentCycleAsFinished,
      createNewCycle,
      interruptCurrentCycle,
      cycles
    }}
  >{children}</CyclesContext.Provider>
  )
}
