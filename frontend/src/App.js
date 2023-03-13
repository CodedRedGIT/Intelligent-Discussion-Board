import './App.css';
import QuestionListPage from './pages/QuestionListPage'
import QuestionPage from './pages/QuestionPage'
import Navbar from './components/Navbar';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Route path="/" exact component={QuestionListPage} />
                <Route path="/questions/:id" component={QuestionPage} />
            </div>
        </Router>
    );
}

export default App;
