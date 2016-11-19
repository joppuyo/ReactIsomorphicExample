import axios from 'axios';
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-connect'
import React from 'react';
import Helmet from 'react-helmet';

@asyncConnect([{
    key: 'content',
    promise: ({ params, helpers }) => {
        return axios.request(`/api/pages/${params.pageSlug}`).then((response) => {
            console.log(response);
            return response.data;
        });
    }
}])
export default class Content extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    title={this.props.content.title}
                    meta={[
                        {"name": "description", "content": this.props.content.description},
                        {"property": "og:description", "content": this.props.content.description},
                        {"property": "og:title", "content": `${this.props.content.title} - Acme`},
                        {"name": "twitter:card", "content": "summary_large_image"},
                        {"name": "twitter:site", "content": "@joppuyo"},
                        {"name": "twitter:title", "content": `${this.props.content.title} - Acme`},
                        {"name": "twitter:description", "content": this.props.content.description},
                    ]}
                />
                <h1>{this.props.content.title}</h1>
                <p>{this.props.content.body}</p>
            </div>
        )
    }
}
