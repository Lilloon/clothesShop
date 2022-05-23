import classes from "./App.module.scss";
import AutoLogin from "./components/AutoLogin/AutoLogin";
import Header from "./components/Header/Header";
import MyRoutes from "./components/Routes/Routes";
import BagTaker from "./components/BagTaker/BagTaker";

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.body}>
        <MyRoutes />
      </div>
      <AutoLogin />
      <BagTaker />
    </div>
  );
}

export default App;
