import './App.css'
import {TodolistItem} from "./TodolistItem";
import {useState} from "react";

export type Task = {
   id: number
   title: string
   isDone: boolean
}
export type FilterValue = "all" | "active" | "completed"

export const App = () => {
   const [filter, setFilter] = useState<FilterValue>("all")
   const [tasks, setTasks] = useState<Task[]>([
      {id: 1, title: 'HTML&CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'ReactJS', isDone: false},
   ])

   const deleteTask = (taskId: number) => {
      const filteredTasks = tasks.filter(task => {
         return task.id !== taskId
      })
      setTasks(filteredTasks)
   }

   const changeFilter = (filter: FilterValue) => {
      setFilter(filter)
   }

   let filteredTasks = tasks
   if (filter === "active") {
      filteredTasks = tasks.filter(task => !task.isDone)
   }
   if (filter === "completed") {
      filteredTasks = tasks.filter(task => task.isDone)
   }

   return (
      <div className="app">
         <TodolistItem title="What to learn"
                       tasks={filteredTasks}
                       deleteTask={deleteTask}
                       changeFilter={changeFilter}
         />

      </div>
   )
}
