import { createContext } from 'react';

type ConfigContextPropTypes = {
  url: string;
  togglApyKey: string;
  comment: string;
  commentReplace: string;
  jiraUserEmail: string;
  merge: boolean;
  jumpToToday: boolean;
  showDayTotal: boolean;
};

export const ConfigContext = createContext({} as ConfigContextPropTypes);
