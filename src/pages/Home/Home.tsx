import { Play } from 'phosphor-react';
import style from "./Home.module.css";

export function Home() {
  return (
    <main className={style['home-container']}>
      <form action=''>
        <div className={style['form-container']}>
          <label htmlFor='task'>Vou trabalhar em</label>
          <input id='task' />

          <label htmlFor='minutesAmount'>durante</label>
          <input type='number' id='minutesAmount' />

          <span>minutos.</span>
        </div>

        <div className={style['countdown-container']}>
          <span>0</span>
          <span>0</span>
          <div className={style.separator}>:</div>
          <span>0</span>
          <span>0</span>
        </div>

        <button type='submit'>
          <Play size={24}/>
          Começar
        </button>
      </form>
    </main>
  );
}
