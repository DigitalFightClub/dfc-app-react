import MenuAppBar from './components/menuAppBar';
import Gym from './components/gym';
import './App.css';
process.env.GENERATE_SOURCEMAP = 'false';
function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Gym/>
    </div>
  );
}

export default App;
