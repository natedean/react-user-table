import React, { Component } from 'react';
import { fetchUsers } from '../../api';

import UserTable from './UserTable';

class UserTableContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
      errorText: null,
      sortField: '_updated_at',
      sortDirection: 'desc',
      columns: ['username', '_created_at', '_updated_at', 'totalCorrect', 'totalIncorrect']
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
    this.props.setIsLoading(true);

    fetchUsers(sortField, sortDirection)
      .then(res => {
        this.setState({
          users: res
        });
        this.props.setIsLoading(false);
      })
      .catch((err) => {
        this.setState({
          errorText: err.message || err
        });
        this.props.setIsLoading(false);
      })
  }

  render() {
    return (
        <UserTable {...this.state} handleColumnHeaderClick={this.handleColumnHeaderClick} />
    );
  }
}
export default UserTableContainer;

function reverseSortDirection(dir) {
  return dir === 'desc' ? 'asc' : 'desc';
}
