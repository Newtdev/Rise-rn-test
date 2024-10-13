import {useMemo} from 'react';
import {useAppSelector} from './useAppSelector';

export default function useAuthUser() {
  const userSelector = useAppSelector(state => state.globalStoreSlice.user);
  return useMemo(() => userSelector, [userSelector]);
}
