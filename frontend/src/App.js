import "./App.css";
import Login from "./pages/Login";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={QuestionListPage} />
        <Route path="/questions/:id" component={QuestionPage} />
      </div>
    </Router>
  );
}

export default App;
