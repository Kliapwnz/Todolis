import {FilterValue, Task} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEventHandler, use, useState} from "react";


type Props = {
   title: string
   tasks: Task[]
   deleteTask: (taskId: string) => void
   changeFilter: (filer: FilterValue) => void
   createTask: (title: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus}: Props) => {
      const [taskTitle, setTaskTitle] = useState("")
      const [error, setError] = useState<string | null>(null)

      const createTaskHandler = () => {
         const trimmedTitle = taskTitle.trim()
         if (trimmedTitle !== "") {
            createTask(trimmedTitle)
            setTaskTitle("")
         } else {
            setError("Title is required")
         }
      }


      const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
         setTaskTitle(event.currentTarget.value)
         setError(null)
      }

      const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
         if (event.key === "Enter")
            createTaskHandler()
      }
      return (
         <div>
            <h3>{title}</h3>
            <div>
               <input className={error ? "error" : ""}
                      value={taskTitle}
                      onChange={changeTaskTitleHandler}
                      onKeyDown={createTaskOnEnterHandler}

               />
               <Button title={"+"} onClick={createTaskHandler}/>
               {error && <div className={"error-message"}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
               <p>Тасок нет</p>
            ) : (

               <ul>
                  {tasks.map(task => {
                     const deleteTaskHandler = () => {
                        deleteTask(task.id)
                     }
                     const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue)
                     }
                     return (
                        <li key={task.id}>
                           <input type="checkbox"
                                  checked={task.isDone}
                                  onChange={changeTaskStatusHandler}
                           />
                           <span>{task.title}</span>
                           <Button title={"x"} onClick={deleteTaskHandler}/>
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
   }
;

