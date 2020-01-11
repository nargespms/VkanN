export function someMutation(/* state */) {}
export const userDataFromServer = (state, response) => {
  state.userData = response;
  // console.log('is it come');
};
export const logedInSuccesfully = (state, status) => {
  state.logedIn = status;
  console.log('is it come');
};
