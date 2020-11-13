// import React from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ru from 'date-fns/locale/ru';

// export default class AppDatePicker extends React.Component {

//   handleSelect(date) {
//     console.log(date);
//   }
//   render() {
//     return (
//       <DatePicker dateFormat="yyyy/MM/dd" locale={ru} date={new Date()} onChange={this.handleSelect} />
//     );
//   }
// }

// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import ru from 'date-fns/locale/ru';
// import './index.css';

// export default class AppDatePicker extends React.Component {
//   handleSelect(date) {
//     console.log(date);
//   }

//   render() {
//     return (
//       <DatePicker
//         // dateFormat="yyyy/MM/dd"
//         locale={ru}
//         date={new Date()}
//         onChange={this.handleSelect}
//       >
//         <div className="notice top">
//           Выберите конкретный <span>день</span> (дни)
//         </div>
//         <div className="notice">
//           , или <span>день</span> (дни) <span>недели</span>
//         </div>
//       </DatePicker>
//     );
//   }
// }

import React from 'react';
import './index.css';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';

export default class AppDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.changeInputHandler = props.changeInputHandler;
    this.changeCalendarHandler = props.changeCalendarHandler;
    this.name = props.name;
    this.index = props.index;
    console.log(props.initDates);
    this.state = {
      selectedDays: props.initDates || [],
      selectedWeeks: [],
      openCalendar: false,
    };
  }

  handleOpenCalendar = () => {
    this.setState({
      openCalendar: !this.state.openCalendar,
    });
  };

  weekDay= (week) =>{
    const { selectedWeeks } = this.state;
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    // this.changeCalendarHandler(this.name, selectedDays, this.index); ???
  }

  render() {
    const { selectedDays } = this.state;
    let days = selectedDays.map((r) => r.toLocaleDateString()).join(', ');

    return (
      <div className="calendar">
        <input
        onClick={() => this.handleOpenCalendar()}
        className="calendarInput"
        onChange={() => this.changeInputHandler(event, this.index)}
        value={selectedDays ? days : ''} name={this.name}
        autocomplete="off"
        />
        {this.state.openCalendar && (
          <div className="calendarBlock">
            <DayPicker
              selectedDays={this.state.selectedDays}
              onDayClick={this.handleDayClick}
              localeUtils={MomentLocaleUtils} locale='ru'
            />
            <div className="notice top">
              Выберите конкретный <span>день</span> (дни)
            </div>
            <div className="notice">
              , или <span>день</span> (дни) <span>недели</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
