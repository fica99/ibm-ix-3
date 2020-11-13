import React from 'react';
import styles from './styles.module.css';
import logo from './logo2.png';
import APIRequest from '../../rest';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

function Header(props) {
  return (
    <nav className={styles.nav}>
      <label htmlFor="toggle">&#9776;</label>
      <input type="checkbox" className={styles.toggle} id="toggle" />
      <div className={styles.menu}>
        <img
          src={logo}
          alt="Logo"
          height="80px"
          width="100px"
          align="left"
          vspace="13"
          hspace="20"
        />
        <a href="/profile">ПРОФИЛЬ</a>
        <a href="/applications">ЗАЯВКИ</a>
        <a href="#">УВЕДОМЛЕНИЯ</a>
        <a href="#">СООБЩЕНИЯ</a>
        <a
          href="#"
          onClick={async function () {
            let result = await APIRequest('remove_token', {});
            if (result.status === 'ok') {
              console.log('state ok');
              Cookies.remove('auth');
              props.history.push('/sign');
            } else {
              console.log('state not');
            }
          }}
        >
          ВЫХОД
        </a>
      </div>
    </nav>
  );
}

export default withRouter(Header);
