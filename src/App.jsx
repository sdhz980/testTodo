import { useEffect, useState } from 'react'
import './App.css'
import { getData , addData , modifyData , removeData } from './app/Todo';

function App() {
  const defaultTitle = 'ToDo LiSt !';
  const [todo,setTodo] = useState([]);
  const [input,setInput] = useState('')
  const [title,setTitle] = useState('ToDo LiSt !')


  useEffect(() => {
    getData().then((res) => {
      console.log(res);
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
    setTimeout(()=> {
      setTitle('Done!')
    } , 500)
    setTimeout(()=> {
      setTitle(title)
    } , 800)
    const tmpArr = [...todo];
    setTodo(tmpArr.filter((val,index) => index != key))
  }
  const handleModifyData = (key) => {
    setTitle('Loading...')
    setTimeout(()=> {
      setTitle('Done!')
    } , 500)
    setTimeout(()=> {
      setTitle(title)
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
                              

                                  <ul id='ulList' className='flex flex-col w-full gap-6 pr-10 max-h-full overflow-auto'>

                                    
                                    { todo.map((item,index) => {
                                      if (!item.completed) {

                                        return (
                                        <li className='w-full flex flex-row h-[6.2vh] items-center' key={item.id} id={`li-${item.id}`}>
                                        <p className='w-[70%] text-xl font-bold drop-shadow-md'>{item.todo}</p> 
                                        <button id='buttonModify' className='w-[15%] h-full bg-blue-500' onClick={() => handleModifyData(index)}>+</button>
                                        <button id='buttonRemove' className='w-[15%] h-full bg-red-500' onClick={() => handleRemoveData(index)}>Del</button>
                                        </li>
                                        )

                                      } else {

                                        return (
                                          <li className='w-full flex flex-row h-[6.2vh] items-center justify-end redLabel' key={item.id} id={`li-${item.id}`}>
                                          <p className='w-[60%] text-xl font-bold drop-shadow-md redLabelText'>{item.todo} is Done !</p> 
                                          {/* <button id='buttonModify' className='w-[15%] h-full bg-blue-500' onClick={() => handleModifyData(index)}>+</button> */}
                                          <button id='redLabelButton' className='w-[15%] h-full bg-red-500 redLabelButton' onClick={() => handleRemoveData(index)}>Delete Now!</button>
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
