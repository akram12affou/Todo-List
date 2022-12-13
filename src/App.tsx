import React, { useEffect } from 'react'
import { useState } from 'react'
import uuid4 from "uuid4";
import './App.css'
import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
const App: FC<undefined> = () => {
  let sData: any = window.localStorage.getItem('todo')
  let count: number = 0
  const [editnull, setEditnull] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [isopen, setIsopen] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [newtodo, setNewtodo] = useState<string>('')
  const [todoList, setTodoList] = useState<[]>([])
  const [newname, SetNewname] = useState<string>('')
  const [DarkMode , setDarkMode] = useState<boolean>(window.localStorage.getItem('dark-mode') == 'true' ? true : false)
  const [bigletter , setBigletter] = useState<boolean>(window.localStorage.getItem('big-letter') == 'true' ? true : false)
  const [sure , setSure] = useState<boolean>(false)
  useEffect(() => {
    window.localStorage.setItem('dark-mode', DarkMode.toString())
  },[DarkMode])
  useEffect(() => {
    window.localStorage.setItem('big-letter', bigletter.toString())
  },[bigletter])

  useEffect(() => {
    if (JSON.parse(sData)) {
      setTodoList(JSON.parse(sData))
    }
  }
    , [])
  
  useEffect(() => {
    window.localStorage.setItem('todo', JSON.stringify(todoList))
  }, [todoList])
  const deletetodo = (id: any) => {
    setTodoList(todoList.filter((e: { id: any; }) => {
      return e.id !== id
    }))
  }
  const cleardone = () => {
    setTodoList(todoList.filter((e: { done: boolean; }) => {
      return e.done !== true
    }))
  }
  const done = (id) => {
    setTodoList(todoList.map((e) => {
      if (e.id == id) {
        return { id: e.id, name: e.name, done: !e.done }
      } else {
        return e
      }
    }))
  }
  
  const addnew = (newtodo: string) => {
    if (newtodo == '') {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2500)
      return;
    }
    for(let i = 0; todoList.length>i;i++){
      if(todoList[i].name == newtodo){
        window.alert('already in the List')
        return;
      }
      
    } 
    setTodoList([...todoList, { id: uuid4(), name: newtodo, done: false }])
    setNewtodo('')
   
  }

  const Edit = (id: Number) => {
    if (newname == '') {
      setEditnull(true)
      return;
    }
    setTodoList(todoList.map((e) => {
      if (id == e.id) {
        return { name: newname, id: e.id }
      } else {
        return e
      }
    }))
    setEdit(!edit)
    SetNewname('')
    setIsopen(false)
  }
  const clickInEdit = (id: React.SetStateAction<undefined>) => {
    setEditnull(false)
    setIsopen(true)
    setId(id)
  }
  todoList.map((e: { done: boolean; }) => {
    if (e.done == true) {
      count++
    }
  })
  console.log(DarkMode)
  return (
    <div className={DarkMode ? 'App-DARK' : 'App'}>
      <div className={bigletter && 'App-BIG'}>
      <br />
      <div className='parameters'>
      <input value={DarkMode} onChange={() => { setDarkMode(!DarkMode)}} type='checkbox' checked={DarkMode}></input>
      <label htmlFor="">Dark Mode</label>
      {' '}|{' '}
      <input value={bigletter} onChange={() => { setBigletter(!bigletter)}} type='checkbox' checked={bigletter}></input>
      <label htmlFor="">Big Letter</label>
      {' '}|{' '}
      <input type='checkbox'></input>
      <label htmlFor="">check if you sure</label>
      </div>
      <br />
      <FormGroup row>
        <Col xs='2' sm={2}></Col>
        <Col sm={7}>
          <Input placeholder='add todo ...' onChange={(e) => { setNewtodo(e.target.value) }} value={newtodo}></Input>
        </Col>
        <Col sm={1}>
          <Button color="primary" onClick={() => addnew(newtodo)}><AddCircleOutlineTwoToneIcon /></Button>
        </Col>
        <Col sm={2}></Col>
      </FormGroup>

      <br />
      <FormGroup row>
        <Col xs='2' sm={2}></Col>
        <Col sm={7}>
          {todoList.length == 0 && <p>No todos for today</p>}
          {todoList.map((e) => {
            return (
              <div key={e.id}>
                {e.done ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                {e.name}
                &nbsp; &nbsp;
                <Button color="danger" onClick={() => deletetodo(e.id)}><DeleteOutlineTwoToneIcon /></Button>
                &nbsp;
                <Button color="primary" onClick={() => clickInEdit(e.id)}>Edit</Button>
                &nbsp;
                <Button color="success" onClick={() => done(e.id)} >{e.done ? 'undone' : 'done'}</Button>
                <br /><br />
              </div>
            )
          })}
          <Modal isOpen={isopen}  >
            <ModalHeader >Edit the Todo</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">the New Name of the Todo :</Label>
                <Input onChange={(e) => SetNewname(e.target.value)} placeholder="name..." />
                {editnull && (<center><p style={{ color: 'red' }}>Empty</p></center>)}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => Edit(id)}>Edit</Button>{' '}
              <Button color="secondary" onClick={() => setIsopen(false)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <hr />
          {todoList.length > 0 && <> <span>You have {todoList.length} todo{todoList.length > 1 && 's'}</span>
            <br />
            <span>You have done {count} todo{count > 1 && 's'}</span>
            <br />
            <span> {todoList.length - count == 0 ? 'All the work done ' : `${todoList.length - count}Left`}</span>
          </>}
          <br />
          <Button color="danger" onClick={cleardone}>Clear done</Button>
          <br />
          <br />
          <Button color="danger" onClick={() => setTodoList([])}>Clear All</Button>
        </Col>
        <Col xs='2' sm={2}></Col>
      </FormGroup>
      {alert &&
        <Alert color="danger">
          the Todo cant be Empty
        </Alert>
      }
      </div>
    </div>
  )
}

export default App