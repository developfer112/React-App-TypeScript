import React, { FormEvent, useState, useRef } from 'react';
import './App.css';

type FormElement = FormEvent<HTMLFormElement>;
interface ITask{
  name: string;
  done: boolean;
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [task, setTask] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask)
    setNewTask('');
    taskInput.current?.focus();
  }

  const addTask = (name: string): void => {
    const newTask: ITask[] = [...task, {name, done: false}]
    setTask(newTask)
  }

  const toggleDoneTask = (i: number): void => {
    const newTask: ITask[] = [...task];
    newTask[i].done = !newTask[i].done;
    setTask(newTask);
  }

  const removeTask = (i: number):void => {
    const newTask: ITask[] = [...task];
    newTask.splice(i, 1);
    setTask(newTask);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} className="form-control" ref={taskInput} autoFocus/>
                <button className="btn btn-success btn-block mt-2 key={i}">
                  Save
                </button>
            </form>
          </div>
        </div>
        {
          task.map((t: ITask, i: number) => (
            <div className="card card-body mt-2">
              <h2 style={{ textDecoration: t.done ? 'line-through' : ''}}>{t.name}</h2>
              <div>
                <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)}>
                  {t.done ? '√' : '∫'}
                </button>  
                <button className="btn btn-danger" onClick={() => removeTask(i)}>
                🗑
                </button>
              </div>             
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default App;
