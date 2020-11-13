import React from 'react';
import styles from '../styles.module.css';

const WorkDuration = (props) => (
  <div className={styles.question}>
    <div className={styles.questionTitle}>2. Продолжительность рабочей смены</div>
    <div className={styles.answer_2}>
      <input
        type="number"
        className="workDuration"
        id="workDuration"
        value={props.value}
        name="workDuration"
        onChange={props.changeInputHandler}
      />
    </div>
  </div>
)

export default WorkDuration;
