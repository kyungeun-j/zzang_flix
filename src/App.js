
import React, { Component } from 'react';
import axios from 'axios';

import Home from './routes/Home';
import { Route } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      react: ''
    }
  }

  componentDidMount() {
    this._getReact();
  }

  _getReact = async() => {
    const res = await axios.get('/react');
    this.setState({ react: res.data.react })
  }

  render() {
    return (
      <div>
        <h1> {this.state.react} </h1>
        <Route path="/" component={ Home } />
      </div>
    );
  }
}

export default App;
