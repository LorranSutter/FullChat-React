import React from 'react';
import moment from 'moment';

import styles from './styles.module.css';

const HistoryTable = (props) => {
    return (
        <table className={styles.history_table}>
            <thead>
                <tr>
                    <th id="col-username">Username</th>
                    <th id="col-room">Room</th>
                    <th id="col-message">Message</th>
                    <th id="col-date">Date</th>
                </tr>
            </thead>
            <tbody>
                {props.historyList.map(elem => (
                    <tr key={elem._id}>
                        <td>{elem.user}</td>
                        <td>{elem.room && elem.room.name}</td>
                        <td>{elem.message}</td>
                        <td>{moment(elem.date).format('MMM Do YY, hh:mm:ss a')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default HistoryTable;