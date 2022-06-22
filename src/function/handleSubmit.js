export default function handleSubmit(e) {
  e.preventDefault();
  // console.log("submmitted");
  if (
    person.name &&
    person.lname &&
    person.rollno &&
    person.class &&
    person.phone &&
    person.email &&
    isvalidPassword &&
    isvalidCnf
  ) {
    let id = v4();
    // console.log(id);
    let newPerson = { ...person, id: id };
    // console.log(newPerson);
    fetch(
      "https://xmyhcbq8xe.execute-api.ap-south-1.amazonaws.com/dev/register",
      {
        method: "POST",
        headers: {
          //REMEMBER THIS PASS THIS
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      }
    ).then((res) => console.log(res));
    setPerson(InitialState);
    setIsvalidCnf(false);
    setisFocused(InitialFocused);
  }
}
