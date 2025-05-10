import * as React from 'react';
import './style.css';
import { ButtonGroup, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [inputOld, setInputOld] = React.useState('');
  const [showUpdateBtn, setShowUpdateBtn] = React.useState(false);
  const addTask = () => {
    if (input.length > 0) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };
  const changeTask = (val) => {
    setInput(val);
    setInputOld(val);
    setShowUpdateBtn(true);
  };
  const updateTask = () => {
    if (input !== inputOld) {
      tasks.map((val, key) => {
        if (val === inputOld) {
          tasks[key] = input;
        }
      });
      setTasks(tasks);
      setShowUpdateBtn(false);
      setInputOld('');
      setInput('');
    }
  };
  const removeTask = (val) => {
    const updatedTask = tasks.filter((task) => task !== val);
    setTasks(updatedTask);
  };

  const LoadTask = () => {
    if (tasks.length === 0) {
      return <h5>No task added. Please add your first task</h5>;
    }
    return (
      <>
        {tasks.length > 0 && (
          <ul>
            {tasks.map((val) => (
              <li>
                {val} &nbsp;
                <ButtonGroup variant="text" aria-label="Basic button group">
                  <Button onClick={() => changeTask(val)}>Edit</Button>
                  <Button onClick={() => removeTask(val)}>Remove</Button>
                </ButtonGroup>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <div>
      <h2>Task todo list</h2>
      <TextField
        type="text"
        name="task"
        value={input}
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Small"
        variant="filled"
        size="small"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      &nbsp;
      {!showUpdateBtn && (
        <Button variant="contained" onClick={addTask}>
          Add
        </Button>
      )}
      {showUpdateBtn && (
        <Button variant="contained" onClick={updateTask}>
          Update
        </Button>
      )}
      <LoadTask />
    </div>
  );
}
