import { variables } from '../constants/Variables';

export const getJabberUserId = (bearer: string): string =>
  `${bearer}@${variables.jabberDomain}`;

export const wssGenerator = (url: string) => {
  if (
    ['wss://', 'ws://', 'http://', 'https://'].some(protocol =>
      url.includes(protocol)
    )
  ) {
    return url;
  }
  return `wss://${url}`;
};
