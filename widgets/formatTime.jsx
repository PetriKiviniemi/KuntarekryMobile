import { format } from 'date-fns';

// Returns formatted timestamp
const formatTime = (timeStamp) => {
  return format(new Date(timeStamp), 'dd.MM.yyyy kk:mm')
}

export default formatTime;
