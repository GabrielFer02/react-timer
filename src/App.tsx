import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import './style/global.css';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
