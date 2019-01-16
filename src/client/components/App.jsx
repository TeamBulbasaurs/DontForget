import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Groups from './routes/Groups.jsx';
import Login from './routes/Login.jsx';
import Lists from './routes/Lists.jsx';
import List from './routes/List.jsx';
import history from './routes/history.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLists: [],
      displayListItems: []
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }
  handleLogin() {
    history.push('/Lists')
  }
  handleSelectList() {
    history.push('/List')
  }
  handleInvite() {
    history.push('/Groups')
  }
  render() {
    return (
      <Router history={history}>
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
              />
            }
          />
          <Route path="/List"
            render={(props) =>
              <List {...props}
                 parentState={this.state}
                 handleInvite={this.handleInvite}
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
      </Router>
    )
  }
}

export default App;
