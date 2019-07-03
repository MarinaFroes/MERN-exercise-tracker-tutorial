import React from "react";
import { Link } from "react-router-dom";

// Functional React Component - lack of state and class
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <Link to={`/edit/${props.exercise._id}`}>
      edit
    </Link> | <button type="button" onSubmit={props.deleteExercise(props.exercise._id)}>delete</button>
  </tr>
)

export default Exercise;