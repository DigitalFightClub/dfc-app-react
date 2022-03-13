import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import { Home } from './components/home';
import Organizations from './components/error';
// import Error from './components/error';
import './App.css';
import { GymAsyncComponent } from './containers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/gym" component={GymAsyncComponent} />
          <Route path="/orgs" component={Organizations} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
