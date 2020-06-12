import React from 'react';
import {SelectAllLinkStyled, TasksListStyled} from './tasks-list.styles';

const TasksList = () => {
  function  selectAll() {
    return true;
  }

  return (
    <TasksListStyled>
      <table>
        <thead>
        <tr>
          <th>
            <SelectAllLinkStyled href="#" title="Selecionar todas as demandas" onClick={() => selectAll()}>
              #
            </SelectAllLinkStyled>
          </th>
          <th>Demanda</th>
          <th className="text-left">Comentário</th>
          <th>Data</th>
          <th>Hr. Inicial</th>
          <th>Hr. Final</th>
          <th>Duração</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody></tbody>
      </table>
    </TasksListStyled>
  );
};

export default TasksList;
