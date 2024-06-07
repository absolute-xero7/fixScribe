import { Link } from "react-router-dom";

import React from 'react'


const Public = () => {

    const content = (
        <section className="public">
            <header className="header">
                <h1 className="header__title">Welcome to <span className="nowrap">Circuit Reanimation</span></h1>
            </header>
            <main className="public__main">
                <p className="main__text">For all your repair store logistics.</p>
                <address className="public__addr">
                    Circuit Reanimation<br />
                    42 Andromeda Way<br />
                    Cloud City, CA 12345<br />
                    <a href="tel:+17777777777" className="contact__link">(777) 777-7777</a>
                </address>
                <br />
                <p className="owner__text">Owner: Prahlad Ranjit</p>
            </main>
            <footer className="footer">
                <Link className="login_button" to="/login">Employee Login</Link>
            </footer>
        </section>
    );
    return content;
};

export default Public;