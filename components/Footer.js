import React from "react";
import { FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <p>Developed by Vrinda Sharma (20MCA009)</p>
      <div className="icons">
        <a href="https://www.linkedin.com/in/vrindasharma18/" target="_blank">
          <FaLinkedin className="icon" size={24} />
        </a>
        <a href="vrinda.instructor2@gmail.com" target="_blank">
          <FaEnvelope className="icon" size={24} />
        </a>
        <a href="https://www.instagram.com/virgoo_2.0/" target="_blank">
          <FaInstagram className="icon" size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;