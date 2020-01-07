export function someMutation(/* state */) {}
export const userDataFromServer = (state, response) => {
  state.userData = response;
  console.log('is it come');
};
