import React from 'react';
import styles from '../styles.module.css';

const Answer = (props) => (
  <div className={styles.question}>
    <div className={styles.questionTitle}>
      3. Желание работать с переработками
    </div>
    <div className={styles.answer_3}>
      <select
        className="answer"
        id="answer"
        value={props.value}
        name="answer"
        onChange={props.changeInputHandler}
      >
        <option>Да</option>
        <option>Нет</option>
        <option></option>
        {/* {props.chooseAnswer} */}
      </select>
    </div>
  </div>
);

export default Answer;
