import { title } from "process";
import React from "react";

function TodoCard({id, title }) {
  return (
    <li>
      {title}
    </li>
  );
}

export default TodoCard;
