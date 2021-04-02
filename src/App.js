import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import RegisterPlace from './components/RegisterPlace/RegisterPlace';
import QRGenerator from './components/QRGenerator/QRGenerator';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';

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
              <Route path="/generated_qr/:id">
                <QRGenerator />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/panel">
                <AdminPanel />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
