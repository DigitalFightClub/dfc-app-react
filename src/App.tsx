import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import { Home } from './components/home';
import './App.css';
import Gym from './components/gym';
import Organization from './components/organization';
import ScrollToTop from './enhancers/scrollToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/gym" component={Gym} />
            <Route path="/orgs" component={Organization} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
