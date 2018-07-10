import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import DriveNow from './DriveNow';
import DriveHistory from './DriveHistory';
import Landing from './Landing';
import About from './About';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/drive/now" component={DriveNow} />
            <Route exact path="/drive/history" component={DriveHistory} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
