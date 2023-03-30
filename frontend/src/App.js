import "./App.css";
import Login from "./pages/Login";
import PostListPage from "./pages/QuestionListPage";
import PostPage from "./pages/QuestionPage";
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
        <Route path="/dashboard" component={PostListPage} />
        <Route path="/posts/:id" component={PostPage} />
      </div>
    </Router>
  );
}

export default App;
