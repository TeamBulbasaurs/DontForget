import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Groups from './components/routes/Groups.jsx';
import Login from './components/routes/Login.jsx';
import Lists from './components/routes/Lists.jsx';
import history from './components/routes/history.jsx';

class App extends React.Component { 
  render() {
    return (
      <div className="main">
      hello
      </div>
      <Router history={history}>
        <Switch>
          <Route exact path="/"
            render={(props) =>
              <Login {...props}
              />
            }
          />
          <Route path="/Lists"
            render={(props) =>
              <Lists {...props}
              />
            }
          />
          <Route path="/Groups"
            render={(props) => 
              <Groups {...props}
              />
            }
          />
        </Switch>
      </Router>
    )
  }
}

export default App;
