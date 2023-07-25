import { put, takeLatest, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure, ActionTypes } from './actions';
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


export function* watchLoginRequest(): Generator {
  yield takeLatest(LOGIN_REQUEST, handleLoginRequest);
}
