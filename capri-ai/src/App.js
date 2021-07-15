import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ManageUser from './pages/ManageUser/ManageUser';
import Navbar  from './components/Navbar/Navbar';
import AddNewAccount from './pages/AddNewAccount/AddNewAccount';

function App() {
  return (
    <Router>
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/manage" component={ManageUser} />
				<Route path="/addnewaccount" component={AddNewAccount} />
			</Switch>
		</div>
    </Router>
  );
}

export default App;
