import moment from 'moment';

export const changeToGapTime = (before: Date, now: Date) => {
  let seconds = moment.duration(moment(before).diff(moment(now))).asSeconds();
  seconds = Math.round(seconds);
  if (seconds < 60) {
    return seconds + '초전';
  } else if (seconds < 60 * 60) {
    return seconds + '분전';
  } else if (seconds < 60 * 60 * 24) {
    return seconds + '일전';
  }
};
