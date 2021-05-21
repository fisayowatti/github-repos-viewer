import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import logo from './logo.svg'
import './App.css'
import './styles/main.css'
import Search from './pages/Search';
import Repos from './pages/Repos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Search/>
        </Route>
        <Route path="/repos">
          <Repos/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
