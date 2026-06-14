import React, { Component } from 'react';
import Logo from './logo';
import SearchBar from './searchBar';
import RecentPosts from './recentsPosts';

export default class Home extends Component {
  render() {
    return (
      <div className='app'>
        <Logo/>
        <SearchBar />
        <RecentPosts />
      </div>
    );
  }
}
