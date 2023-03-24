import "./App.css";
import Login from "./pages/Login";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import PrivateRoute from "./util/PrivateRoute";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";
import CreateThread from "./pages/CreateThread";

function App() {
  const isLogged = sessionStorage.getItem("token-info");

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/create-thread" component={CreateThread} />
        <PrivateRoute path="/dashboard" component={QuestionListPage} />
        <PrivateRoute path="/questions/:id" component={QuestionPage} />
      </div>
    </Router>
  );
}

export default App;
