import { createContext } from 'react';

type TaskPropTypes = {};

type TasksContextPropTypes = {
  tasks: Array<TaskPropTypes>;
};

export const TasksContext = createContext({} as TasksContextPropTypes);
