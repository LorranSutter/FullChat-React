import React from 'react';

import './styles.css'

const Login = () => {
    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="content">
                <div className="content-items">
                    <div className="avatar">
                        <img src="#" alt="avatar" id="avatarImg" />
                    </div>
                    <div className="side-container">
                        {/* action="/rooms" */}
                        <form action="#" method="post" class="form">
                            <h1>Full Chat</h1>
                            <input type="text" name="username" id="username" placeholder="Username" />
                            {/* href="rooms" */}
                            <a href="#">
                                <button id="getStarted">Get Started</button>
                            </a>
                        </form>
                        {/* href="adminLogin" */}
                        <a href="#" className="admin-page">
                            <button>Admin</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;