import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
// import Groups from './routes/Groups.jsx';
import Login from './routes/Login.jsx';
// import Lists from './routes/Lists.jsx';
import history from './routes/history.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLists: [],
      displayListItems: []
    }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
           <Route exact path="/"
            render={(props) =>
              <Login {...props}
              />
            }
          />
        <Route path="/Lists"
      {/* //       render={(props) =>
      //         <Lists {...props}
      //            parentState={this.state}
      //         />
      //       }
      //     />
      //     <Route path="/List"
      //       render={(props) =>
      //         <List {...props}
      //            parentState={this.state} 
      //       }
      //     />
      //     <Route path="/Groups"
      //       render={(props) => 
      //         <Groups {...props}
      //            parentState={this.state}
      //         />
      //       }
      //     /> */} */}
         </Switch>
      </Router>
    )
  }
}

export default App;
