import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';

class Header extends Component {
  // Header run a query that get info from current user, then render information into the Header
  renderContent() {
    const {loading,user}=this.props.data;
    if (loading) return <div />;
    if (!user) {
      return [
        <li key="1">
          <a href="/about">About</a>
        </li>,
        <li key="2">
          <a href="/auth/google">Login With Google</a>
        </li>
      ];
    } else {
      return [
        <li key="1">
          <a href="/drive/history">Drive History</a>
        </li>,
        <li key="3">
          <a href="/drive/now">Drive Now</a>
        </li>,
        <li key="2">
          <a href="/api/logout">Logout</a>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/drive/now' : '/'}
            className="left brand-logo"
          >
            Uber Web
          </Link>

          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(query)(Header);
