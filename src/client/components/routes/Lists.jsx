import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Lists extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="listsContainer">
          hey this is the lists route
          <div
            onClick={this.props.handleSelectList} className="lists"><input className="listsButton" type="submit" value="List"/></div>
          </div>
        <div className="panelContainer">
          <form>
            <Button
            variant="contained"
            color="primary"
            >
            Add List
            </Button>
          </form> 
        </div>
      </div>
    )
  }
}

export default Lists;
