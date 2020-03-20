import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addTodo, fetchTodos } from "../store/actions";

const TodoList = ({ todos, addTodo, fetchTodos }) => {
  const { isFetching, error, items } = todos;
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onClick = () => {
    addTodo("This is a test");
  };

  return (
    <div>
      {isFetching && <div>Fetching...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {items.length
          ? items.map(todo => <li key={todo.id}>{todo.text}</li>)
          : "No todos yet"}
      </ul>
      <button onClick={onClick}>Add todo</button>
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { addTodo, fetchTodos })(TodoList);
