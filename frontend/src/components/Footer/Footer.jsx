import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaCopyright } from "react-icons/fa";

export const Footer = () => {

  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
             <div className='footer-content-left'>
             <img  className='logo' src={assets.logo} alt=""></img>
             <p>Experience culinary convenience with Food by Coder, an app dedicated to delivering your favorite meals hot and fresh, right to your doorstep, with unparalleled speed and reliability.</p>
                 <div className='footer-social-icon'>
                   <img src={assets.facebook_icon} alt=""></img>
                   <img src={assets.linkedin_icon} alt=""></img>
                   <img src={assets.twitter_icon} alt=""></img>
                 </div>
             </div>
             <div className='footer-content-center'>
                 <h2>COMPANY</h2>
                 <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                 </ul>
             </div>

             <div className='footer-content-right'>
                 <h2>GET IN TOUCH</h2>
                 <ul>
                    <li><FaPhoneSquareAlt />  +91-765498621</li>
                    <li><BiLogoGmail />  mohitgk7185@gmail.com</li>
                 </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'> Copyright 2024 <FaCopyright /> Food4Coders.com - All Rights Reserved </p>
    </div>
  )
}

export default Footer;
 