import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Qualification = (props) => (
  <React.Fragment>
    <div className={styles.qualification}>
      <h3>Квалификация</h3>
      <ul>
        <li><span>Общий стаж:</span> {props.fullExperience}</li>
        <li><span>Стаж в должности:</span> {props.positionExperience}</li>
        <li><span>Уровень допуска на сложные аэропорты:</span> {props.level}</li>
      </ul>
    </div>
</React.Fragment>  
);

Qualification.PropTypes = {
  fullExperience: PropTypes.string.isRequired,
  positionExperience: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
};

export default Qualification;
