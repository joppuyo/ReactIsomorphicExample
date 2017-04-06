import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          defaultTitle="Acme"
          titleTemplate="%s - Acme"
        />
        <header className="header">
        <nav className="navigation clearfix">
          <Link className="header-logo" to="/" />
          <ul className="clearfix">
            <li>
              <Link to="widgets" activeClassName="active">Widgets</Link>
            </li>
            <li>
              <Link to="gadgets" activeClassName="active">Gadgets</Link>
            </li>
            <li>
              <Link to="gizmos" activeClassName="active">Gizmos</Link>
            </li>
          </ul>
        </nav>
        </header>
        {this.props.children}
        <footer className="footer">
          <div className="footer-inner">
            &copy; ACME {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    );
  }
}
