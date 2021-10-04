import React, {Component} from 'react';
import './styles/footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="footer mt-4">
                <section id="lab_social_icon_footer">
                <div className="container">
                    <div className="text-center center-block">
                        <a href="https://twitter.com/bootsnipp"><i id="social-tw" className="fab fa-twitter-square fa-3x social"> </i></a>
                        <a href="mailto:#"><i id="social-em" className="fas fa-envelope-square fa-3x social"> </i></a>
                        <a href="https://www.facebook.com/bootsnipp"><i id="social-fb" className="fab fa-facebook-square fa-3x social"> </i></a>
                        <a href="https://plus.google.com/+Bootsnipp-page"><i id="social-gp" className="fab fa-google-plus-square fa-3x social"> </i></a>
                    </div>
                </div>
                </section>
            </div>
        )
    }
}

export default Footer;


