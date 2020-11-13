import React from 'react';
import styles from './styles.module.css'
import stylesGlob from "../styles.module.css";
import APIRequest from '../../../rest'
import { withRouter } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    let ths = this;
    APIRequest('signin', {
      'email': this.state.email,
      'password': this.state.password
    }).then(function (result) {
      if (result.status === 'ok') {
        ths.props.history.push('/profile');
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={stylesGlob.signForm}>
        <div>
          <div className={styles.content}>
            <label htmlFor="uname" value="Email" />
            <input class="border border-grey" type="text" placeholder="Email" name="email" required
                   onChange={this.handleChange} />
            <label htmlFor="psw" value="Password" />
            <input class="border border-grey" type="current-password" placeholder="Пароль" name="password" required
                   onChange={this.handleChange} />
          </div>
          <div className={styles.row}>
            {/* <label htmlFor="checkbox">Запомнить меня</label> */} {/* Doest work */}
    <input type="checkbox" id="checkbox"/>{' '}Запомнить меня
            <a href="/password_reset">Забыли пароль?</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <hr />
          <input type="submit" value='ВХОД' className="btn btn-dark"/>
        </div>
      </form>
    );
  }
}

export default withRouter(SignIn);
