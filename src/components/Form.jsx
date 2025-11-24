import { useState } from "react";

function Form({addTask}) { // 从 props 中解构出 addTask 函数
  const [name, setName] = useState("");
  
  function handleSubmit(event) { //event也可以命名为e，更加简洁
    event.preventDefault();
    if(name.trim()===""){
      alert("Task name cannot be empty!");
      return; /*return 用于终止函数执行，防止继续执行下面的代码*/
    }
    addTask(name.trim());
    setName("");
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}   /*name是输入框的值，指向name状态变量，用{name}表示*/
        placeholder="Add a task"
        aria-label="New todo name"
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit"  className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;