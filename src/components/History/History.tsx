import style from './History.module.css';

export function History() {
  return (
    <main className={style['history-container']}>
      <h1>History</h1>
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <span className={`${style.status} ${style['green']}`}>Concluído</span>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <span className={`${style.status} ${style['yellow']}`}>Em andamento</span>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <span className={`${style.status} ${style['red']}`}>Interrompido</span>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <span className={style.status}>Status</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
