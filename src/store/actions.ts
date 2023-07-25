export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: { username: string; password: string };
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { username: string; taxes: any[] };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: { error: string };
}

export type ActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction;

export const loginRequest = (username: string, password: string): ActionTypes => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (username: string, taxes: any[]): ActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { username, taxes },
});

export const loginFailure = (error: string): ActionTypes => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
