import { ActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, ADD_SUBMISSION,LOAD_SUBMISSIONS,EDIT_SUBMISSION, DELETE_SUBMISSION } from './actions';

export interface RootState {
  username: string | null;
  isLoading: boolean;
  error: string | null;
  taxes: { id: string, name: string, year: string }[];
  submissions: { [taxId: string]: any[] };
}


const initialState: RootState = {
  username: null,
  isLoading: false,
  error: null,
  taxes: [],
  submissions: {},
};


const reducer = (state = initialState, action: ActionTypes): RootState => {
  switch (action.type) {
    case EDIT_SUBMISSION: {
      const { taxId, submissionId, updatedSubmission } = action.payload;
      return { 
        ...state, 
        submissions: { 
          ...state.submissions, 
          [taxId]: state.submissions[taxId]?.map(submission => 
            submission.id === submissionId ? updatedSubmission : submission
          ) 
        } 
      };
    }
    case DELETE_SUBMISSION: {
      const { taxId, submissionId } = action.payload;
      return { 
        ...state, 
        submissions: { 
          ...state.submissions, 
          [taxId]: state.submissions[taxId]?.filter(submission => 
            submission.id !== submissionId
          ) 
        } 
      };
    }
    case ADD_SUBMISSION: {
      const { taxId, submission } = action.payload;
      return { ...state, submissions: { ...state.submissions, [taxId]: [...state.submissions[taxId] || [], submission] } };
    }
    case LOAD_SUBMISSIONS: {
      const { taxId, submissions } = action.payload;
      return { ...state, submissions: { ...state.submissions, [taxId]: submissions } };
    }
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
