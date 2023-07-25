import { ActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

export interface RootState {
  username: string | null;
  isLoading: boolean;
  error: string | null;
  taxes: { id: string, name: string, year: string }[];
}


const initialState: RootState = {
  username: null,
  isLoading: false,
  error: null,
  taxes: [],
};


const reducer = (state = initialState, action: ActionTypes): RootState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
      case LOGIN_SUCCESS:
        return { ...state, isLoading: false, username: action.payload.username, taxes: action.payload.taxes };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default reducer;
