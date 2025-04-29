import { CyclesContext } from '../../contexts/CyclesContext';
import style from './History.module.css';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function History() {
  const { cycles } = React.useContext(CyclesContext);
  return (
    <main className={style['history-container']}>
      <h1>Meu Histórico</h1>

      <div className={style['history-list']}>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, { addSuffix: true, locale: ptBR })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <span className={`${style.status} ${style['green']}`}>
                        Concluído
                      </span>
                    )}

                    {cycle.interruptedDate && (
                      <span className={`${style.status} ${style['red']}`}>
                        Interrompido
                      </span>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <span className={`${style.status} ${style['yellow']}`}>
                        Em Andamento
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
