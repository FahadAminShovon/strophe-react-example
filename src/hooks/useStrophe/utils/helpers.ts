export const executeFunction = (func: Function | undefined | null) => {
  if (typeof func === 'function') {
    func();
  }
};
