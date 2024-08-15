import { useEffect, useState } from 'react';
import moment from 'moment';
import Spinner from './Spinner';

const DateTimeComponent = () => {
  const [dateTime, setDateTime] = useState<string | null>(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(moment().format('MMMM Do YYYY, h:mm a'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <>{dateTime ? <>{dateTime}</> : <Spinner />}</>;
};

export default DateTimeComponent;
