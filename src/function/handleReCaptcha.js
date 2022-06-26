export const handleReCaptcha = (e, state, setState) => {
  setState({ ...state, recaptcha_token: e });
};
