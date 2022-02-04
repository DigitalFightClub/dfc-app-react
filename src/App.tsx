import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuAppBar from './components/menuAppBar';
import { Home } from './components/home';
import Gym from './components/gym';
import Organizations from './components/gym';
import Error from './components/error';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MenuAppBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/gym" component={Gym} />
          <Route path="/organizaitons" component={Organizations} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
