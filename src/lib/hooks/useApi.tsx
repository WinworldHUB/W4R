import { useState } from "react";
import { API_BASE_URL } from "../constants/api-constants";

interface APIState<T> {
  data: T;
  getData: (url: string) => Promise<T>;
  postData: (url: string, body: string) => Promise<T>;
}

const useApi = <T,>(): APIState<T> => {
  const [data, setData] = useState<T>();

  const getData = async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "GET",
      });
      const data = await response.json();
      setData(data);

      return Promise.resolve(data);
    } catch (error) {
      console.error(error);
      Promise.reject(error);
    }
  };

  const postData = async (url: string, body: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      setData(data);

      return Promise.resolve(data);
    } catch (error) {
      console.error(error);
      Promise.reject(error);
    }
  };

  return { data, getData, postData };
};

export default useApi;
