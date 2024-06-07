import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
    
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Repair Tracker</span></h1>
            </header>
            <main className="public__main">
                <p>For all your repair store logistics.</p>
                <address className="public__addr">
                    Prahlad Develops<br />
                    42 Andromeda Way<br />
                    Cloud City, CA 12345<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Prahlad Ranjit`</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public