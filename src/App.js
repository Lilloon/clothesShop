import classes from "./App.module.scss";
import axios from "axios";
import AdminPanel from "./components/AdminPanel/AdminPanel";

function App() {
  const onClick = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/userById?id=3667dacd-fe15-41a5-8ca1-ad80c5105d5d"
    );

    console.log(result);
  };
  const onClick2 = async () => {
    const result = await axios.post("http://localhost:5000/api/addNewUser", {
      id: 1,
      first_name: "Artem",
      second_name: "Sulyaev",
      middle_name: "Romanovich",
      date_of_birth: "22.11.2000",
      address: "Glazzunova 1",
      phone_number: "228-228",
    });
    console.log(result);
  };
  return (
    <div className={classes.App}>
      <button onClick={onClick} />
      <AdminPanel />
    </div>
  );
}

export default App;
