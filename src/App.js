import './App.css';
import CountdownClock from './components/clockwork';

function App() {
  return (
    <div className="App">
     <CountdownClock targetDate="2024-12-31T23:59:59" />
    </div>
  );
}

export default App;
