import { useState } from 'react'
{/*
  1.import reactLogo from './assets/react.svg'  
  相对路径导入资源, 从当前文件所在目录开始查找

  2.import viteLogo from '/vite.svg'   
  从 public 目录导入资源, 以 '/' 开头,表示从根目录开始查找,区别于上一句的相对路径导入)

  3.import './App.css'   
  导入样式文件, 区别于资源文件, 样式文件会被打包工具处理并应用到页面中
*/}
import Todo from "./components/Todo";//引入子组件Todo
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(updatedTasks.find(t => t.id === id));
  }
  
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id) ;
    setTasks(remainingTasks);
  }

  const [filter, setFilter] = useState('All');
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) =>(    //修改前语句如下：const taskList = props.tasks?.map((task) =>(
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name}
      name={name} 
      isPressed={name===filter}
      setFilter={setFilter}
    />
  ));
  
  function addTask(name) {
    const newTask = { id:`todo-${nanoid(5)}`, name, completed: false };/*该语句用于创建一个新任务，id是任务的唯一标识符，name是任务的名称，completed是任务是否完成*/
      setTasks([...tasks, newTask]); /*...tasks 是展开运算符，用于将tasks数组中的所有元素展开，然后插入到新数组中*/
  }

  const  tasksNoun=taskList.length!==1 ? 'tasks' : 'task';  /*复数形式处理*/
  const  headingText=`${taskList.length} tasks remaining`; /*${}是模板字符串，用于插入变量*/

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {  
        return { ...task, name: newName };   //...task 保留任务的其他属性, 只更新 name 属性
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;