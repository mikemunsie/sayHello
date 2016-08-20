import { GIPHY_SEARCH, GIPHY_RECEIVE_SEARCH } from "./giphySearchActions";

const defaultState = {
  criteria: "",
  posts: []
}

export const GiphySearch = (state = defaultState, action) => {
  switch (action.type) {
    case GIPHY_SEARCH:
      return {
        ...state,
        criteria: action.criteria
      };
    case GIPHY_RECEIVE_SEARCH:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
}