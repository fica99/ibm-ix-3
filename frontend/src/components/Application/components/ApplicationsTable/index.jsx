import React from 'react';
import APIRequest from '../../../../rest';
import {FormatDate} from '../../../../utils';
import styles from './styles.module.css';
import { useState } from 'react';
import edit from '../../../Profile/Data/edit.png'

function ObjectRow(props) {
  return (
    <div className={styles.rowLow}>
      <div style={{borderRight: '1px solid #cccccc'}}>{props.row.id}</div>
      <div style={{borderRight: '1px solid #cccccc'}}>{FormatDate(props.row.date)}</div>
      <div style={{borderRight: '1px solid #cccccc'}}>{props.row.reliabilityIndex}</div>
      <div style={{borderRight: '1px solid #cccccc'}}>{props.row.bonuses}</div>
      <div style={{borderRight: '1px solid #cccccc'}}>{props.row.approvalStatus}</div>
      <div style={{borderRight: '1px solid #cccccc'}}>{props.row.scheduleSatisfaction}</div>
      <div style={{borderRight: '1px solid #cccccc'}}>{FormatDate(props.row.validityDate)}</div>
      <div><a href="#" onClick={
        function (e) {
          e.preventDefault();
          let state = { };
          state.id = props.row.id;
          APIRequest("order_data", {"order_id": props.row.id}).then(function (result) {
            if (result.status === 'ok') {
              state.applications = result.directions.map(function (direction) {
                return {
                  answer: {value: direction.overtime, priority: ""},
                  comments: {value: direction.comment},
                  departureTime: {day: direction.departureTime, priority: ""},
                  flightDirection: {value: direction.direction, priority: ""},
                  weekends: {value: Array.isArray(direction.weekends) ? direction.weekends.map(
                      date => {
                        return new Date(date * 1000);
                      }
                    ) : direction.weekends, priority: ""},
                  workDuration: {value: direction.duration, priority: ""}
                }
              });
              props.handleOrderState(state);
            }
          });
        }
      }>
        <img className={styles.edit} src={edit} />
      </a></div>
    </div>
  );
}

function ApplicationsTable (props) {
  const [rows, updateRows] = useState({});
  if (!rows.status) {
    APIRequest('order_history', {}).then(
      function (result) {
        updateRows(result);
      }
    );
  }

  return (
    <div className={styles.table}>
      <div className={styles.rowFirst}>
        <div style={{borderRight: '1px solid #cccccc'}}>ID</div>
        <div style={{borderRight: '1px solid #cccccc'}}>
          Дата создания / изменения
        </div>
        <div style={{borderRight: '1px solid #cccccc'}}>
          Индекс надежности заявки
        </div>
        <div style={{borderRight: '1px solid #cccccc'}}>Бонусы / Штрафы</div>
        <div style={{borderRight: '1px solid #cccccc'}}>Статус согласования</div>
        <div style={{borderRight: '1px solid #cccccc'}}>
          Уровень удовлетворенности расписанием
        </div>
        <div style={{borderRight: '1px solid #cccccc'}}>Срок действия</div>
        <div>Редактировать</div>
      </div>
      {rows.status === 'ok' && rows.history && rows.history.map((row, i) => (<ObjectRow row={row} key={i} handleOrderState={props.handleOrderState}/>))}
    </div>
  );
}

export default ApplicationsTable;


// <tr>
//   <td>{props.row.id}</td>
//   <td>{props.row.date}</td>
//   <td>{props.row.reliabilityIndex}</td>
//   <td>{props.row.bonuses}</td>
//   <td>{props.row.approvalStatus}</td>
//   <td>{props.row.scheduleSatisfaction}</td>
//   <td>{props.row.validityDate}</td>
//   <td><a href={'/edit_order/' + props.row.id}>
//     <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill" fill="currentColor"
//          xmlns="http://www.w3.org/2000/svg">
//       <path fillRule="evenodd"
//             d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
//     </svg>
//   </a></td>
// </tr>

// <div
//   style={{
//     margin: '20px auto',
//   }}
// >
//   <table className="table">
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Дата создания / изменения</th>
//         <th>Индекс надежности заявки</th>
//         <th>Бонусы / Штрафы</th>
//         <th>Статус согласования</th>
//         <th>Уровень удовлетворенности расписанием</th>
//         <th>Срок действия</th>
//         <th>Редактировать</th>
//       </tr>
//     </thead>
//     <tbody>
//       {rows.map((row, i) => (
//         <ObjectRow row={row} key={i} />
//       ))}
//     </tbody>
//   </table>
// </div>
