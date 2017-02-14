import React, { Component } from 'react';
import './App.css';

import UserTable from './components/UserTable';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
      errorText: null,
      sortField: '_created_at',
      sortDirection: 'desc',
      columns: ['username', '_id', '_created_at', '_updated_at', 'gtScore']
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

      console.log(sortField, sortDirection);

      this.fetchUsers(sortField, sortDirection);

      return {
        users: [],
        sortField,
        sortDirection
      }
    });
  }

  fetchUsers(sortField, sortDirection) {
    const queryParams = `?sortField=${sortField}&sortDirection=${sortDirection}`;
    fetch(`https://gt-users-service-reiyyupzic.now.sh/users${queryParams}`)
    // fetch(`http://localhost:3001/users${queryParams}`)
    .then(res => {
        return res.json();
      })
      .then(res => {
        return res.map(user => {
          const createdAtDate = new Date(user._created_at);
          const updatedAtDate = new Date(user._updated_at);

          return Object.assign({}, user, {
            _created_at: new Intl.DateTimeFormat('en-US').format(createdAtDate),
            _updated_at: new Intl.DateTimeFormat('en-US').format(updatedAtDate)
          });
        })
      })
      .then(res => {
        console.log(res);
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
        {this.state.isLoading && <p>Loading...</p>}
        <UserTable {...this.state} handleColumnHeaderClick={this.handleColumnHeaderClick} />
      </div>
    );
  }
}
export default App;

function reverseSortDirection(dir) {
  return dir === 'desc' ? 'asc' : 'desc';
}
