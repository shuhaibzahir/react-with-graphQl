
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { fetchAllData } from './api/task';
import './App.css';
import SingleTask from './components/SingleTask';
import TaskCreation from './components/TaskCreation';

function App() {
const [tasks, setTasks] = useState([])
const {loading , refetch } = useQuery(fetchAllData,{
  onCompleted:(res)=>{
    setTasks(res?.getAllTask)
  },

})



if(loading){
  return <p className="container">this is loading</p>
}
  return (
    <div className="container">
      <div className='taskDetails'>
          {
            tasks.length ? 
            tasks.map((item,index)=> <SingleTask data={item} key={item._id} index={index} setTask={setTasks} refetch={refetch} />)
            : <h1>Add Your Tasks</h1>
          }
      </div>
      <div className='inputArea'>
      <TaskCreation setTask={setTasks}/>
      </div>
    </div>
  );
}

export default App;
