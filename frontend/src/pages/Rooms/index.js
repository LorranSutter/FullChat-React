import React, { useEffect } from 'react';

import styles from './styles.module.css'
import Room from './room';

const Login = () => {

    useEffect(() => {
        document.body.style.minWidth = "350px";
    }, []);

    return (
        <>
            <header className={styles.header_container}>
                <div className={styles.avatar_container}>
                    <div className={styles.username_container}>
                        <h2>Username</h2>
                        {/* TODO href="/" */}
                        <a href="#" id="change-username">
                            <button>Change Username</button>
                        </a>
                    </div>
                    <div className={styles.avatar}>
                        <img src="#" alt="avatar" id="avatarImg" />
                    </div>
                </div>
            </header>
            <main className={styles.rooms_container}>
                <ul className={styles.rooms_list}>
                    {[1, 2, 3, 4, 5].map((x, key) => (
                        <Room key={key} name="Room Name"></Room>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default Login;