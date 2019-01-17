import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Groups from './routes/Groups.jsx';
import Login from './routes/Login.jsx';
import Lists from './routes/Lists.jsx';
import List from './routes/List.jsx';
import history from './routes/history.jsx';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLists: [],
      displayListItems: [],
      currentItemName: '',
      currentId: null,
      currentListName: null,
      inputList: null,
    }

    this.handleIdAndName = this.handleIdAndName.bind(this);
    this.handleInputList= this.handleInputList.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleItemName = this.handleItemName.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
  }
  handleIdAndName(id, name) {
    this.setState({ currentId: id, currentListName: name })
  }
  handleInputList(event) {
    this.setState({ inputList: event.target.value })
  }
  handleInvite() {
    history.push('/Groups')
  }
  handleItemName(event) {
    this.setState({ currentItemName: event.target.value })
  }
  handleLogin() {
    history.push('/Lists')
  }
  handleSelectList() {
    history.push('/List')
  }
  
  render() {
    return (
      <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          <AppBar
            position="absolute"
            style={
              {
                backgroundColor: '#28282A',
                height: '8%',
              }
            }
            >
            <Typography variant="h5" color="inherit">
              DontForget
            </Typography>
          </AppBar>
          <div>
          <div className="page">
          <div className="wholeContainer">
          <Switch>
            <Route exact path="/"
              render={(props) =>
                <Login {...props}
                  parentState={this.state}
                  handleLogin={this.handleLogin}
                />
              }
            />
            <Route path="/Lists"
              render={(props) =>
                <Lists {...props}
                  parentState={this.state}
                  handleSelectList={this.handleSelectList}
                  handleIdAndName={this.handleIdAndName}
                  handleInputList={this.handleInputList}
                />
              }
            />
            <Route path="/List"
              render={(props) =>
                <List {...props}
                  parentState={this.state}
                  handleInvite={this.handleInvite}
                  handleItemName={this.handleItemName}
                /> 
              }
            />
            <Route path="/Groups"
              render={(props) => 
                <Groups {...props}
                  parentState={this.state}
                />
              }
            />
          </Switch>
          </div>
          </div>
        </div>
        </div>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
