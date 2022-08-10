import createCheckin from './createCheckin.api';
import getListCheckin from './getListCheckin.api';
import findCheckin from './findCheckin.api';

export default {
  '/checkin/create-checkin': { ...createCheckin },
  '/checkin/get-list-checkin/{userId}': { ...getListCheckin },
  '/checkin/find-checkin/{userId}?date={date}': { ...findCheckin },
};
