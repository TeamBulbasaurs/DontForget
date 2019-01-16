import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="loginContainer">
        hello
        <div onClick={this.props.handleLogin} className="login"><input className="loginButton" type="submit" value="Log In"/></div>
      </div>
    )
  }
}

export default Login;