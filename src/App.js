import React, { Component } from 'react';
import './App.css';

import TopStatsContainer from './components/TopStats/TopStatsContainer';
import UserTableContainer from './components/UserTable/UserTableContainer';
import QuestionTableContainer from './components/QuestionTable/QuestionTableContainer';
import TopLoadingIndicator from './components/TopLoadingIndicator';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTable: 'user',
      isLoading: false
    };

    this.setIsLoading = this.setIsLoading.bind(this);
    this.setSelectedTable = this.setSelectedTable.bind(this);
    this.setTable = this.setTable.bind(this);
  }

  setIsLoading(isLoading) {
    this.setState(() => ({ isLoading }));
  }

  setSelectedTable(selectedTable) {
    this.setState(() => ({ selectedTable }));
  }

  setTable(selectedTable) {
    switch (selectedTable) {
      case 'user':
        return <UserTableContainer setIsLoading={this.setIsLoading} />;
      case 'question':
        return <QuestionTableContainer setIsLoading={this.setIsLoading} />;
    }
  }

  render() {
    return (
      <div className="App container">
        <div className="topSection">
          <TopLoadingIndicator isLoading={this.state.isLoading} />
        </div>
        <TopStatsContainer setIsLoading={this.setIsLoading} />
        <div className="tablesContainer">
          <div className="tablesContainer__btnRow">
            <button
              className={`btn tablesContainer__btn btn-flat${setBtnClass(this.state.selectedTable, 'user')}`}
              onClick={() => this.setSelectedTable('user')}
            >
              User Table
            </button>
            <button className={`btn tablesContainer__btn btn-flat${setBtnClass(this.state.selectedTable, 'question')}`}
              onClick={() => this.setSelectedTable('question')}
            >
              Question Table
            </button>
          </div>
          { this.setTable(this.state.selectedTable) }
        </div>
      </div>
    );
  }
}

export default App;

function setBtnClass(selectedTable, currBtn) {
  return selectedTable === currBtn ? ' tablesContainer__btn--active' : '';
}
