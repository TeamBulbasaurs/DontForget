import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        hey this is the list
        <div onClick={this.props.handleInvite} className="invite"><input className="inviteButton" type="submit" value="Invite"/></div>
      </div>
    )
  }
}

export default List;
