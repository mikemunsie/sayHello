export const GIPHY_SEARCH = 'GIPHY_SEARCH';
export const GIPHY_RECEIVE_SEARCH = 'GIPHY_RECEIVE_SEARCH';

 async function getResults(criteria) {
    try {
      let response = await fetch("http://api.giphy.com/v1/gifs/search?q=" + criteria + "&api_key=dc6zaTOxFJmzC&limit=5");
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }

function search(criteria) {
  return {
    type: GIPHY_SEARCH,
    criteria
  }
}

function receiveSearch(criteria, json) {
  return {
    type: GIPHY_RECEIVE_SEARCH,
    criteria,
    posts: json
  }
}

export function fetchPosts(criteria) {
  return (dispatch) => {
    dispatch(search(criteria));
    getResults(criteria)
    .then((body) => {
      dispatch(receiveSearch(criteria, body.data));
    });
  };
}