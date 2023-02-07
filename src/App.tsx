import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import { Home } from './components/home';
import './App.css';
import Gym from './components/gym';
import Organization from './components/organization';
import Minting from './components/minting';
import ScrollToTop from './enhancers/scrollToTop';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { useGymFighters } from './hooks/fighter.hooks';
import Improve from './components/improve';
import { useEthers } from '@usedapp/core';

function App() {
  // console.log(`TOTAL DFC SUPPLY: ${totalSupply}`);
  const { account } = useEthers();
  const { isLoading } = useGymFighters();
  // console.log('DFC fighters', fighters);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop>
          <Switch>
            <Route path="/" component={Home} exact />
            {!isLoading && account ? <Route path="/gym" component={Gym} /> : null}
            {!isLoading && account ? <Route path="/improve" component={Improve} /> : null}
            {!isLoading && account ? <Route path="/orgs" component={Organization} /> : null}
            {!isLoading && account ? <Route path="/minting" component={Minting} /> : null}
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </div>
  );
}

export default App;
