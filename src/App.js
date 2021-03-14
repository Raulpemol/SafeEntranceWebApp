import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RegisterPlace from './components/RegisterPlace/RegisterPlace';
import QRGenerator from './components/QRGenerator/QRGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="title">SafeEntrance</h1>
      </header>
      <main>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <RegisterPlace />
              </Route>
              <Route path="/generated_qr">
                <QRGenerator />
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
