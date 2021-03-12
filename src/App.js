import logo from './logo.svg';
import './App.css';
import RegisterPlace from './components/RegisterPlace/RegisterPlace';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a SafeEntrance</h1>
      </header>
      <main>
        <RegisterPlace />
      </main>
    </div>
  );
}

export default App;
