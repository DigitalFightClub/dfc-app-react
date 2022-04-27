import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import { Home } from './components/home';
import './App.css';
import Gym from './components/gym';
import Organization from './components/organization';
import ScrollToTop from './enhancers/scrollToTop';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useGymFighters } from './hooks/fighter.hooks';
import { useEffect, useState } from 'react';
import { Center, Progress } from '@chakra-ui/react';

function App() {
  // console.log(`TOTAL DFC SUPPLY: ${totalSupply}`);
  const [fightersLoaded, setFightersLoaded] = useState<boolean>(false);
  const { data, isLoading } = useGymFighters();
  // console.log('DFC fighters', fighters);

  useEffect(() => {
    if (data) {
      setFightersLoaded(true);
    }
  }, [data]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop>
          {isLoading || !fightersLoaded ? (
            <Center>
              <Progress w="300px" hasStripe size="xs" isIndeterminate colorScheme="green" />
            </Center>
          ) : (
            <>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/gym" component={Gym} />
                <Route path="/orgs" component={Organization} />
              </Switch>
            </>
          )}
        </ScrollToTop>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </div>
  );
}

export default App;
