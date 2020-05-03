export function someMutation(/* state */) {}
export const userDataFromServer = (state, response) => {
  state.userData = response;
};
export const logedInSuccesfully = (state, status) => {
  state.logedIn = status;
};
export const sendInvoiceData = (state, status) => {
  state.invoice = status;
};
