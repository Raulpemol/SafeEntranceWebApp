import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RegisterPlace from './components/RegisterPlace/RegisterPlace';
import SearchPlace from './components/SearchPlace/SearchPlace';
import QRGenerator from './components/QRGenerator/QRGenerator';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ValidateAlerts from './components/ValidateAlerts/ValidateAlerts';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
  tabBar: {
    backgroundColor: "#baf2e9"
  }
});

function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                <AppBar position="relative">
                  <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="primary" className={useStyles().tabBar}>
                    <Tab label="Registrar local" icon={<CreateIcon/>}{...a11yProps(0)} id="registerNavButton"/>
                    <Tab label="Buscar local" icon={<SearchIcon/>} {...a11yProps(1)} id="searchNavButton"/>
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <RegisterPlace />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <SearchPlace />
                </TabPanel>
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
              <Route path="/alerts">
                <ValidateAlerts />
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
