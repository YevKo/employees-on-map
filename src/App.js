import Map from './components/map';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{ "Exoveans on the map" }</h1>
      </header>
      <article>
        <Map />
      </article>
    </div>
  );
}

export default App;
