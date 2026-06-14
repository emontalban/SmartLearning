export function fetchRecentsPost() {
    return function(dispatch)  {
        console.log ('hello')
    }
  
};

// const fetchUserData = (userId) => {
//   return async (dispatch, getState) => {
//     dispatch({ type: 'FETCH_USER_REQUEST' });

//     try {
//       const response = await fetch(`https://example.com{userId}`);
//       const data = response.json();
//       dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
//     } catch (error) {
//       dispatch({ type: 'FETCH_USER_FAILURE', error });
//     }
//   };
// };