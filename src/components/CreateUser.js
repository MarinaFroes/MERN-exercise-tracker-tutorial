import React, { Component } from "react";

class CreateUser extends Component {
  // Add states equal to the fields of the mongoDB document and an extra users
  state = {
    username: "",
  }

  // When someone enters the username in the form - onChangeUsername is triggered
  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
    }

    console.log(user);

    // Set the username to an empty string to. TODO: Connect to the database
    this.setState({
      username: ""
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>

        </form>
      </div>
    )
  }
};

export default CreateUser;