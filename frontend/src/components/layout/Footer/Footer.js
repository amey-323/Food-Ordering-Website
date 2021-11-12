import React from 'react'
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download our app</h4>
                <p>Download app for ios and android mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appstore" />
            </div>
            <div className="midFooter">
                <h1>FoodApp</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights {new Date().getFullYear()} &copy;</p>
            </div>
            <div className="rightFooter">
                <h4>Dummy links</h4>
                {/* <a href="#">Link1</a>
                <a href="#">Link2</a>
                <a href="#">Link3</a> */}
            </div>
        </footer>
    )
}
export default Footer;