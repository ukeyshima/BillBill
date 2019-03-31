import React from 'react';
import { inject, observer } from 'mobx-react';

@inject(({ state }, props) => ({
  groupes: state.groupes,
  windowSize: state.windowSize,
  updateGroupeRate: state.updateGroupeRate,
  calculate: state.calculate,
  rateBox: state.rateBox
}))
@observer
export default class Rate extends React.Component {
  handleMouseDown = e => {                
    this.frontElement = document.getElementById(`rate${this.props.num - 1}`);
    this.frontElementBoundingRect = this.frontElement.getBoundingClientRect();
    this.currentElement=document.getElementById(`rate${this.props.num}`)
    this.currentElementBoundingRect = this.currentElement.getBoundingClientRect();
    this.barStartX = ('changedTouches' in e) ? e.changedTouches[0].pageX : e.pageX;
    this.rate = this.props.rate;
    this.frontRate = this.props.groupes[this.props.num - 1].rate;
    window.addEventListener('mousemove', this.handleMouseMoveOrTouchMove);
    window.addEventListener('mouseup', this.handleMouseUpOrTouchEnd);
    window.addEventListener('touchmove', this.handleMouseMoveOrTouchMove);
    window.addEventListener('touchend', this.handleMouseUpOrTouchEnd);
  };
  handleMouseMoveOrTouchMove = e => {    
    const x=('changedTouches' in e)? e.changedTouches[0].pageX : e.pageX;
    if(x>this.frontElementBoundingRect.left+2 && x<this.currentElementBoundingRect.right){    
    const d =
      (x - this.barStartX) /
      (this.props.windowSize.width - 70 - this.props.groupes.length - 1);
    this.props.updateGroupeRate(this.props.num - 1, this.frontRate + d);
    this.props.updateGroupeRate(this.props.num, this.rate - d);
    this.props.calculate();
    }
  };
  handleMouseUpOrTouchEnd = () => {
    window.removeEventListener('mousemove', this.handleMouseMoveOrTouchMove);
    window.removeEventListener('mouseup', this.handleMouseUpOrTouchEnd);
    window.removeEventListener('touchmove', this.handleMouseMoveOrTouchMove);
    window.removeEventListener('touchend', this.handleMouseUpOrTouchEnd);
  };
  render() {    
    return (
      <React.Fragment>
        {this.props.num !== 0 && (
          <div
            style={{
              float: 'left',
              width: 1,
              height: 38,
              cursor: 'col-resize'
            }}
          />
        )}
        {this.props.num !== 0 && (
          <div
            id={`inVisibleBar${this.props.num}`}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleMouseDown}
            style={{
              position: 'absolute',
              left:
                this.props.rateBox.getBoundingClientRect().left +
                this.props.groupes
                  .slice(0, this.props.num)
                  .reduce((pre, cur) => {
                    return (
                      pre +
                      cur.rate *
                        (this.props.windowSize.width -
                          70 -
                          this.props.groupes.length -
                          1)
                    );
                  }, 0) -
                15,
              width: 31,
              height: 38,
              backgroundColor: 'rgba(0,0,0,0)',
              cursor: 'col-resize'
            }}
          />
        )}
        <div
          id={`rate${this.props.num}`}
          style={{
            backgroundColor: `rgb(${Math.floor(
              175 - (this.props.num / this.props.groupes.length) * 19
            )},${Math.floor(
              254 - (this.props.num / this.props.groupes.length) * 96
            )},${Math.floor(
              255 - (this.props.num / this.props.groupes.length) * 10
            )})`,
            float: 'left',
            width:
              (this.props.windowSize.width -
                70 -
                this.props.groupes.length -
                1) *
              this.props.rate,
            height: 38
          }}
        />
      </React.Fragment>
    );
  }
}
