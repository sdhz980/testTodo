import { useEffect, useState } from 'react'
import './App.css'
import { getData , addData , modifyData , removeData } from './app/Todo';

function App() {
  const defaultTitle = 'ToDo LiSt !';
  const [todo,setTodo] = useState([]);
  const [input,setInput] = useState('')
  const [title,setTitle] = useState('ToDo LiSt !')


  useEffect(() => {
    setTitle('Loading Fetching Data...')
    getData().then((res) => {
      setTitle(title);
      setTodo(res);
    })
  } , [])

  // function handleApi (callBack) {
  //   setTitle('loading');
    
  //   callBack;

  //   getData().then((res) => {
  //     setTodo(res);
  //   })

  // }

  const handleAddData = () => {
    setTodo([...todo , {"completed": false,
      "id": Math.floor(Math.random()*(999-100+1)+100) ,
      "todo": input,
      "userId": 26}
    ])
    setInput('');
  }

  const handleRemoveData = (key) => {
    setTitle('Loading...')
    const tmpArr = [...todo];
    setTimeout(()=> {
      document.getElementById(`li-${key.toString()}`).style.opacity = 0;
      document.getElementById(`li-${key.toString()}`).style.height = 0;
      setTitle('Done!')
    } , 500)
    setTimeout(()=> {
      setTitle(defaultTitle)
      setTodo(tmpArr.filter((val,index) => index != key))
    } , 2000)
  }
  const handleModifyData = (key) => {
    setTitle('Loading...')
    setTimeout(()=> {
      setTitle('Done!')
    } , 200)
    setTimeout(()=> {
      setTitle(defaultTitle)
    } , 800)
    const tmpArr = [...todo];
    tmpArr[key].completed = true;
    setTodo(tmpArr)
  }

  return (
    <>
      <div className='flex h-[100vh] w-full justify-center items-center' id='containerTodo'>
              <div className='flex h-[90vh] w-[70vw] bg-slate-300 flex-col' id='containerTodoList'>

                        <nav className='flex h-[10%] items-center justify-center text-center text-xl font-bold' id='titleTodo'> <p>{title}</p> </nav>



                        <section className='h-[80%] relative flex'>              
                              

                                  <ul id='ulList' className='flex flex-col w-full pr-10 max-h-full overflow-auto'>

                                    
                                    { todo.map((item,index) => {
                                      if (!item.completed) {

                                        return (
                                        <li className='w-full flex flex-row h-[80px] p-1 items-center' key={item.id} id={`li-${index.toString()}`}>
                                        <p className='w-[80%] text-x font-bold drop-shadow-md'>{item.todo}</p> 
                                        <button id='buttonModify' className='w-[15%] h-full bg-blue-500' onClick={() => handleModifyData(index)}>Done Task</button>
                                        <button id='buttonRemove' className='w-[15%] h-full bg-red-500' onClick={() => handleRemoveData(index)}>Remove</button>
                                        </li>
                                        )

                                      } else {

                                        return (
                                          <li className='w-full flex flex-row h-[80px] p-1 items-center justify-end redLabel' key={item.id} id={`li-${index.toString()}`}>
                                          <p className='w-[80%] text-x font-bold drop-shadow-md redLabelText'>{item.todo} is Done !</p> 
                                          <button id='buttonModifyRed' className='w-0 h-0 bg-blue-500' onClick={() => handleModifyData(index)}></button>
                                          <button id='redLabelButton' className='w-[30%] h-full bg-red-500 redLabelButton' onClick={() => handleRemoveData(index)}>Remove Now!</button>
                                          </li>
                                          )
                                      }

                                    })}

                                  </ul>

                              
                        </section>



                        <footer className='flex flex-row ml-[10%] mr-[10%] h-[10%] items-center justify-center text-center'> 
                        
                            <div className='flex w-[80%] h-[100%] items-center justify-center'>
                                  <input className='w-[70%] h-[60%]' type="text" 
                                  id='inputForm'
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                                  />
                            </div>

                            <div className='w-[20%]'>
                                <button className='h-14 w-14 bg-white rounded-full text-5xl font-extrabold' onClick={handleAddData} > + </button> 
                            </div>
                        
                        </footer>



              </div>
        </div>
    </>
  )
}

export default App
