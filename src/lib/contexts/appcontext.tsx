import { Dispatch, SetStateAction, createContext, useState } from "react";
import { DEFAULT_APP_STATE } from "../constants";

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface UseAppStateProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

const useAppState = (): UseAppStateProps => {
  const [appState, setAppState] = useState<AppState>(DEFAULT_APP_STATE);
  return { appState, setAppState };
};

const AppContext = createContext<UseAppStateProps>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <AppContext.Provider value={useAppState()}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
