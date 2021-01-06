import React from 'react';

export class Tile extends React.Component{
  render(){
    return (
      <td
        id = {this.props.key}
        className = "font-white"
        style={{
          overflow:'hidden',
          width:'40px',
          height:'40px',
          backgroundColor:this.props.color,
          border:".5px solid #fff"
        }}
        onClick={this.props.handleClick}>
          {this.props.number}
      </td>
    )
  }
}

export default Tile;