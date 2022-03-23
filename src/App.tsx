import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import { Home } from './components/home';
import './App.css';
import Gym from './components/gym';
import Organization from './components/organization';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/gym" component={Gym} />
          <Route path="/orgs" component={Organization} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
