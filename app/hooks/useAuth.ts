import {useMemo} from 'react';
import {useAppSelector} from './useAppSelector';

export default function useAuth() {
  const appSelector = useAppSelector(
    (state: {globalStoreSlice: {user: any}}) => state.globalStoreSlice.user,
  );
  return useMemo(() => appSelector, [appSelector]);
}
