import { useState } from "react";

interface APIState<T> {
  data: T;
  getData: (url: string) => Promise<T>;
}

const useApi = <T,>(): APIState<T> => {
  const [data, setData] = useState<T>();

  const getData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);

      return Promise.resolve(data);
    } catch (error) {
      console.error(error);
      Promise.reject(error);
    }
  };

  return { data, getData };
};

export default useApi;
