import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Post from './Post';

function App() {
  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/auth" exact component={Auth}/>
          <Route path="/post" exact component={Post}/>

        </Switch>

      </Container>
    </BrowserRouter>
  );
}

export default App;
