import createRequest from './createRequest.api';
import updateRequest from './updateRequest.api';
import deleteRequest from './deleteRequest.api';
import getAllRequest from './getAllRequest.api';
import findRequestById from './findRequestById.api';
import findRequestByState from './findRequestByState.api';
import getListRequest from './getListRequest.api';
import getListRequestStaff from './getListRequestStaff.api';

export default {
  '/request/create-request': { ...createRequest },
  '/request/update-request/{requestId}': { ...updateRequest },
  '/request/delete-request/{requestId}': { ...deleteRequest },
  '/request/get-all-request': { ...getAllRequest },
  '/request/get-list-request/{userId}': { ...getListRequest },
  '/request/get-list-request-of-staff?emailManager={emailManager}': { ...getListRequestStaff },
  '/request/find-request-by-id/{requestId}': { ...findRequestById },
  '/request/find-request-by-state?state={state}': { ...findRequestByState },
};
