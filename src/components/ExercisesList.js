import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Axios from "axios";

class ExercisesList extends Component {
  state = {
    exercises: []
  }

  deleteExercise = id => {
    Axios.delete(`http://localhost:5000/exercises/${id}`)
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
    Axios.get("http://localhost:5000/exercises/")
      .then(res => {
        this.setState({
          exercises: res.data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
};

export default ExercisesList;