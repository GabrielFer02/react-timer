import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import style from './Home.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import React from 'react';
import { NewCycleForm } from './components/NewCycleForm/NewCycleForm';
import { CountDown } from './components/CountDown/CountDown';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    React.useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <main className={style['home-container']}>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <button
            type='button'
            onClick={interruptCurrentCycle}
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
