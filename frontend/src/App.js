import './App.css';
import Header from './components/Header'
import QuestionListPage from './pages/QuestionListPage'
import QuestionPage from './pages/QuestionPage'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";


function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Route path="/" exact component={QuestionListPage} />
                <Route path="/questions/:id" component={QuestionPage} />
            </div>
        </Router>
    );
}

export default App;
