// Test Functions

const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const handleEmailChange = (e, state, isValid, setState, setIsValid) => {
  const name = e.target.name;
  const value = e.target.value;

  let result = regex.test(e.target.value);

  if (result) {
    setIsValid({ ...isValid, [name]: true });
  } else {
    setIsValid({ ...isValid, [name]: false });
  }

  setState({ ...state, [name]: value });
};
