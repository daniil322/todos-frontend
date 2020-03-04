import { createContext } from 'react';
import {  RootStore } from './RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;