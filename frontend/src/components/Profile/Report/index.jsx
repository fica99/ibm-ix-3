import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Report = (props) => (
  <div className={styles.report}>
    <h3>Отчёт по заявкам</h3>
    <div className={styles.line}></div>
    <div className={styles.period}>
      <h5>ПЕРИОД: </h5>
      <h5>
        {props.startDate} - {props.endDate}
      </h5>
    </div>
    <div className={styles.textBox}>
      {/* <div className={styles.chart}><img src={chart} /></div> */}

      <div className={styles.priority}>7.6</div>
      <div className={styles.text}>Рейтинг</div>
    </div>
  </div>
);

Report.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default Report;
