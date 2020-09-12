import React, { Component } from 'react';

const DeviceList = [
  'iphonex',
  'galaxynote8',
  'iphone8',
  'iphone8plus',
  'iphone5s',
  'iphone5c',
  'ipadmini',
  // 'iphone4s',
  'nexus5',
  // 'lumia920',
  'galaxys5',
  // 'htcone',
  'macbookpro',
];

export class Device extends Component {
  static defaultProps = {
    device: 'iphonex',
    position: '', // landscape
    color: '',
    scale: 1.0,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: props.position,
      color: props.color,
    };
  }

  scaleView() {
    return {
      WebkitTransform: `scale(${this.props.scale})`,
      transform: `scale(${this.props.scale})`,
    };
  }

  wrp(n) {
    return `marvel-device ${n} ${this.state.position} ${this.state.color}`;
  }

  iphonex() {
    return (
      <div className={this.wrp('iphone-x')} style={this.scaleView()}>
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen">{this.props.children}</div>
      </div>
    );
  }

  galaxynote8() {
    return (
      <div className={this.wrp('note8')}>
        <div className="inner"></div>
        <div className="overflow">
          <div className="shadow"></div>
        </div>
        <div className="speaker"></div>
        <div className="sensors"></div>
        <div className="more-sensors"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="screen">{this.props.children}</div>
      </div>
    );
  }

  iphone8() {
    return (
      <div className={this.wrp('iphone8')}>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="sensor"></div>
        <div className="speaker"></div>
        <div className="screen">{this.props.children}</div>
        <div className="home"></div>
        <div className="bottom-bar"></div>
      </div>
    );
  }

  iphone8plus() {
    return (
      <div className={this.wrp('iphone8plus')}>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="sensor"></div>
        <div className="speaker"></div>
        <div className="screen">{this.props.children}</div>
        <div className="home"></div>
        <div className="bottom-bar"></div>
      </div>
    );
  }

  iphone5c() {
    return (
      <div className={this.wrp('iphone5c')}>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="sensor"></div>
        <div className="speaker"></div>
        <div className="screen">{this.props.children}</div>
        <div className="home"></div>
        <div className="bottom-bar"></div>
      </div>
    );
  }

  iphone5s() {
    return (
      <div className={this.wrp('iphone5s')}>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="sensor"></div>
        <div className="speaker"></div>
        <div className="screen">{this.props.children}</div>
        <div className="home"></div>
        <div className="bottom-bar"></div>
      </div>
    );
  }

  ipadmini() {
    return (
      <div className={this.wrp('ipad')}>
        <div className="camera"></div>
        <div className="screen">{this.props.children}</div>
        <div className="home"></div>
      </div>
    );
  }

  macbookpro() {
    return (
      <div className={this.wrp('macbook')}>
        <div className="top-bar"></div>
        <div className="camera"></div>
        <div className="screen">{this.props.children}</div>
        <div className="bottom-bar"></div>
      </div>
    );
  }

  galaxys5() {
    return (
      <div className={this.wrp('s5')}>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="camera"></div>
        <div className="sensor"></div>
        <div className="speaker"></div>
        <div className="screen">{this.props.children}</div>
        <div className="home"></div>
      </div>
    );
  }

  nexus5() {
    return (
      <div className={this.wrp('nexus5')}>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="screen">{this.props.children}</div>
      </div>
    );
  }

  render() {
    /* check device */
    const device = DeviceList.find((d) => d === this.props.device);

    if (!device) {
      return null;
    }
    return this[device]();
  }
}
