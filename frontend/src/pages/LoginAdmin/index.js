import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import styles from './styles.module.css'

const LoginAdmin = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
    }, []);

    function handleLoginChange(e) {
        setLogin(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // try {
        //     const res = await api.post('admin', { login, password });

        //     console.log('admin response');
        //     console.log(res);
        // } catch (error) {
        //     alert('Fail to login! Try again.');
        // }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.content}>
                <div className={styles.content_items}>
                    {/* TODO action="/admin" */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1>Admin Login</h1>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            placeholder="Login"
                            value={login}
                            onChange={handleLoginChange} />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange} />
                        <div className={styles.buttons}>
                            <a href="#">
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

export default LoginAdmin;