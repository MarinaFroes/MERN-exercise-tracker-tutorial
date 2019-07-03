import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist//react-datepicker.css"

class EditExercise extends Component {
  // Add states equal to the fields of the mongoDB document and an extra users
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  }

  componentDidMount() {
    //  Get request to database 
      // Get the id directly from the url
    axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        })
      })
      .catch(err => console.log(err));
    
    axios.get("http://localhost:5000/users/")
      .then(res => {
        // Check if there's at least 1 user in the database
        if (res.data.length > 0) {
          // Populate the this.state.users array with database users
          this.setState({
            users: res.data.map(user => user.username),
            // Set username to the name of the first user 
            username: res.data[0].username
          })
        }
      })

    /* Database user format
    - Access just to the username field: res.data.map(user => user.username)
    
    {
      "_id":{"$oid":"5d1c4af634019169f344604d"},
      "username":"beau",
      "createdAt":{"$date":{"$numberLong":"1562135286872"}},
      "updatedAt":{"$date":{"$numberLong":"1562135286872"}},
      "__v":{"$numberInt":"0"}}
    */
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
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    // Send the exercise data to the backend - POST request send exercise to the endpoint
    // It doesn't accept duplicate exercise. 
    // TODO: handle duplicate exercise error
    axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
      .then(res => console.log(res.data));

    // Take the user back to the home page
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit exercise log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>{
              this.state.users.map(user =>
                (
                  <option key={user} value={user}>
                    {user}
                  </option>
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
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
};

export default EditExercise;