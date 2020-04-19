import React from 'react';

import styles from './styles.module.css'

const LoginAdmin = () => {
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
                            <a href="#">
                                <button id="buttonCancel">
                                    Cancel
                                </button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;