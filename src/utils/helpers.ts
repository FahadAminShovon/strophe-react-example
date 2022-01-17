import { variables } from '../constants/Variables';

export const getJabberUserId = (bearer: string): string => {
  return `${bearer}@${variables.jabberDomain}`;
};

export const wssGenerator = (url: string) => `wss://${url}`;
