import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class List extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      handleInvite,
      handleItemName,
      parentState
    } = this.props;
    return (
      <div className='panelContainer'>
          <div className='fieldEdit'>
            <form>
              <TextField
                label="List Item"
                floatingLabelStyle={{ color: 'white' }}
                onChange={handleItemName}
              />
              <Button
                variant="contained"
                color="primary"
              >
              Add Item
              </Button>
              <Button
                variant="contained"
                color="primary"
              >
              Delete Item
              </Button>
              <Button
                variant="contained"
                color="primary"
              >
              Delete List
              </Button>
            </form>
            <Button
              variant="contained"
              color="primary"
              onClick={handleInvite}
            >
            Invite
            </Button>
          </div>
      </div>
    )
  }
}

export default List;
