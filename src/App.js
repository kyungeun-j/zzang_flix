
import React, { useEffect } from 'react';
import { Route } from 'react-router';
import Home from './routes/Home';
import Content from './routes/Content';

function App() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     react: ''
  //   }
  // }

  // componentDidMount() {
  //   this._getReact();
  // }

  // _getReact = async() => {
  //   const res = await axios.get('/react');
  //   this.setState({ react: res.data.react })
  // }

  return (
    <div>
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/content" component={ Content } />
    </div>
  );
}

export default App;
