import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Landing from './pages/landing';
import ManageUser from './pages/ManageUser/ManageUser';
import Navbar  from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/manage" component={ManageUser} />
			</Switch>
		</div>
    </Router>
  );
}

export default App;
