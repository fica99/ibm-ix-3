import React from 'react';
import styles from '../styles.module.css';

const Comments = (props) => (
  <div className={styles.question}>
    <div className={styles.questionTitle}>Комментарии</div>
    <div className={styles.answer_6}>
    <input
      type="text"
      className="comments"
      id="comments"
      value={props.value}
      name="comments"
      onChange={props.changeInputHandler}
    /></div>
  </div>
);

export default Comments;
