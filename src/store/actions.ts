export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const ADD_SUBMISSION = 'ADD_SUBMISSION';
export const LOAD_SUBMISSIONS = 'LOAD_SUBMISSIONS';

export const EDIT_SUBMISSION = 'EDIT_SUBMISSION';
export const DELETE_SUBMISSION = 'DELETE_SUBMISSION';

export const LOGOUT = 'LOGOUT';

interface LogoutAction {
  type: typeof LOGOUT;
}

interface EditSubmissionAction {
  type: typeof EDIT_SUBMISSION;
  payload: { taxId: string; submissionId: string; updatedSubmission: any };
}

interface DeleteSubmissionAction {
  type: typeof DELETE_SUBMISSION;
  payload: { taxId: string; submissionId: string };
}

interface AddSubmissionAction {
  type: typeof ADD_SUBMISSION;
  payload: { taxId: string; submission: any };
}

interface LoadSubmissionsAction {
  type: typeof LOAD_SUBMISSIONS;
  payload: { taxId: string; submissions: any[] };
}


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

export type ActionTypes = LogoutAction | LoginRequestAction | LoginSuccessAction | LoginFailureAction | AddSubmissionAction | LoadSubmissionsAction | EditSubmissionAction | DeleteSubmissionAction;

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

export const addSubmission = (taxId: string, submission: any): ActionTypes => ({
  type: ADD_SUBMISSION,
  payload: { taxId, submission },
});

export const loadSubmissions = (taxId: string, submissions: any[]): ActionTypes => ({
  type: LOAD_SUBMISSIONS,
  payload: { taxId, submissions },
});

export const editSubmission = (taxId: string, submissionId: string, updatedSubmission: any): ActionTypes => ({
  type: EDIT_SUBMISSION,
  payload: { taxId, submissionId, updatedSubmission },
});

export const deleteSubmission = (taxId: string, submissionId: string): ActionTypes => ({
  type: DELETE_SUBMISSION,
  payload: { taxId, submissionId },
});

export const logout = (): ActionTypes => ({
  type: LOGOUT,
});