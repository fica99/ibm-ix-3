import React from 'react';
import styles from '../styles.module.css';

const DepartureTime = (props) => (
  <div className={styles.question}>
     <div className={styles.questionTitle}>5. Время вылета</div>
     <div className={styles.answer_5}>
       <input type="text" value={props.inputText}></input>
     </div>
    <div className={styles.select_5}>
      <select 
        onClick={(event) => {props.handleDepartureTime('day', event, props.index)}}
      >
        {props.dayValue}
      </select>
    </div>
    <div className={styles.select_5}>
      <select
        onClick={(event) => {props.handleDepartureTime('time', event, props.index)}}
      >
      {props.timeValue}
      </select>
    </div>
   </div>
)

export default DepartureTime;
