import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';

import HistoryChat from './historyChat';
import HistorySocket from './historySocket';

const Admin = () => {

    const [historyTableShown, setHistoryTableShown] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";
        document.body.style.margin = "2em 3em";

        setHistoryTableShown(<HistoryChat></HistoryChat>);

    }, []);

    // TODO improve, because it is ugly
    function handleClickHistoryTableShown(e) {
        if (e.target.textContent === 'History Chat') {
            setHistoryTableShown(<HistoryChat></HistoryChat>);
        } else {
            setHistoryTableShown(<HistorySocket></HistorySocket>);
        }
    }

    function handleClickLogout(e) {
        e.preventDefault();

        removeCookie('adminToken');

        history.push('/admin/login');
    }

    return (
        <>
            <header className={styles.header_container}>
                <h2>Admin Room</h2>
                <div>
                    <button onClick={handleClickHistoryTableShown}>History Chat</button>
                    <button onClick={handleClickHistoryTableShown}>Socket Events</button>
                    <button onClick={handleClickLogout}>Logout</button>
                </div>
            </header>
            {historyTableShown}
        </>
    );
}

export default Admin;