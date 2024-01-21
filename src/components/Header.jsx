import React, { Component } from 'react';
import logo from '../assets/svg/logo.svg';
import './styles.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={logo} alt="logo" />
          <h1 className="header__title">Happy New Year !!!</h1>
        </div>
      </header>
    );
  }
}

export default Header;
