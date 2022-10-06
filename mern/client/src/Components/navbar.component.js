import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg p-4">
          <Link to="/" className="navbar-brand">J TALE  </Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/get" className="nav-link">Get User</Link>
          </li>
            <li className="navbar-item">
            <Link to="/user" className="nav-link">Create User</Link>
            </li>
            <li className="navbar-item">
            <Link to="/transcript" className="nav-link">Get Transcript</Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    }
  }