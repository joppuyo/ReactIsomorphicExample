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
                <nav>
                    <ul>
                        <li>
                            <Link to="widgets">Widgets</Link>
                        </li>
                        <li>
                            <Link to="gadgets">Gadgets</Link>
                        </li>
                        <li>
                            <Link to="gizmos">Gizmos</Link>
                        </li>
                    </ul>
                </nav>
                {this.props.children}
            </div>
        );
    }
}
