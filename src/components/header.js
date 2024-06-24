import React from "react";
import { Link } from 'react-router-dom';
import "../css-c/header.css";
import logo from "../assets/imgs/logolivro.png";

export default function Header() {
  return (
    <div className="header">
      <div className="subheader">
        <div className="bordaNova">
          <div className="tech">
            <img className="logo" src={logo} alt="logo"/>
            <p>ClotildeLivros</p>
            <img className="logo" src={logo} alt="logo"/>
          </div>
        </div>
        <nav id="nav">
          <Link to="/">Home</Link>
        </nav>
      </div>
    </div>
  );
}
