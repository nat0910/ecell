// Test Functions

const regex = /[1-9]{1}[0-9]{9}/;

export const handleNumberChange = (e, state, isValid, setState, setIsValid) => {
  const name = e.target.name;
  const value = e.target.value;

  let result = regex.test(e.target.value);

  if (result) {
    setIsValid({ ...isValid, contact_number: true });
  } else {
    setIsValid({ ...isValid, contact_number: false });
  }

  setState({ ...state, [e.target.name]: value });
};
