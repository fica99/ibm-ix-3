import React from 'react';
import './index.css';
import classnames from 'classnames';

import * as calendar from './calendar';

export default class CalendarR extends React.Component {
  static defaultProps = {
    date: new Date(),
    years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    onChange: Function.prototype,
  };

  state = {
    date: this.props.date, // то что хотим видеть
    currentDate: new Date(), // текущая дата
    selectedDate: null, // выбранная дата (можно сделать диапазон дат)
    selectedWeek: null, // день недели
    arrWeek: []
  };

  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);

    this.setState({ date });
  };

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);

    this.setState({ date });
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;

    const date = new Date(year, month);

    this.setState({ date });
  };

  handleDayClick = (date) => {
    this.setState({ selectedDate: date });

    this.props.onChange(date); // сообщаем что была выбрана новая дата
  };

  handleWeekClick = (week) => {
    const {selectedWeek} = this.state;

    this.setState(state => {
      state.selectedWeek = week;
      const arrWeek = [...state.arrWeek, state.selectedWeek];
      return {
        arrWeek,
        selectedWeek
      }
    })
    console.log('===',this.state)
  };

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const { currentDate, selectedDate} = this.state;

    const monthData = calendar.getMonthData(this.year, this.month);

    return (
      <div className="calendar">
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>

          <select
            ref={(element) => (this.monthSelect = element)}
            value={this.month}
            onChange={this.handleSelectChange}
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>

          <select
            ref={(element) => (this.yearSelect = element)}
            value={this.year}
            onChange={this.handleSelectChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
        </header>

        <table>
          <thead>
              {/* недели */}
            <tr >
              {weekDayNames.map((name) => (
                <th key={name} onClick={() => this.handleWeekClick(name)}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} className="week">
                {week.map((date, index) =>
                  date ? (
                    <td
                      key={index}
                      className={classnames('day', {
                        today: calendar.areEqual(date, currentDate),
                        selected: calendar.areEqual(date, selectedDate),
                      })}
                      onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
