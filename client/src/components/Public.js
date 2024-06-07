import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
    
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Circuit Reanimation</span></h1>
            </header>
            <main className="public__main">
                <p>For all your repair store logistics.</p>
                <address className="public__addr">
                    Circuit Reanimation<br />
                    42 Andromeda Way<br />
                    Cloud City, CA 12345<br />
                    <a href="tel:+17777777777">(777) 777-7777</a>
                </address>
                <br />
                <p>Owner: Prahlad Ranjit</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public