import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist//react-datepicker.css"

class CreateExercise extends Component {
    // Add states equal to the fields of the mongoDB document and an extra users
    state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    }
  
  componentDidMount() {
    //  Hardcoded users - TODO: load users from database
    this.setState({
      users: ['test user'],
      username: 'test user'
    })
  }
  
  // When someone enters the username in the form - onChangeUsername is triggered
  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate = date => {
    this.setState({
      date: date
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.discription,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    // Take the user back to the home page
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create new exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select ref="userInput" required className="form-control" value={this.state.username} onCHange={this.onChangeUsername}>{
              this.state.users.map(user => 
                (
                <option key={user}
                  id={user}
                  value={user}>
                  {user}</option>
                )
              )
            }
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes):</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            {/*  TODO: Create DatePicker */}
            <DatePicker
              value={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </form>
      </div>
    )
  }
};

export default CreateExercise;