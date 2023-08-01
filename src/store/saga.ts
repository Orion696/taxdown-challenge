import { put, takeLatest, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure, ActionTypes, EDIT_SUBMISSION, DELETE_SUBMISSION } from './actions';
import api from '../api';

interface TaxesResponse {
  id: string;
  name: string;
  year: string;
}

function* handleLoginRequest(action: ActionTypes): Generator {
  if (action.type === LOGIN_REQUEST) {
    try {
      yield new Promise((resolve) => setTimeout(resolve, 1000));

      const response = (yield call(api.get, '/taxes')) as unknown as AxiosResponse<TaxesResponse[]>;

      const data = response.data;

      console.log(data);

      yield put(loginSuccess(action.payload.username, data));
    } catch (error) {
      yield put(loginFailure('Failed to log in.'));
    }
  }
}

function* handleEditSubmission(action: ActionTypes): Generator {
  if (action.type === EDIT_SUBMISSION) {
    const { taxId, submissionId, updatedSubmission } = action.payload;
    try {
      yield call(api.put, `http://localhost:4000/submissions/${submissionId}`, { taxId, updatedSubmission });

    } catch (error) {
  
    }
  }
}

function* handleDeleteSubmission(action: ActionTypes): Generator {
  if (action.type === DELETE_SUBMISSION) {
    const { taxId, submissionId } = action.payload;
    try {
      yield call(() => api.delete(`http://localhost:4000/submissions/${submissionId}?taxId=${taxId}`));

    } catch (error) {
     
    }
  }
}

export function* watchLoginRequest(): Generator {
  yield takeLatest(LOGIN_REQUEST, handleLoginRequest);
}

export function* watchEditAndDeleteSubmissions(): Generator {
  yield takeLatest(EDIT_SUBMISSION, handleEditSubmission);
  yield takeLatest(DELETE_SUBMISSION, handleDeleteSubmission);
}
