import React from 'react';
import { inject, observer } from 'mobx-react';
import { FaPlusSquare } from 'react-icons/fa';
import Groupe from './groupe.jsx';
import Rate from "./rate.jsx"

@inject(({ state }) => ({
  totalAmount: state.totalAmount,
  updateTotalAmount: state.updateTotalAmount,
  groupes: state.groupes,
  addGroupe: state.addGroupe,
  updateWindowSize: state.updateWindowSize,
  windowSize: state.windowSize,
  calculate: state.calculate,
  change: state.change,
  updateRateBox:state.updateRateBox
}))
@observer
export default class Body extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.windowResize);
    this.props.calculate();
    this.props.updateRateBox(this.rateBox);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }
  windowResize = () => {
    this.props.updateWindowSize(window.innerWidth, window.innerHeiight);
  };
  addGroupe = () => {
    this.props.addGroupe();
  };
  totalAmountUpdate = e => {
    this.props.updateTotalAmount(Math.floor(e.target.value));
    this.props.calculate();
  };
  render() {
    return (
      <div>
        <div style={{ height: 50, margin: 10 }}>
          <FaPlusSquare
            onClick={this.addGroupe}
            style={{
              margin: '5px 5px 5px 0',
              borderRadius: 5,
              boxShadow: '5px 5px 20px #bbb',
              float: 'left',
              height: 40,
              width: 40,
              textAlign: 'center'
            }}
          />
          <div
            ref={e=>this.rateBox=e}
            style={{
              margin: '5px 0 5px 5px',
              backgroundColor: '#fff',
              width: this.props.windowSize.width - 72,
              height: 38,
              float: 'left',
              boxShadow: '5px 5px 20px #bbb',
              padding: 1
            }}
          >
            {this.props.groupes.map((e, i) => {
              return (
                <Rate key ={i} num={i} rate={e.rate}/>
              );
            })}
          </div>
        </div>
        <div
          style={{
            margin: 10,
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: 5,
            padding: 10,
            boxShadow: '5px 5px 20px #bbb'
          }}
        >
          <div style={{ margin: '0 0 0 24px' }}>総額</div>
          <div>
            <input
              pattern='\d*'
              type='number'
              onChange={this.totalAmountUpdate}
              value={this.props.totalAmount}
              style={{ width: 83.5, margin: '0 0 0 24px', textAlign: 'right' }}
            />
            円
          </div>
          {this.props.groupes.map((e, i) => {
            return <Groupe key={i} num={i} />;
          })}
          <div>
            <div style={{ margin: '0 0 0 24px' }}>
              お釣り: {this.props.change}円
            </div>
          </div>
        </div>
      </div>
    );
  }
}
