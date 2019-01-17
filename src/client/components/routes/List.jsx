import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Query, graphql, Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#171E25',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    // minWidth: '10%',
    width: '100%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const ITEMS_QUERY = gql`
    query itemsQuery($listId: String) {
      items(listId: $listId) {
        itemId
        itemDescription
        quantity
        completed
      }
    }
`;
const DELETELIST_MUTATION = gql`
  mutation deleteList($listId: String!) {
    deleteList(listId: $listId) {
      listId
      listName
      notes
    }
  }
`;
const ADDITEM_MUTATION = gql`
  mutation addItem($listId: String!, $itemDescription: String!, $quantity: Float!, $completed: Boolean!) {
    addItem(listId: $listId, itemDescription: $itemDescription, quantity: $quantity, completed: $completed) {
      listId
      itemDescription
      quantity
      completed
    }
  }
`
class List extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      handleAfterDeleteList,
      handleInputItem,
      handleInputQuantity,
      handleInvite,
      handleItemName,
      handleResetCurrent,
      parentState,
      data,
      // test
    } = this.props;
    if (data.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
      <div className='listContainer'>
      <Paper className="listerContainer">
            <Table className="displayTabler">
              <TableHead>
                <TableRow>
                  <CustomTableCell>{parentState.currentListName}</CustomTableCell>
                  <CustomTableCell align="right"></CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    {data.items.map((item)=> {return (
                      <TableRow className="displayTableRow">
                      <CustomTableCell component="th" scope="row">
                      {item.itemDescription}
                      </CustomTableCell>
                      <CustomTableCell align="right">{item.quantity}</CustomTableCell>
                      </TableRow>
                    )})}
              </TableBody>
            </Table>
          </Paper>
      </div>
      <div className='panelContainer'>
          <div className='fieldEdit'>
            <form>
              <TextField
                label="List Item"
                onChange={ handleInputItem }
                variant="outlined"
                InputProps={{ id: 'listItemText' }}
                InputLabelProps={{ id: 'listItemLine' }}
              />
              <TextField
                label="Item Quantity"
                onChange={ handleInputQuantity }
                variant="outlined"
                InputProps={{ id: 'listItemText' }}
                InputLabelProps={{ id: 'listItemLine' }}
              />
              <Mutation mutation={ADDITEM_MUTATION} variables={{ listId: parentState.currentId, itemDescription: parentState.inputItemName, quantity: parentState.inputQuantity, completed: false}}>
              {addItem =>
              <Button
                variant="contained"
                color="primary"
                onClick={addItem}
              >
              Add Item
              </Button>
              }
              </Mutation>
              <Button
                variant="contained"
                color="primary"
              >
              Delete Item
              </Button>
              {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={test}
                >
                  Delete Listy
                </Button> */}
              <Mutation mutation={DELETELIST_MUTATION} variables={{ listId: parentState.currentId }}>
                {deleteList => 
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>{deleteList(), handleResetCurrent(), handleAfterDeleteList()}}
                >
                  Delete List
                </Button>
                }
              </Mutation>
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
      </div>
    )
  }
}

const queryOptions = {
  options: props => ({
    variables: {
      listId: props.parentState.currentId,
    },
  })
}
console.log(queryOptions)
List = graphql(ITEMS_QUERY, queryOptions)(List);

export default withStyles(styles)(List);

