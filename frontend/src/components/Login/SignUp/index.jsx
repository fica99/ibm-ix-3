import React from 'react';
import styles from '../styles.module.css';
import APIRequest from '../../../rest';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
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
      [name]: value,
    });
  }
  handleSubmit(event) {
    let ths = this;
    APIRequest('signup', {
      email: this.state.email,
      password: this.state.psw,
      name: this.state.name,
      surname: this.state.surname,
      phone: this.state.phone,
    }).then(function (result) {
      if (result.status === 'ok') {
        ths.props.history.push('/profile');
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.signForm}>
        <div className={styles.signUp}>
          <div className="leftSignUp">
            <label htmlFor="name" value="userFirstName">
              <input
                class="border border-grey"
                type="text"
                placeholder="Имя"
                name="name"
                required
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="phone" value="phone">
              <input
                class="border border-grey"
                type="text"
                placeholder="Телефон"
                name="phone"
                required
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="psw" value="Password">
              <input
                class="border border-grey"
                type="password"
                placeholder="Пароль"
                name="psw"
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="rightSignUp">
            <label htmlFor="surname" value="userSecondName">
              <input
                class="border border-grey"
                type="text"
                placeholder="Фамилия"
                name="surname"
                required
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="email" value="Email">
              <input
                class="border border-grey"
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="psw" value="Password">
              <input
                class="border border-grey"
                type="password"
                placeholder="Подтвердите пароль"
                name="psw_repeat"
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
        </div>
        <p className={styles.agreement}>
          <input type="checkbox" checked="false" name="remember" />
          {' '}Нажатием кнопки "Зарегистрироваться" я принимаю
          <a href="/empty"> условия пользовательского соглашения</a>
        </p>
        <hr />
        <input
          type="submit"
          value="ЗАРЕГИСТРИРОВАТЬСЯ"
          className="btn btn-dark"
        />
        <div></div>
      </form>
    );
  }
}

export default withRouter(SignUp);
