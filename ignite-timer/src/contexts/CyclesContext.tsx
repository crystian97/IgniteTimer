import { createContext, ReactNode, useState, useReducer  } from "react";
interface CreateCycleData{
    task:string
    minutesAmount:number
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  interruptedDate?: Date;
  finishedDate?: Date;
  startDate: Date;
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
  const [cyclesState, dispatch] = useReducer((state:CyclesState,action:any)=>{
    if(action.type=== 'ADD_NEW_CYCLE'){
      return {
        ...state,
        cycles:[...state.cycles,action.payload.newCycle],
        activeCycleId:action.payload.newCycle.id
      }

    }
    return state
  },{
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
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    dispatch({
      type:'MARK_CURRENT_CYCLE_AS_FINISH',
      payload:{
        activeCycleId
      },
    })
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    // setCycles((state) => [...state, newCycle]);
    dispatch({
      type:'ADD_NEW_CYCLE',
      payload:{
        newCycle,
      },
    })
    setAmountSecondsPassed(0);
    
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    dispatch({
      type:'INTERRUPT_CURRENT_CYCLE',
      payload:{
        activeCycleId,
      },
    })
    setActiveCycleId(null);
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
