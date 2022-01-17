import { variables } from '../constants/Variables';

export const getJabberUserId = (bearer: string): string => {
  return `${bearer}@${variables.jabberDomain}`;
};

export const wssGenerator = (url: string) => {
  if (
    ['wss://', 'ws://', 'http://', 'https://'].some((protocol) =>
      url.includes(protocol)
    )
  ) {
    return url;
  }
  return `wss://${url}`;
};

export const executeFunction = (func: Function | undefined | null) => {
  if (typeof func === 'function') {
    func();
  }
};
