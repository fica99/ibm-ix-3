import React from 'react';
import styles from '../styles.module.css';

const FlightDirection = (props) => (
  <div className={styles.question}>
    <div className={styles.questionTitle}>1. Направление полета</div>
    <div className={styles.answer_1}>
      <input
        type="text"
        className="formDirection"
        id="flightDirection"
        value={props.value}
        name="flightDirection"
        onChange={props.changeInputHandler}
      />
    </div>
  </div>
)

export default FlightDirection;
