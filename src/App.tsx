import React, { useEffect } from 'react'
import {useState} from 'react'
import uuid4 from "uuid4";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';function App() {
  let count = 0
  const [editnull , setEditnull] = useState<boolean>(false)
  const [alert , setAlert] = useState<boolean>(false)
  const [id , setId] = useState<string>()
  const [isopen,setIsopen] = useState<boolean>(false)
  const [edit,setEdit] = useState<boolean>(false)
  const [newtodo, setNewtodo] = useState<string>('')
  const [todoList,setTodoList] = useState(
    JSON.parse(window.localStorage.getItem('todo')) ? JSON.parse(window.localStorage.getItem('todo')) : []
  )
  const [newname,SetNewname]= useState<string>('')
  useEffect(() => {
    window.localStorage.setItem('todo' , JSON.stringify(todoList))
  },[todoList])
  const deletetodo = (id: any) =>{
    setTodoList(todoList.filter((e: {id: any; }) => {
     return e.id !== id 
    }))
  }
  const cleardone = () => {
    setTodoList(todoList.filter((e: { done: boolean; }) => {
       return e.done !== true
    }))
  }
  const done = (id: any) => {
    setTodoList(todoList.map((e: { id: any; name: any; done: any; }) => {
      if(e.id == id) {
        return {id:e.id , name:e.name, done:!e.done}
      }else{
        return e
      }
    }))
  }
  const addnew = (newtodo : string) => {
    if(newtodo==''){ 
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      },2500)
      return;
    }
    setTodoList([...todoList,{id:uuid4() , name:newtodo, done:false}])
    setNewtodo('')
  }

  const Edit =(id : Number) => {
    if(newname==''){
      setEditnull(true)
      return;
    }
    setTodoList(todoList.map((e: { id: Number; }) => {
      if(id==e.id){
        return {name:newname, id:e.id}
      }else{
        return e
      }
    }))
    setEdit(!edit)
    SetNewname('')
    setIsopen(false)
  }
   const clickInEdit =(id: React.SetStateAction<undefined>) => {
    setEditnull(false)
    setIsopen(true)
    setId(id)
   }
   todoList.map((e: { done: boolean; }) => {
    if(e.done == true){
      count++
    }
   })
  return (
    <>
  <br />
  <FormGroup row>
  <Col xs='2' sm={2}></Col>
    <Col sm={7}>
     <Input placeholder='add todo ...'onChange={(e) => {setNewtodo(e.target.value)}} value={newtodo}></Input>
     </Col> 
     <Col sm={1}>
     <Button color="primary" onClick={() => addnew(newtodo)}><AddCircleOutlineTwoToneIcon/></Button>
     </Col>
     <Col sm={2}></Col>
    </FormGroup>
    
     <br />
     <FormGroup row>
     <Col xs='2' sm={2}></Col>
     <Col sm={7}>
      {todoList.length == 0 && <p>No todos for today</p>}
     {todoList.map((e: { id: React.SetStateAction<undefined> | React.Key | null; done: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
      return(
      <div key={e.id}>
        {e.done ?   <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/>}
      {e.name}
      &nbsp; &nbsp;
      <Button color="danger" onClick={() => deletetodo(e.id)}><DeleteOutlineTwoToneIcon/></Button>
      &nbsp;
      <Button  color="primary" onClick={() =>clickInEdit(e.id)}>Edit</Button>
      &nbsp;
      <Button color="success" onClick={() =>done(e.id)} >{e.done ? 'undone': 'done'}</Button>
      <br /><br />
      </div>
            )
     })}
        <Modal isOpen={isopen}  >
          <ModalHeader >Edit the Todo</ModalHeader>
          <ModalBody>
          <FormGroup>
          <Label for="name">the New Name of the Todo :</Label>
          <Input  onChange={(e) => SetNewname(e.target.value)} placeholder="name..." />
          {editnull && (<center><p style={{color:'red'}}>Empty</p></center>)}
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() =>Edit(id)}>Edit</Button>{' '}
            <Button color="secondary" onClick={() =>setIsopen(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <hr />
        {todoList.length>0 && <> <span>You have {todoList.length} todo{todoList.length>1 && 's' }</span>
       <br />
       <span>You have done {count} todo{count>1 && 's' }</span>
       <br />
       <span> {todoList.length-count==0 ? 'All the work done ' : `${todoList.length-count}Left`}</span>
       </>}
       <br />
        <Button color="danger" onClick={cleardone}>Clear done</Button>
        <br />
        <br />
        <Button color="danger" onClick={() =>setTodoList([])}>Clear All</Button>
        </Col>
        <Col xs='2' sm={2}></Col>
        </FormGroup>
        {alert && 
      <Alert color="danger">
        the Todo cant be Empty
      </Alert>
    }
    </>
  )
}

export default App