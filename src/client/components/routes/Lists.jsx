import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { Query, graphql, Mutation } from 'react-apollo';
import ListDisplay from '../ListDisplay';

const LISTS_QUERY = gql`
  query listsQuery {
    lists {
      listId
      listName
      notes
    }
  }
`
const ADDLIST_MUTATION = gql`
  mutation createList($listName: String!, $notes: String!) {
    createList(listName: $listName, notes: $notes) {
      listName
      notes
    }
  }
`
class Lists extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { handleIdAndName, handleInputDescription, handleInputList, handleSelectList, parentState } = this.props
    return (
      <div>
        <div className="listsContainer">
          <div
            onClick={handleSelectList} className="lists"><input className="listsButton" type="submit" value="List"/></div>
          </div>
          <Query query={LISTS_QUERY}>
            {
              ({ loading, error, data }) => {
                if (loading) return <h4>Loading...</h4>
                if (error) console.log(error);
                return <Fragment>
                  {
                    data.lists.map(list => (
                      <ListDisplay id={list.listId} details={list} handleSelectList={handleSelectList} handleIdAndName={handleIdAndName}/>
                    ))
                  }
                </Fragment>
              }
            }
          </Query>
        <div className="panelContainer">
          <form>
            <TextField
              label="Add List"
              onChange={ handleInputList }
              variant="outlined"
              InputProps={{ id: 'listItemText' }}
              InputLabelProps={{ id: 'listItemLine' }}
            />
            <TextField
              label="Add Description"
              onChange={ handleInputDescription }
              variant="outlined"
              InputProps={{ id: 'listItemText' }}
              InputLabelProps={{ id: 'listItemLine' }}
            />
            <Mutation mutation={ADDLIST_MUTATION} variables={{ listName: parentState.inputList, notes: parentState.inputDescription }}>
            {addListMutation => 
              <Button
                variant="contained"
                color="primary"
                onClick={addListMutation}
              >
              Add List
              </Button>}
            </Mutation>
          </form> 
        </div>
      </div>
    )
  }
}

export default Lists;
