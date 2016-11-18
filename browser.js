import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';

class HelloMessage extends React.Component {
    constructor(props) {
        console.log(props);
        super(props)
    }
    render() {
        return <div>Hello React</div>;
    }
}

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Page}>
                    <IndexRedirect to="widgets" />
                    <Route path=":pageSlug" component={HelloMessage}/>
                </Route>
            </Router>
        );
    }
}

class Page extends React.Component {
    render() {
        return (
            <div>
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

ReactDOM.render(<App />, document.getElementById('content'));
