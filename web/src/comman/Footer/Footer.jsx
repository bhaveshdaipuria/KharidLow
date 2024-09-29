import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


const Footer = () => {
    return (<>
        <section className="contact-area" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 margin-auto">
                        <div className="contact-content text-center">
                            <div className='footer-logo'><img src="images/Logo/Black/Textual/PNG/transparent.png" alt="logo" /></div>
                            <p>Quality Products at Unbeatable Prices – Empowering Your Business</p>
                            <div className="hr"></div>
                            <h6>25-A/22 First Floor <br />
                                Main Pandav Road, Near Swarn cinema Tiwari bhojanlaye <br />
                                Delhi-110032</h6>
                            <h6>+91 79825 25575<span>|</span>+91 87007 11482</h6>
                            <div className="contact-social">
                                <ul>
                                    <li><a className="hover-target" href=""><FaFacebook className="social-icons" /></a></li>
                                    <li><a className="hover-target" href=""><FaInstagram className="social-icons" /></a></li>
                                    <li><a className="hover-target" href=""><FaTwitter className="social-icons" /></a></li>
                                    <li><a className="hover-target" href=""><FaLinkedin className="social-icons" /></a></li>
                                    <li><a className="hover-target" href=""><FaYoutube className="social-icons" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <p>Copyright &copy; 2024 All Rights Reserved.</p>
        </footer>
    </>
    );
};

export default Footer;
