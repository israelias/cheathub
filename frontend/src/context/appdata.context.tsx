import React from 'react';
// import { setInitialData } from '../lib/axios';

export interface Data extends Snippet {}
type AppDataType = {
  data: Data[] | undefined;
  setData: (data: Data[]) => void;
};
const AppData = React.createContext<AppDataType>(undefined!);

export function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data, status } = useQuery('initialData', () =>
  //   setInitialData({})
  // );

  const [data, setData] = React.useState<Data[] | undefined>(
    undefined
  );
  return (
    <AppData.Provider value={{ data, setData }}>
      {children}
    </AppData.Provider>
  );
}

export const useAppData = () => React.useContext(AppData);
