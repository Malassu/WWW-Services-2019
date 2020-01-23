import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import LoggedOutNav from './LoggedOutNav';

class FAQ extends React.Component {
    render() {
        return (
            <div>
                <LoggedOutNav />
                <Container>
                    <Link to="/">Back</Link>
                    <h1>Frequently asked questions</h1>
                    <p> * </p>
                    <h2>Who are you?</h2>
                    <p>We are students in Computer Science at Aalto University in Finland. We have designed this website as part of
            our study program. </p>
                    <h2>Is the website for me?</h2>
                    <p>
                        The website is mainly for people who store their clothes in more than one place and do not know where they
                        are. The main features of our app are creating different wardrobes with different categories and adding
                        items and outfits and their respective picture, all DIY.
        </p>
                    <p>
                        If you are a living with divorced parents, in a student house, if you have clothes at your partner’s house,
            or if you simply want to be organized and carry your closet in your pocket, that website is for you.</p>
                    <h2>What is the difference between adding an item and adding an outfit?
        </h2>
                    <p>An outfit consists of several items. You then first need to have items to create an outfit.</p>


                    <h2>How to move items ?</h2>
                    <p>When you open the wardrobe and click on an item and reach the editing page. There, you can change its
            location and/or category. </p>
                    <h2>What happens if I delete a category?</h2>
                    <p> Only the category is deleted. The items are still there but do not belong to the category any more.</p>
                    <h2>What do you do with my data?</h2>
                    <p>Your data are personal and we make no use of them. </p>
                    <h2>Can I move an entire outfit form one wardrobe to another at once?</h2>
                    <p> No but it will be implemented in the next update.</p>
                    <h2>What shall be added in the future updates?</h2>
                    <p> In the next update,we will add the possibility to
            <ol>
                            <li>Move an entire outfit from one wardrobe to another in one click.</li>
                            <li>View all the clothes with or without the categories.</li>
                            <li>Choose different icons for the wardrobe and the items.</li>
                        </ol>
                    </p>

                    <p> * </p>
                    <p>* * </p>
                    <p> * </p>
                    <p>Contact us by email on secretariat.socr@gmail.com</p>
                </Container>
            </div>
        )
    }
}
export default FAQ;