import React from 'react';
import Icon from './assets/img/icon.png';

export default class Header extends React.Component {
  render() {
    return (
      <div style={{height:37,padding:5,margin:10}}>
        <div style={{ margin:'auto', width:140 ,height:37}}>
          <div
            style={{
              backgroundImage: `url(${Icon})`,
              width: 37,
              height: 37,
              backgroundSize: 'cover',
              float: 'left'
            }}
          />
          <div
            style={{
              fontSize: 25,                            
              margin: '0 0 0 15px',
              float: 'left'
            }}
          >
            BillBill
          </div>
        </div>
      </div>
    );
  }
}
