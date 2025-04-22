import style from './Header.module.css';
import logo from '../../assets/Logo.svg';
import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className={style['header-container']}>
      <img src={logo} alt='' />
      <nav>
        <NavLink to='/' title='Timer'>
          <Timer size={24} />
        </NavLink>
        <NavLink to='/history' title='Histórico'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </header>
  );
}
