import { Play } from 'phosphor-react';
import style from './Home.module.css';

export function Home() {
  return (
    <main className={style['home-container']}>
      <form action=''>
        <div className={style['form-container']}>
          <label htmlFor='task'>Vou trabalhar em</label>
          <input
            list='task-suggestions'
            placeholder='Dê um nome para o seu projeto'
            className={style['task-input']}
          />

          <datalist id='task-suggestions'>
            <option value='Projeto 1' />
            <option value='Projeto 2' />
            <option value='Projeto 3' />
            <option value='Banana' />
          </datalist>

          <label htmlFor='minutesAmount'>durante</label>
          <input
            type='number'
            id='minutesAmount'
            placeholder='00'
            step={5}
            min={5}
            max={60}
            className={style['minutes-input']}
          />

          <span>minutos.</span>
        </div>

        <div className={style['countdown-container']}>
          <span>0</span>
          <span>0</span>
          <div className={style.separator}>:</div>
          <span>0</span>
          <span>0</span>
        </div>

        <button type='submit' className={style['countdown-button']} disabled>
          <Play size={24} />
          Começar
        </button>
      </form>
    </main>
  );
}
