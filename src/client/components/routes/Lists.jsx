import React, { Component } from 'react';

class Lists extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="listsContainer">
        hey this is the lists route
        <div onClick={this.props.handleSelectList} className="lists"><input className="listsButton" type="submit" value="List"/></div>
      </div>
    )
  }
}

export default Lists