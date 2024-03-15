interface UseLocalStorageState<T> {
  setValue: (key: string, value: T) => void;
  getValue: (key: string) => T;
}

const useLocalStorage = <T,>(): UseLocalStorageState<T> => {
  const setValue = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getValue = (key: string): T => {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  };

  return {
    getValue,
    setValue,
  };
};

export default useLocalStorage;
