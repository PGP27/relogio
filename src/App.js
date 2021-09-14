import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Relogio from './components/Relogio';
import Timer from './components/Timer';
import Cronometro from './components/Cronometro';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={ Relogio } />
    <Route exact path="/timer" component={ Timer } />
    <Route exact path="/cronometro" component={ Cronometro } />
  </BrowserRouter>
);


export default App;
