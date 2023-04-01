import React from "react";

class Square extends React.Component {
  render() {
    var squareStyle = {
      height: 50,
      backgroundColor: this.props.color,
    };

    return (
      <div style={squareStyle}>
        For further details reach out to the below details <br />
        <a href="#">jain.apo@northeastern.edu</a>
        <br />
        <a href="#">857-313-5946</a>
      </div>
    );
  }
}

export default Square;
