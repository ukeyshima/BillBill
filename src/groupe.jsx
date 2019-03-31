import React from 'react';
import { inject, observer } from 'mobx-react';
import { FaMinusSquare } from 'react-icons/fa';

@inject(({ state }, props) => ({
  updateGroupeNum: state.updateGroupeNum,
  groupe: state.groupes[props.num],
  removeGroupe: state.removeGroupe,
  calculate: state.calculate
}))
@observer
export default class Groupe extends React.Component {
  handleChange = e => {
    this.props.updateGroupeNum(this.props.num, Math.floor(e.target.value));
    this.props.calculate();
  };
  handleClick = () => {
    this.props.removeGroupe(this.props.num);
    this.props.calculate();
  };
  render() {
    return (
      <div>
        <FaMinusSquare
          onClick={this.handleClick}
          style={{
            float: 'left',
            color: `rgb(175,254,255)`,
            margin: 5,
            width: 14,
            height: 14
          }}
        />
        <div style={{ float: 'left' }}>{`グループ${this.props.num + 1}`}</div>
        <div>{`: ${this.props.groupe.bill}円`}</div>
        <div>
          <input
            pattern='\d*'
            type='number'
            style={{
              textAlign: 'right',
              width: 83.5,
              margin: '0 0 0 24px'
            }}
            onChange={this.handleChange}
            value={this.props.groupe.num}
          />
          人
        </div>
      </div>
    );
  }
}
