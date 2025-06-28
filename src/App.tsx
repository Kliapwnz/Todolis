import './App.css'
import {TodolistItem} from "./TodolistItem";
import {useState} from "react";

import {v1} from "uuid";

export type Task = {
   id: string
   title: string
   isDone: boolean
}
export type FilterValue = "all" | "active" | "completed"

export const App = () => {
   const [filter, setFilter] = useState<FilterValue>("all")
   const [tasks, setTasks] = useState<Task[]>([
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
   ])

   const deleteTask = (taskId: string) => {
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
   let createTask = (title: string) => {
      const newTask = {id: v1(), title, isDone: false}
      const newTasks = [newTask, ...tasks]
      setTasks(newTasks)
   }
   let changeTaskStatus = (taskId: string, isDone: boolean) => {
      const task = tasks.find(t=> t.id === taskId)
      if(task){
         task.isDone = isDone
         setTasks([...tasks])
      }
   }

   return (
      <div className="app">
         <TodolistItem title="What to learn"
                       tasks={filteredTasks}
                       deleteTask={deleteTask}
                       changeFilter={changeFilter}
                       createTask={createTask}
                       changeTaskStatus={changeTaskStatus}
         />

      </div>
   )
}
