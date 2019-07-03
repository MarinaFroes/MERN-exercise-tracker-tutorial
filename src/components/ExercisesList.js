import React, { Component } from "react";
import axios from "axios";
import Exercise from "./Exercise";

class ExercisesList extends Component {
  state = {
    exercises: []
  }

  deleteExercise = id => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data));
    this.setState({
      // Filter only exercises with a different id than the deleted exercise and save it to this.state.exercises array
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    })
  }

  /* Database user format
    - Access just the id field: exercise._id
    
    {
      "_id":{"$oid":"5d1c4af634019169f344604d"},
      "username":"beau",
      "createdAt":{"$date":{"$numberLong":"1562135286872"}},
      "updatedAt":{"$date":{"$numberLong":"1562135286872"}},
      "__v":{"$numberInt":"0"}}
    */

  componentDidMount() {
    axios.get("http://localhost:5000/exercises/")
      .then(res => {
        this.setState({
          exercises: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  // TODO: Create Exercise component
  getExerciseList() {
    return this.state.exercises.map(currentExercise => {
      return <Exercise
        exercise={currentExercise}
        deleteExercise={this.deleteExercise}
        key={currentExercise._id}
      />
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.getExerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
};

export default ExercisesList;