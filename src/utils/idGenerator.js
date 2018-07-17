export const idGenerator = (() => {
  let lastId = 0;

  return {
    next: () => ++lastId
  }
})();
