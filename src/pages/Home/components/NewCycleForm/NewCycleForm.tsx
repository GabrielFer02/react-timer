import { useFormContext } from 'react-hook-form';
import style from './NewCycleForm.module.css';
import React from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
  const { activeCycle } = React.useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <div className={style['form-container']}>
      <datalist id='task-suggestions'>
        <option value='Projeto 1' />
        <option value='Projeto 2' />
        <option value='Projeto 3' />
        <option value='Banana' />
      </datalist>

      <label htmlFor='task'>Vou trabalhar em</label>
      <input
        id='task'
        list='task-suggestions'
        placeholder='Dê um nome para o seu projeto'
        className={style['task-input']}
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor='minutesAmount'>durante</label>
      <input
        type='number'
        id='minutesAmount'
        placeholder='00'
        step={5}
        min={5}
        max={60}
        className={style['minutes-input']}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </div>
  );
}
