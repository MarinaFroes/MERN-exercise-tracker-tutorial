import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Axios from "axios";

class ExercisesList extends Component {
  state = {
    exercises: []
  }

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