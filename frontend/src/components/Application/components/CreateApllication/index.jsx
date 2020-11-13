import React from 'react';
import AppDatePicker from '../DatePicker';
import styles from './styles.module.css';
import close from '../../../../assets/img/close_gray.svg';
import closeBlue from '../../../../assets/img/close_blue.svg';
import Select from 'react-select';

import FlightDirection from './FlightDirection';
import WorkDuration from './WorkDuration';
import Answer from './Answer';
import DepartureTime from './DepartureTime';
import Comments from './Comments';
// import AppCalendar from '../Calendar/app.jsx'

class CreateApplication extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.applications);
  }

  choosePriority = () => {
    const arrPriority = [
      'Очень высокий',
      'Высокий',
      'Нормальный',
      'Низкий',
      'Очень низкий',
    ];
    return arrPriority.map((option, i) => {
      return <option key={i}>{option}</option>;
    });
  };

  chooseDepartureDay = () => {
    const arrWeekDay = [
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
      'воскресенье',
    ];
    return arrWeekDay.map((option, i) => {
      return <option key={i}>{option}</option>;
    });
  };

  chooseDepartureTime = () => {
    const arrTimeDay = ['', 'утром', 'днем', 'вечером', 'ночью'];
    return arrTimeDay.map((option, i) => {
      return <option key={i}>{option}</option>;
    });
  };

  render() {
    const date = new Date();

    return (
      <form
        className={styles.createApplicationBlock}
        onSubmit={this.submitHandler}
      >
        <div className={styles.block}>
          <div className={styles.createApplicationTitle}>Новая заявка</div>
          <div
            className={styles.createApplicationClose}
            style={{ background: `url(${close})` }}
            onClick={this.props.deleteAllApplications}
          ></div>
        </div>

        {this.props.applications.map((application, index) => (
          <div key={index} className={styles.createApplicationBody}>
            <div className={styles.createApplicationItem}>
              <div className={styles.dateBlock}>
                Текущая дата
                <span
                >
                  {' '}
                  {`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}
                </span>
              </div>
              <div
                className={styles.styledResetApplicationButton}
                onClick={() => this.props.cleanApplication(index)}
                // onClick={(index) => this.props.cleanApplication(index)}
              >
                Сбросить |
              </div>
            </div>
            <div className={styles.line}></div>
            {/* <AppCalendar/> */}
            <div className={styles.styledPriority}>Приоритет</div>
            <div className={styles.createApplication}>
              <div className={styles.styledCreateApplication}>
                <div className={styles.application}>
                  <FlightDirection
                    changeInputHandler={(event) => this.props.updateInput(event.target.name, event.target.value, index)}
                    value={application.flightDirection.value}
                  />
                  <WorkDuration
                    changeInputHandler={(event) => this.props.updateInput(event.target.name, event.target.value, index)}
                    value={application.workDuration.value}
                  />
                  <Answer
                    changeInputHandler={(event) => this.props.updateInput(event.target.name, event.target.value, index)}
                    value={application.answer.value}
                  />
                  <div className={styles.question}>
                    <div className={styles.questionTitle}>
                      4. Выбор выходных дней
                    </div>
                    <div className={styles.answer_4}>
                    <AppDatePicker/>
                    </div>
                  </div>
                  <DepartureTime
                    handleDepartureTime={(name, event) => this.props.updateDate(name, event.target.value, index)}
                    inputText={
                      application.departureTime.day +
                      ' ' +
                      application.departureTime.time +
                      ' '
                    }
                    index={index}
                    dayValue={this.chooseDepartureDay()}
                    timeValue={this.chooseDepartureTime()}
                  />
                  <Comments
                    changeInputHandler={(event) => this.props.updateInput(event.target.name, event.target.value, index)}
                    value={application.comments.value}
                  />
                </div>
              </div>
              <div className={styles.createApplicationPriority}>
                <div>
                  <select name="flightDirection" onChange={(event) => this.props.updatePriority(event.target.name, event.target.value, index)}>
                    <option value disabled selected>
                      Выберите приоритет
                    </option>
                    {this.choosePriority()}
                  </select>
                </div>
                <div>
                  <select name="workDuration" onChange={(event) => this.props.updatePriority(event.target.name, event.target.value, index)}>
                    <option value disabled selected>
                      Выберите приоритет
                    </option>
                    {this.choosePriority()}
                  </select>
                </div>
                <div>
                  <select name="answer" onChange={(event) => this.props.updatePriority(event.target.name, event.target.value, index)}>
                    <option value disabled selected>
                      Выберите приоритет
                    </option>
                    {this.choosePriority()}
                  </select>
                </div>
                <div>
                  <select name="weekends" onChange={(event) => this.props.updatePriority(event.target.name, event.target.value, index)}>
                    <option value disabled selected>
                      Выберите приоритет
                    </option>
                    {this.choosePriority()}
                  </select>
                </div>
                <div>
                  <select name="departureTime" onChange={(event) => this.props.updatePriority(event.target.name, event.target.value, index)}>
                    <option value disabled selected>
                      Выберите приоритет
                    </option>
                    {this.choosePriority()}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.applicationAddElse}>
          <div
            className={styles.styledApplicationAddElse}
            onClick={this.props.addApplication}
          >
            + Добавить еще
          </div>
        </div>
        <div className={styles.createApplicationButton}>
          {/* Server?????? */}
          <button
            className={styles.styledCreateApplicationButton}
            type="submit"
            // onClick={}
          >
            СОХРАНИТЬ
          </button>
        </div>
      </form>
    );
  }
}

export default CreateApplication;
