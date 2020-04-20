import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './styles.module.css'

const LoginAdmin = () => {

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
    }, []);

    return (
        <div className={styles.login_container}>
            <div className={styles.content}>
                <div className={styles.content_items}>
                    {/* TODO action="/admin" */}
                    <form action="#" method="post" class={styles.form}>
                        <h1>Admin Login</h1>
                        <input type="text" name="login" id="login" placeholder="Login" />
                        <input type="password" name="password" id="password" placeholder="Password" />
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