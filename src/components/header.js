import React from "react";
import "../css-c/header.css";
import logo from "../assets/imgs/logolivro.png"


export default function Header() {
  const TecHOLink = document.getElementById("tech");
  const NavLinks = document.getElementById("nav");

  return (
    <div className="header">
      <div className="subheader">
        <div className="bordaNova">
          <div className="tech">
            <img className="logo" src={logo}/>
            <p>ClotildeLivros</p>
            <img className="logo" src={logo}/>
          </div>
        </div>
      </div>
    </div>
  );
}
