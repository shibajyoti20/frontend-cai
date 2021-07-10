import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Landing from './pages/Landing';
import ManageUser from './pages/ManageUser';

function App() {
  return (
    <Router>
		<div className="App">
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/" exact component={ManageUser} />
			</Switch>
		</div>
    </Router>
  );
}

export default App;
