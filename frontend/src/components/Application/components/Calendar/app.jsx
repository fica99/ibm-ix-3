import React from 'react';

import Calendar from './index';

export default class AppCalendar extends React.Component {
  state = {
    date: null,
    // week: null,
  };

  handleDateChange = (date) => this.setState({ date });

//   handleWeekChange = (week) => this.setState({ week });

  render() {
    const { date, week } = this.state;

    return (
      <div>
        <div>
          {date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}

          <Calendar onChange={this.handleDateChange} />
        </div>
		{/* <div>
          {week && <p>Выбранная дата: {date.toLocaleDateString()}</p>}

          <Calendar onChange={this.handleWeekChange} />
        </div> */}

      </div>
    );
  }
}
