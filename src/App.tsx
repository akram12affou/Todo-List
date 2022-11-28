import React, { useEffect } from 'react'
import {useState} from 'react'
import uuid4 from "uuid4";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
function App() {
  const [editeddone, setEditeddone] = useState([])
  const [editnull , setEditnull] = useState(false)
  const [alert , setAlert] = useState(false)
  const [actualid , setActualid] = useState()
  const [isopen,setIsopen] = useState(false)
  let elements : (any)  = JSON.parse(window.localStorage.getItem('todo'))
  const [edit,setEdit] = useState(false)
  const [edited , SetEdited] = useState([])
  const [newtodo, setNewtodo] = useState<String>('')
  const [todoList,setTodoList] = useState(
    elements ? elements : []
  )
  const [newname,SetNewname]= useState('')
  const deletetodo = (id: any) =>{
    setTodoList(todoList.filter((e: {id: any; }) => {
     return e.id !== id 
    }))
  }
  const cleardone = () => {
    setTodoList(todoList.filter((e) => {
       return e.done !== true
    }))
  }
  const done = (id) => {
    setEditeddone(todoList.map((e) => {
      if(e.id == id) {
        editeddone.push({id:e.id , name:e.name, done:true})
      }else{
        editeddone.push(e)
      }
    }))
    setTodoList(editeddone.filter((e) => {
      return e !== undefined ;
    }))
  }
  const clearAll = () => {
    setTodoList([]);
  }
  const addnew = (newtodo : string) => {
    if(newtodo==''){ 
      setAlert(true)
      return;
    }
    setTodoList([...todoList,{id:uuid4() , name:newtodo, done:false}])
    setNewtodo('')
  }
  useEffect(() => {
    window.localStorage.setItem('todo' , JSON.stringify(todoList))
  },[todoList])
  const ediit =(id : Number) => {
    if(newname==''){
      setEditnull(true)
      return;
    }
    SetEdited(todoList.map((e: { id: Number; }) => {
      if(id==e.id){
        edited.push({name:newname, id:e.id})
      }else{
        edited.push(e)
      }
      edited.filter((e) => {
        return e !== undefined ;
      })
    }))
    setTodoList(edited.filter((e) => {
      return e !== undefined ;
    }))
    setEdit(!edit)
    SetNewname('')
    setIsopen(false)
  }
   const clcikinedit =(id: React.SetStateAction<undefined>) => {
    setEditnull(false)
    setIsopen(true)
    setActualid(id)
   }
   let count = 0
   todoList.map((e) => {
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
     <Button color="primary" onClick={() => addnew(newtodo)}>+</Button>
     </Col>
     <Col sm={2}></Col>
    </FormGroup>
    
     <br />
     <FormGroup row>
     <Col xs='2' sm={2}></Col>
     <Col sm={7}>
     {todoList.map((e: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
      return(

      <div key={e.id}>
                
              

              
      
        {e.done ?   <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 16 3 C 8.800781 3 3 8.800781 3 16 C 3 23.199219 8.800781 29 16 29 C 23.199219 29 29 23.199219 29 16 C 29 14.601563 28.8125 13.207031 28.3125 11.90625 L 26.6875 13.5 C 26.886719 14.300781 27 15.101563 27 16 C 27 22.101563 22.101563 27 16 27 C 9.898438 27 5 22.101563 5 16 C 5 9.898438 9.898438 5 16 5 C 19 5 21.695313 6.195313 23.59375 8.09375 L 25 6.6875 C 22.699219 4.386719 19.5 3 16 3 Z M 27.28125 7.28125 L 16 18.5625 L 11.71875 14.28125 L 10.28125 15.71875 L 15.28125 20.71875 L 16 21.40625 L 16.71875 20.71875 L 28.71875 8.71875 Z"/></svg> : <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 width="26px" height="26px" viewBox="0 0 595.021 595.021"
	 >

			<path d="M507.529,87.493c-27.264-27.264-59.022-48.672-94.396-63.635C376.489,8.358,337.588,0.5,297.511,0.5
				c-40.078,0-78.979,7.858-115.624,23.358c-35.373,14.961-67.132,36.371-94.395,63.635c-27.264,27.263-48.673,59.022-63.635,94.395
				C8.358,218.532,0.5,257.434,0.5,297.511c0,40.077,7.858,78.979,23.358,115.623c14.961,35.373,36.371,67.132,63.635,94.396
				c27.263,27.263,59.022,48.672,94.395,63.634c36.645,15.5,75.546,23.358,115.624,23.358c40.077,0,78.979-7.858,115.623-23.358
				c35.373-14.961,67.133-36.371,94.396-63.634c27.263-27.264,48.673-59.022,63.634-94.396
				c15.499-36.645,23.358-75.546,23.358-115.623c0-40.077-7.858-78.979-23.358-115.624
				C556.202,146.515,534.792,114.756,507.529,87.493z M297.511,551.682c-140.375,0-254.171-113.797-254.171-254.171
				c0-140.375,113.796-254.171,254.171-254.171c140.374,0,254.171,113.796,254.171,254.171
				C551.682,437.885,437.885,551.682,297.511,551.682z"/>
			<path d="M297.511,595.021c-40.146,0-79.112-7.872-115.818-23.397c-35.433-14.988-67.245-36.434-94.553-63.741
				c-27.31-27.31-48.755-59.122-63.742-94.555C7.872,376.623,0,337.656,0,297.511c0-40.145,7.872-79.112,23.397-115.818
				c14.987-35.432,36.433-67.245,63.742-94.553c27.308-27.309,59.12-48.755,94.553-63.742C218.399,7.872,257.366,0,297.511,0
				c40.146,0,79.112,7.872,115.817,23.397c35.435,14.988,67.247,36.434,94.555,63.742c27.31,27.31,48.755,59.123,63.741,94.553
				c15.525,36.706,23.397,75.673,23.397,115.818c0,40.144-7.872,79.11-23.397,115.817c-14.985,35.432-36.432,67.244-63.741,94.555
				c-27.31,27.31-59.122,48.755-94.555,63.741C376.623,587.149,337.656,595.021,297.511,595.021z M297.511,1
				C257.5,1,218.665,8.845,182.082,24.318c-35.314,14.937-67.02,36.311-94.236,63.528c-27.218,27.217-48.591,58.923-63.528,94.236
				C8.845,218.665,1,257.5,1,297.511s7.845,78.847,23.318,115.429c14.936,35.312,36.31,67.019,63.528,94.236
				c27.217,27.216,58.922,48.59,94.236,63.526c36.582,15.474,75.417,23.319,115.429,23.319c40.011,0,78.847-7.846,115.429-23.319
				c35.312-14.936,67.019-36.309,94.236-63.526c27.219-27.22,48.592-58.925,63.526-94.236
				c15.474-36.584,23.319-75.42,23.319-115.429c0-40.011-7.846-78.847-23.319-115.429c-14.935-35.312-36.309-67.017-63.526-94.236
				c-27.217-27.216-58.922-48.59-94.236-63.528C376.357,8.845,337.521,1,297.511,1z M297.511,552.182
				c-68.025,0-131.979-26.49-180.08-74.592C69.33,429.489,42.84,365.535,42.84,297.511c0-68.025,26.49-131.979,74.591-180.08
				S229.486,42.84,297.511,42.84c68.024,0,131.979,26.49,180.079,74.591c48.102,48.101,74.592,112.055,74.592,180.08
				c0,68.024-26.49,131.979-74.592,180.079C429.489,525.691,365.535,552.182,297.511,552.182z M297.511,43.84
				c-67.758,0-131.46,26.386-179.373,74.298S43.84,229.753,43.84,297.511s26.386,131.46,74.298,179.372
				c47.913,47.912,111.615,74.299,179.373,74.299s131.46-26.387,179.372-74.299s74.299-111.614,74.299-179.372
				s-26.387-131.46-74.299-179.373C428.971,70.226,365.269,43.84,297.511,43.84z"/>
</svg>}
      {e.name}
      &nbsp; &nbsp;
      <Button color="danger" onClick={() => deletetodo(e.id)}><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg></Button>
      &nbsp;
      <Button  color="primary" onClick={() =>clcikinedit(e.id)}>Edit</Button>
      &nbsp;
      <Button color="success" onClick={() =>done(e.id)} >done</Button>
      <br /><br />
      </div>
      
            )
     })}
        <Modal isOpen={isopen}  >
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
          <FormGroup>
          <Label for="name">the New Name</Label>
          <Input  onChange={(e) => SetNewname(e.target.value)} placeholder="name..." />
          {editnull && 'Empty'}
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() =>ediit(actualid)}>Edit</Button>{' '}
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
        <Button color="danger" onClick={() => cleardone()}>Clear done</Button>
        <br />
        <br />
        <Button color="danger" onClick={() => clearAll()}>Clear All</Button>
        </Col>
        <Col xs='2' sm={2}></Col>
        </FormGroup>
        {alert && 
    <Alert color="danger">
    Empty
   </Alert>
    }
    </>
  )
}

export default App