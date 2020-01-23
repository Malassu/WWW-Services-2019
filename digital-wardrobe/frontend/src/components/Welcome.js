import React from 'react';
import { Link } from 'react-router-dom';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

import LoggedOutNav from './LoggedOutNav';

class Welcome extends React.Component {
    render() {
        return (
            <div>
                <LoggedOutNav />
                <Container>
                    <Link className="back-link" to="/">Back</Link>
                    <h1>Welcome  </h1>
                    <p> * </p>
                    <h3>To find you clothes with ability,</h3>
                    <h3>Remember to use your creativity,</h3>
                    <h3>The closet map is your servant,</h3>
                    <h3>To help you find your garment. </h3>
                    *<br /> ** <br /> *
                    <p> Whether you are a guy or a chick </p>
                    <p>Whether you be peaceful or rough</p>
                    <p>Whether you're young, whether you're old</p>
                    <p>Whether you are an atheist, Whether you are pious</p>
                    <p>Whether you're one-armed, Whether you're left-handed</p>
                    <p>Whether you're rich or still broke</p>
                    <p>Whether you're stressed or never in a hurry</p>
                    <p>Whether you're a cop, Whether you got busted</p>
                    <p>Whether you're white, Whether you're black</p>
                    <p>Whether you are on time or always late</p>
                    <p>Whether you're drunk, Whether you're round</p>
                    <p>Whether you're bald, whether you're blond</p>
                    <p>Whether you're a quail or a bobo</p>
                    <p>Whether you're gay or a virgin</p>
                    <p>Whether you're maniacal or messy</p>
                    <p>Whether you're still sober or alcoholic</p>
                    <p>Whether you're a dwarf or a perch</p>
                    <p>Whether you're two of you' or you're always fishing</p>
                    <p>Whether you're shy or a chatterbox</p>
                    <p>Whether you're a boss or unemployed</p>
                    <p>Whether you're a sportsman or a comic book smoker</p>
                    <p>Whether you've been in school for a long time, Whether you don't have a degree</p>
                    <p>Whether you like to be at peace or you like to party</p>
                    <p> *  </p>

                    <h2>The Closet Map can help you daily.</h2>
                </Container>
            </div>
        )
    }
}

export default Welcome;