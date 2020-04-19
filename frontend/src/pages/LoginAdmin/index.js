import React from 'react';

import './styles.css'

const LoginAdmin = () => {
    return (
        <div className="login-admin-container">
            <div className="content">
                <div className="content-items">
                    {/* TODO action="/admin" */}
                    <form action="#" method="post" class="form">
                        <h1>Admin Login</h1>
                        <input type="text" name="login" id="login" placeholder="Login" />
                        <input type="password" name="password" id="password" placeholder="Password" />
                        <div className="buttons">
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