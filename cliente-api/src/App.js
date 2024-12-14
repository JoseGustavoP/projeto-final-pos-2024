import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Usuarios from './pages/Usuarios';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/usuarios" component={Usuarios} />
      </Switch>
    </Router>
  );
};

export default App;
