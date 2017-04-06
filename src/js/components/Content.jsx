import axios from 'axios';
import { asyncConnect } from 'redux-connect';
import React from 'react';
import Helmet from 'react-helmet';
import config from '../config';

let url = null;
if (config.port === 80) {
  url = `http://${config.hostname}`
} else if (config.port === 443) {
  url = `https://${config.hostname}`
} else {
  url = `http://${config.hostname}:${config.port}`
}

console.log(url);

@asyncConnect([{
  key: 'content',
  promise: ({ params, helpers }) => {
    console.log('in async connect...');
    return axios.request(`${url}/api/pages/${params.pageSlug}`).then((response) => {
      console.log(response);
      return response.data;
    });
  },
}])
export default class Content extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title={ this.props.content.title }
          meta={[
            { name: 'description', content: this.props.content.description },
            { property: 'og:title', content: `${this.props.content.title} - Acme` },
            { property: 'og:description', content: this.props.content.description },
            { property: 'og:image', content: url + this.props.content.image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@joppuyo' },
            { name: 'twitter:title', content: `${this.props.content.title} - Acme` },
            { name: 'twitter:description', content: this.props.content.description },
            { name: 'twitter:image', content: url + this.props.content.image },
          ]}
        />
        <div className="image-wrapper">
          <div className="image" style={{backgroundImage: `url("${this.props.content.image}")`}}>
          <div className="image-darken"/>
            <div className="image-text">
              <h1>{this.props.content.title}</h1>
              <p>{this.props.content.description}</p>
            </div>
          </div>
        </div>
        <section className="content">
          <p>{this.props.content.body}</p>
        </section>
      </div>
    );
  }
}
