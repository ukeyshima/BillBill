import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Header from './header';
import Body from './body';
import State from './store.js';
import { Provider, inject, observer } from 'mobx-react';

const stores = {
  state: new State()
};


class BillBill extends React.Component {  
  render() {
    return (
      <Provider {...stores}>
      <React.Fragment>
        <Header />
        <Body />
      </React.Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<BillBill />, document.getElementById('root'));
