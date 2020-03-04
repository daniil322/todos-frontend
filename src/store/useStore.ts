import { RootStore } from './RootStore'
import { useContext } from 'react';
import { StoreContext } from './StoreProvider';



export const useStore = (): RootStore => useContext(StoreContext);