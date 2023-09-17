export const useLocalStorage = (storage: string) => {
  const store = localStorage.getItem(`${storage}`);
  const json = JSON.parse(store as string);

  return json;
};
