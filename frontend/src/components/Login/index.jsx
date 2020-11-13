import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from './styles.module.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
    };
  }

  toggleVisible(value) {
    this.setState({ isSignIn: value });
  }

  render() {
    return (
      <div className={styles.login}>
        <div className={styles.tittle}>
          <span onClick={this.toggleVisible.bind(this, true)}>Вход</span>
          <span onClick={this.toggleVisible.bind(this, false)}>
            Регистрация
          </span>
        </div>
        {/* <hr className={this.state.isSignIn && styles.line} /> */}
        {this.state.isSignIn ? <SignIn /> : <SignUp />}
      </div>
    );
  }
}

export default Login;
