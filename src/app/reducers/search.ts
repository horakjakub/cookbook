import * as search from '../actions/search';

export interface State {
  labels: string[];
  loading: boolean;
  query: string;
}

const initialState: State = {
  labels: [],
  loading: false,
  query: ''
};

export function reducer(state = initialState, action: search.Actions): State {
  switch (action.type) {
    case search.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          labels: [],
          loading: false,
          query
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case search.SEARCH_COMPLETE: {
      const search = action.payload;
      
      return {
        labels: search.map(recipe => recipe.label),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}

export const getLabels = (state: State) => state.labels;
export const getQuery = (state: State) => state.query;
export const getLoading = (state: State) => state.loading;
