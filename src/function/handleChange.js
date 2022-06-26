export const handleChange = (e, state, setState) => {
  let name = e.target.name;
  let value = e.target.value;

  setState({ ...state, [name]: value });
};
