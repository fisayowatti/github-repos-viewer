import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createClient, Provider as URQLProvider } from 'urql';
// import logo from './logo.svg'
import './App.css'
import './styles/main.css'
import Search from './pages/Search';
import Repos from './pages/Repos';
import { token } from './token';

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
});


function App() {
  return (
    <URQLProvider value={client} >
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
    </URQLProvider>
  )
}

export default App
