import editImg from "./assets/edit.png"
import deleteImg from "./assets/delete.png"
import { useState } from 'react';
import './App.css';

function App() {
	let [tasksArray, setTaskArray] = useState([])
	let [newTask, setNewTask] = useState("")

	const onAddButtonClick = (e) => {
		e.preventDefault()
		if (newTask !== "") {
			setTaskArray([...tasksArray, { title: newTask, id: Date.now() }])
			setNewTask("")
		}
	}
	const onAddTaskChange = (e) => {
		setNewTask(e.currentTarget.value)
	}

	return (
		<div className="App">
			<div className="addTaskBar" >
				<form onSubmit={onAddButtonClick}>
					<input onChange={onAddTaskChange} value={newTask} placeholder="Enter text" />
					<button>Add</button>
				</form>
			</div>
			<div>
				<ol>
					{tasksArray.map(task => <li key={task.id}><Task id={task.id} tasksArray={tasksArray} setTaskArray={setTaskArray} title={task.title} /></li>)}
				</ol>
			</div>
		</div>
	);
}



const Task = (props) => {

	let [editMode, setEditMode] = useState(false)
	let [editedTask, setEditTask] = useState(props.title)
	let [taskStatus, setTaskStatus] = useState(false)

	const onDeleteImgClick = () => {
		props.setTaskArray([...props.tasksArray.filter(task => task.id !== props.id)])
	}
	const onEditImgClick = () => {
		if (editMode) {
			setEditMode(false)
			props.setTaskArray([...props.tasksArray.map(task => {
				if (task.id === props.id) {
					return { title: editedTask, id: Date.now() }
				} else {
					return task
				}
			})])
		}
		else {
			setEditMode(true)
		}
	}
	const onEditedTaskChange = (e) => {
		setEditTask(e.currentTarget.value)
	}

	const onTaskTextClick = () => {
		!taskStatus ? setTaskStatus(true) : setTaskStatus(false)
	}

	return (
		<div className="newTask">
			{editMode ?
				<input autoFocus={true} onChange={onEditedTaskChange} value={editedTask} />
				: <span onClick={onTaskTextClick} className={taskStatus ? "taskComplete" : ""}>{props.title}</span>
			}
			<img onClick={onEditImgClick} src={editImg} alt="EditImage" />
			<img onClick={onDeleteImgClick} src={deleteImg} alt="DeleteImage" />
		</div>
	)
}

export default App;
