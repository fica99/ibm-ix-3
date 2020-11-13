import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';
import ApplicationsTable from '../ApplicationsTable';
import CreateApplication from '../CreateApllication';
import filterArrow from '../../../Profile/Data/arrow_up.svg';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
      createApplication: false,
      filterValue: '',
    };
  }

  handleCreateApplication = () => {
    this.setState({
      createApplication: !this.state.createApplication,
    });
  };

  handleOrderState = (state) => {
    this.setState({
      createApplication: true
    });
  };

  handleOpenFilter = () => {
    this.setState({
      openFilter: !this.state.openFilter,
    });
  };

  // handleFilterReset = () => {
  //   this.setState({
  //     filterValue: '',
  //   });
  // };

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.titleHistory}>Мои заявки</div>
          <div
            className={styles.createOrder}
            onClick={() => this.handleCreateApplication()}
          >
            Создать заявку
          </div>
        </div>

        <div className={styles.block}>
          <div
            className={styles.blockButton}
            onClick={() => this.handleOpenFilter()}
          >
           <div className={styles.filterButton}>
              Фильтры
              <div
                className={styles.filterArrow}
                // style={{ background: `url(${filterArrow})` }}
              > 
              </div>
            </div>
          </div>

          {this.state.openFilter && <FilterBox />}

          <ApplicationsTable handleOrderState={this.handleOrderState} />
        </div>

        { this.state.createApplication
          && <CreateApplication
                {...this.props}
            />
        }
      </div>
    );
  }
}

class FilterBox extends React.Component {
  render() {
    return (
      <div className={styles.style}>
        <div className={styles.filterBlock}>
          <div className={styles.fistName}>
            <div className={styles.title_first}>
              Все заявки за период <input type="date" name="calendar" />
              <input type="date" name="calendar" />
            </div>
          </div>
          <div className={styles.secondName}>
            <div className={styles.title_second}>
              Статус согласования{' '}
              <select>
                <option>100%</option>
                <option>90%</option>
                <option>80%</option>
              </select>
            </div>
          </div>
          <div className={styles.thirdName}>
            <div className={styles.title_third}>
              {' '}
              Срок действия <input type="date" name="calendar" />
            </div>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.filterBlockButton}>
          <div className={styles.loadFilterButton}>Скачать список заявок</div>
          <div className={styles.resetFilterButton}>Сбросить фильтры</div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  applications: PropTypes.object.isRequired,
  addApplication: PropTypes.func.isRequired,
  cleanApplication: PropTypes.func.isRequired,
  deleteAllApplications: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  updatePriority: PropTypes.func.isRequired,
  updateDate: PropTypes.func.isRequired,
};

export default Filter;