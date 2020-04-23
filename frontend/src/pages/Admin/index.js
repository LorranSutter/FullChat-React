import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';

import HistoryChat from './historyChat';
import HistorySocket from './historySocket';

const Admin = () => {

    const [historyTableDisplayed, setHistoryTableDisplayed] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {

        if (!cookies.adminToken) {
            history.push('/somethingWentWrong');
            return function cleanup() { }
        }

        setHistoryTableDisplayed(<HistoryChat></HistoryChat>);

    }, []);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";
        document.body.style.margin = "2em 3em";
    }, []);

    // TODO improve, because it is ugly
    function handleClickHistoryTableDisplayed(e) {
        if (e.target.textContent === 'History Chat') {
            setHistoryTableDisplayed(<HistoryChat></HistoryChat>);
        } else {
            setHistoryTableDisplayed(<HistorySocket></HistorySocket>);
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
                    <button onClick={handleClickHistoryTableDisplayed}>History Chat</button>
                    <button onClick={handleClickHistoryTableDisplayed}>Socket Events</button>
                    <button onClick={handleClickLogout}>Logout</button>
                </div>
            </header>
            {historyTableDisplayed}
        </>
    );
}

export default Admin;