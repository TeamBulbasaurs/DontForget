import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

class Lists extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { handleIdAndName, handleSelectList, parentState } = this.props
    return (
      <div>
        <div className="listsContainer">
          hey this is the lists route
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
