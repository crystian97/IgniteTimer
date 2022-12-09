import { useForm, useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmount, TaskInput } from "./styles";
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useContext } from "react";
import { CyclesContext } from "../..";

const newCycleValidationSchema=zod.object({
  task:zod.string().min(1,'Informe a tarefa'),
  minutesAmount:zod.number().min(1,'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'o ciclo precisa ser no máximo 60 minutos'),
})

export function NewCycleForm(){
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()
 
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
              
              {...register('minutesAmount',{
                valueAsNumber:true
              })}
              disabled={!!activeCycle}
          />
  
        <span>minutos.</span>
        </FormContainer>)
}