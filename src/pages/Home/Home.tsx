import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import style from './Home.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import React from 'react';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = React.useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles(states => [...states, newCycle]);
    setActiveCycleId(id);
    reset();
  }

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <main className={style['home-container']}>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />

          <span>minutos.</span>
        </div>

        <div className={style['countdown-container']}>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <div className={style.separator}>:</div>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </div>

        <button
          type='submit'
          className={style['countdown-button']}
          disabled={isSubmitDisabled}
        >
          <Play size={24} />
          Começar
        </button>
      </form>
    </main>
  );
}
