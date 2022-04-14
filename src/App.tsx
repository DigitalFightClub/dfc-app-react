import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import { Home } from './components/home';
import './App.css';
import Gym from './components/gym';
import Organization from './components/organization';
import ScrollToTop from './enhancers/scrollToTop';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDFCFighters, useTotalDFCSupply } from './hooks/dfc.hooks';

function App() {
  const { data: totalSupply, isLoading } = useTotalDFCSupply();
  console.log(`TOTAL DFC SUPPLY: ${totalSupply}`);
  const { data: fighters } = useDFCFighters();
  console.log('DFC fighters', fighters);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>Total DFC Supply: {totalSupply}</p>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/gym" component={Gym} />
                <Route path="/orgs" component={Organization} />
              </Switch>
            </>
          )}
        </ScrollToTop>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
