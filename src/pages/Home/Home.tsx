import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import style from './Home.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import React from 'react';
import { differenceInSeconds } from 'date-fns';

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
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  React.useEffect(() => {
    let timer: number;
    if (activeCycle) {
      timer = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifference >= totalSeconds) {
          setCycles(state =>
            state.map(cycle => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
          );
          
          setAmountSecondsPassed(totalSeconds);
          clearInterval(timer);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles(states => [...states, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

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

        <div className={style['countdown-container']}>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <div className={style.separator}>:</div>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </div>

        {activeCycle ? (
          <button
            type='button'
            onClick={handleInterruptCycle}
            className={`${style['countdown-button']} ${style['stop-button']}`}
          >
            <HandPalm size={24} />
            Interromper
          </button>
        ) : (
          <button
            type='submit'
            className={style['countdown-button']}
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Começar
          </button>
        )}
      </form>
    </main>
  );
}
