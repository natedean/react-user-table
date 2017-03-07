import React, { Component } from 'react';
import { fetchQuestions } from '../../api';

class QuestionTableContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    fetchQuestions()
      .then(questions => this.setState(() => ({ questions })))
  }

  render() {
    return (
      <div>
        {!!this.state.questions.length &&
        <table>
          <thead>
          <tr>
            <td>Difficulty</td>
            <td>CorrectnessIndex</td>
            <td>SpeedIndex</td>
            <td>Text</td>
          </tr>
          </thead>
          <tbody>
          {this.state.questions.map(question =>
            <tr key={question._id}>
              <td>{question.difficulty}</td>
              <td>{question.correctnessIndex}</td>
              <td>{question.speedIndex}</td>
              <td>{question.text}</td>
            </tr>
          )}
          </tbody>
        </table>}
      </div>
    );
  }

}

export default QuestionTableContainer;
