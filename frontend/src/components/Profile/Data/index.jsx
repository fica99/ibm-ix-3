import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import imageP from './pilot2.png';
import edit from './edit.png';

const Data = (props) => (
  <React.Fragment>
    <div className={styles.data}>
      <div className={styles.regData}>
        <h3>
          Регистрационные данные{' '}
          <span>
            <img className={styles.edit} src={edit} />
          </span>
        </h3>
        <div className={styles.inputData}>
          <ul>
            <li>
              <span>ФИО:</span> {props.fullname}
            </li>
            <li>
              <span>Телефон:</span> {props.phone}
            </li>
            <li>
              <span>Email:</span> {props.email}
            </li>
          </ul>
          <div>
            <img className={styles.img} src={imageP} />
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.personData}>
        <h3>
          Персональные данные{' '}
          <span>
            <img className={styles.edit} src={edit} />
          </span>
        </h3>
        <ul>
          <li>
            <span>Дата рождения:</span> {props.bDay}
          </li>
          <li>
            <span>Пол:</span> {props.gender}
          </li>
          <li>
            <span>Гражданство:</span> {props.citizenship}
          </li>
          <li>
            <span>Должность:</span> {props.position}
          </li>
        </ul>
      </div>
    </div>
  </React.Fragment>
);

Data.propTypes = {
  fullname: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bDay: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  citizenship: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

export default Data;
