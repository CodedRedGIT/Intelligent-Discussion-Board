import "./App.css";
import Login from "./pages/Login";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useHistory,
} from "react-router-dom";
import Register from "./pages/Register";
import CreateThread from "./pages/CreateThread";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-thread" component={CreateThread} />
        <Route path="/dashboard" component={QuestionListPage} />
        <Route path="/questions/:id" component={QuestionPage} />
      </div>
    </Router>
  );
}

export default App;
