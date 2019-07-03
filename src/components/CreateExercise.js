import React, { Component } from "react";

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
        <p>CreateExercise Component</p>
      </div>
    )
  }
};

export default CreateExercise;