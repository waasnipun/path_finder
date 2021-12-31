import React from 'react';

export class Tile extends React.Component {
  constructor() {
    super();
    this.state = { 'hover': false };
  }

  toggleHover = () => {
    this.setState({ 'hover': !this.state.hover });
  };
  render() {
    var linkStyle;
    if (this.state.hover) {
      linkStyle = {
        overflow: 'hidden',
        width: '40px',
        height: '40px',
        backgroundColor: '#5D6D7E',
        border: ".5px solid #fff",
        cursor: 'pointer',
        hover: {
          color: '#ed1212'
        }
      }
    } else {
      linkStyle = {
        overflow: 'hidden',
        width: '40px',
        height: '40px',
        backgroundColor: this.props.color,
        border: ".5px solid #fff",
        cursor: 'pointer',
        hover: {
          color: '#ed1212'
        }
      }
    }
    return (
      <td
        id={this.props.key}
        className="font-white"
        style={linkStyle}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.props.handleClick}>
        {this.props.number===Number.POSITIVE_INFINITY?" ":this.props.number}
      </td>
    )
  }
}

export default Tile;