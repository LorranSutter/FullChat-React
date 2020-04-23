import React, { useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import api from '../../services/api';

import styles from './styles.module.css'

const AdminLogin = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [cookies, setCookie] = useCookies();

    const history = useHistory();

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.margin = "0";
    }, []);

    function handleLoginChange(e) {
        setLogin(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            api
                .post('admin', { login, password })
                .then(res => {
                    if (res.status === 200) {
                        setCookie('adminToken', res.data.adminToken);

                        history.push('/admin');
                    } else {
                        history.push('/somethingWentWrong', { message: 'Invalid login/password' });
                        return function cleanup() { }
                    }
                })
                .catch(() => {
                    history.push('/somethingWentWrong', { message: 'Invalid login/password' });
                    return function cleanup() { }
                });
        } catch (error) {
            alert('Fail to login! Try again.');
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.content}>
                <div className={styles.content_items}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1>Admin Login</h1>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            placeholder="Login"
                            value={login}
                            onChange={handleLoginChange}
                            required />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required />
                        <div className={styles.buttons}>
                            <a>
                                <button id="buttonLogin">
                                    Login
                                </button>
                            </a>
                            <Link to="/">
                                <button id="buttonCancel">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;