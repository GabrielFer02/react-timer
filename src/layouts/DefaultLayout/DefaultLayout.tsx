import { Outlet } from 'react-router-dom';
import style from "./DefaultLayout.module.css";
import { Header } from '../../components/Header/Header';

export function DefaultLayout() {
  return (
    <div className={style['layout-container']}>
      <Header />
      <Outlet />
    </div>
  );
}
