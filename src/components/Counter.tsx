import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchHitCount } from '../state/hitCounterSlice';
import Spinner from './common/Spinner';

const Counter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hits = useSelector((state: RootState) => state.hitCounter.hits);
  const status = useSelector((state: RootState) => state.hitCounter.status);
  const error = useSelector((state: RootState) => state.hitCounter.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHitCount());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return <>{hits}</>;
};

export default Counter;
