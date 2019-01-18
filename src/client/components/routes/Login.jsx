import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div>
          <a href="http://localhost:4000/auth/google/" >
            <div><input className="loginButton" value="Sign in with Google" type="submit" /></div>
          </a>
        </div> 
     </div>
    )
  }
}

export default Login;
