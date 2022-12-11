import { createContext, ReactNode, useState } from "react";
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
export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({children}:CycleContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    // reset();
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
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