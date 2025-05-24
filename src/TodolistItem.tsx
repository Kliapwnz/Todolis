import {Task} from "./App";

type Props = {
   title: string
   tasks: Task[]
}

export const TodolistItem = (props: Props) => {
   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input/>
            <button>+</button>
         </div>
         <ul>
            {props.tasks.map(task => {
               return (
                  <li>
                     <input type="checkbox" checked={task.isDone}/>
                     <span>{task.title}</span>
                  </li>
               )
            })}
         </ul>
         <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
         </div>
      </div>
   );
};

