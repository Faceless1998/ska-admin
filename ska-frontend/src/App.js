import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/admin";
import AddNewPost from "./components/addNewPost";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route path="/addPost" component={AddNewPost} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
