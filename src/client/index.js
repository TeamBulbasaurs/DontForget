import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Groups from './components/routes/Groups.jsx';
import Login from './components/routes/Login.jsx';
import Lists from './components/routes/Lists.jsx';
import history from './components/routes/history.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLists: [],
      displayListItems: []
    }
  }
  render() {
    return (
      <div className="main">
      hello
      </div>
      // <Router history={history}>
      //   <Switch>
      //     <Route exact path="/"
      //       render={(props) =>
      //         <Login {...props}
      //         />
      //       }
      //     />
      //     <Route path="/Lists"
      //       render={(props) =>
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
      //     />
      //   </Switch>
      // </Router>
    )
  }
}

export default App;
