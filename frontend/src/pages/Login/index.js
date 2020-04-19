import React, { useEffect } from 'react';

import styles from './styles.module.css'

const Login = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "#49289e";
    }, []);

    return (
        <div className={styles.login_container}>
            <div className={styles.content}>
                <div className={styles.content_items}>
                    <div className={styles.avatar}>
                        <img src="#" alt="avatar" id="avatarImg" />
                    </div>
                    <div className={styles.side_container}>
                        {/* TODO action="/rooms" */}
                        <form action="#" method="post" class={styles.form}>
                            <h1>Full Chat</h1>
                            <input type="text" name="username" id="username" placeholder="Username" />
                            {/* TODO href="rooms" */}
                            <a href="#">
                                <button id="getStarted">Get Started</button>
                            </a>
                        </form>
                        {/* TODO href="loginAdmin" */}
                        <a href="#" className={styles.admin_page}>
                            <button>Admin</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;