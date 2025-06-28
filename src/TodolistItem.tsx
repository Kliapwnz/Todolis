import {FilterValue, Task} from "./App";
import {Button} from "./Button";
import {useRef, useState} from "react";

type Props = {
   title: string
   tasks: Task[]
   deleteTask: (taskId: string) => void
   changeFilter: (filer: FilterValue) => void
   createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {
   const [taskTitle, setTaskTitle] = useState("")

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input value={taskTitle}
                   onChange={event => setTaskTitle(event.currentTarget.value)}
            />
            <Button title={"+"} onClick={() => {
            }}/>
         </div>
         {tasks.length === 0 ? (
            <p>Тасок нет</p>
         ) : (

            <ul>
               {tasks.map(task => {
                  return (
                     <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={"x"} onClick={() => deleteTask(task.id)}/>
                     </li>
                  )
               })}
            </ul>
         )}
         <div>
            <Button title={"All"} onClick={() => changeFilter("all")}/>
            <Button title={"Active"} onClick={() => changeFilter("active")}/>
            <Button title={"Completed"} onClick={() => changeFilter("completed")}/>
         </div>
      </div>
   );
};

