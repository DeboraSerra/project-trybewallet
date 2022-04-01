import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <section >
      <Switch>
        <Route exact path="/project-trybewallet/" component={ Login } />
        <Route path="/project-trybewallet/carteira" component={ Wallet } />
      </Switch>
    </section>
  );
}

export default App;
