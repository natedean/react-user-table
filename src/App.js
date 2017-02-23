import React, { Component } from 'react';
import api from './api';
import './App.css';

import UserTable from './components/UserTable';
import TopLoadingIndicator from './components/TopLoadingIndicator';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
      errorText: null,
      sortField: '_updated_at',
      sortDirection: 'desc',
      columns: ['username', '_created_at', '_updated_at', 'gtScore']
    };

    this.handleColumnHeaderClick = this.handleColumnHeaderClick.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers(this.state.sortField, this.state.sortDirection);
  }

  handleColumnHeaderClick(column) {
    this.setState(prevState => {

      const sortField = column;
      const sortDirection = sortField === prevState.sortField ? reverseSortDirection(prevState.sortDirection) : 'desc';

      this.fetchUsers(sortField, sortDirection);

      return {
        users: [],
        isLoading: true,
        sortField,
        sortDirection
      }
    });
  }

  fetchUsers(sortField, sortDirection) {
      api.fetchUsers(sortField, sortDirection)
      .then(res => {
        this.setState({
          users: res,
          isLoading: false
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          errorText: err.message || err
        });
      })
  }

  render() {
    return (
      <div className="App container">
        <div className="topSection">
          <TopLoadingIndicator isLoading={this.state.isLoading} />
        </div>
        <UserTable {...this.state} handleColumnHeaderClick={this.handleColumnHeaderClick} />
      </div>
    );
  }
}
export default App;

function reverseSortDirection(dir) {
  return dir === 'desc' ? 'asc' : 'desc';
}
