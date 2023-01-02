import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { FC } from "react";
import db from "./firebaseconf";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth' 

import {  signInWithEmailAndPassword,signOut } from 'firebase/auth' 
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Alert,
  Col,
} from "reactstrap";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
const App: FC<undefined> = () => {
  
  const todosCollection = collection(db, "todos");
  
  
  const [todoList, setTodoList] = useState<[]>([]);
  const getTodos = async () => {
    setTodoList([])
    const  qk = query(collection(db, "todos"), where("user" , '==',  window.localStorage.getItem('user')))
    const data = await getDocs(qk);
    setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(window.localStorage.getItem('user'))
  };
  const [user, setUser] = useState('')
  const auth = getAuth()
  useEffect(() => {
    if(auth){
    onAuthStateChanged(auth , CurrentUser => {  
      setUser(CurrentUser)
      window.localStorage.setItem('user' , CurrentUser?.email)
      
    })
  }
     },[user])
  useEffect(() => {
    getTodos();
  }, []);
  const [email , setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [signIn ,setSignIn] = useState(true)
  let count: number = 0;
  const [todoexisted, setTodoexisted] = useState(false);
  const [nothinghaveDone, setNothinghaveDone] = useState(true);
  const [exist, setExist] = useState(false);
  const [editnull, setEditnull] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [isopen, setIsopen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [newtodo, setNewtodo] = useState<string>("");
  const [newname, SetNewname] = useState<string>("");
  const [DarkMode, setDarkMode] = useState<boolean>(
    window.localStorage.getItem("dark-mode") == "true" ? true : false
  );
  const [bigletter, setBigletter] = useState<boolean>(
    window.localStorage.getItem("big-letter") == "true" ? true : false
  );
     
  useEffect(() => {
    window.localStorage.setItem("dark-mode", DarkMode.toString());
  }, [DarkMode]);
  useEffect(() => {
    let count = 0;
    for (let i = 0; todoList.length > i; i++) {
      if (todoList[i].done === true) {
        setNothinghaveDone(false);
        count++;
      }
    }
    if (count == 0) {
      setNothinghaveDone(true);
    }
  }, [todoList]);
  useEffect(() => {
    window.localStorage.setItem("big-letter", bigletter.toString());
  }, [bigletter]);

  const deletetodo = async (id: any) => {
    await deleteDoc(doc(db, "todos", id));
    getTodos();
  };
  const cleardone = async () => {
    for (let i = 0; todoList.length > i; i++) {
      if (todoList[i].done === false) return;
      await deleteDoc(doc(db, "todos", todoList[i].id));
    }
    getTodos();
  };
  const done = async (id, done) => {
    await updateDoc(doc(db, "todos", id), { done: !done });
    getTodos();
  };
  const addnew = async (newtodo: string) => {
    if (newtodo == "") {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2500);
      return;
    }
    for (let i = 0; todoList.length > i; i++) {
      if (todoList[i].name == newtodo) {
        setExist(true);
        return;
      }
    }
    await addDoc(todosCollection, { name: newtodo, done: false,user:auth.currentUser?.email });
    getTodos();
    setNewtodo("");
  };
  const Edit = async (id: Number) => {
    console.log(id);
    for (let i = 0; todoList.length > i; i++) {
      if (todoList[i].name == newname) {
        setTodoexisted(true);
        return;
      }
    }
    if (newname == "") {
      setEditnull(true);
      return;
    }
    await updateDoc(doc(db, "todos", id), { name: newname });
    getTodos();
    setEdit(!edit);
    SetNewname("");
    setIsopen(false);
  };
  const clickInEdit = (id: React.SetStateAction<undefined>) => {
    setTodoexisted(false);
    setEditnull(false);
    setIsopen(true);
    setId(id);
  };
  todoList.map((e: { done: boolean }) => {
    if (e.done == true) {
      count++;
    }
  });
  const DeleteAll = async () => {
    for (let i = 0; todoList.length > i; i++) {
      await deleteDoc(doc(db, "todos", todoList[i].id));
    }
    getTodos();
  };
  const handleAuth = async () => {
    if(signIn){
      try{
  
        await createUserWithEmailAndPassword(getAuth(),email,password);
        setEmail('')
        setPassword('')
      }catch(err){
          console.log(err)
      }
    }else{
      try{
        await signInWithEmailAndPassword(getAuth(),email,password);
        setEmail('')
        setPassword('')
      }catch(err){
          console.log(err.message)
      }
    }
    getTodos()
  }
  const logOut = async() => {
    await signOut(getAuth());
    getAuth()
  }
  console.log()
  return (
    <div className={DarkMode ? "App-DARK" : "App"}>
      <p>account : {getAuth().currentUser?.email}</p>
      {!user && <>
      {signIn ?<h1>Sign In</h1> : <h1>Login</h1>}
      email : <input type="text"  value={email} onChange = {(e) => setEmail(e.target.value)}/>
      <br />
      password : <input type="text" value={password} onChange = {(e) => setPassword(e.target.value)}/>
      <br />
      <button onClick={handleAuth}>{signIn ?'Sign In' :'Login'}</button>
      {signIn ? <p onClick={() => setSignIn(false)} style={{color : 'red', textDecoration: 'underline' , cursor : 'pointer'}}>already have an account ?</p> : <p  onClick={() => setSignIn(true)} style={{color : 'red', textDecoration: 'underline' , cursor : 'pointer'}} >Create an account</p>}
      </>}
      {user && <button onClick={logOut}>Log Out</button>}
      <hr></hr>
      <br />
      <div className="parameters">
        <input
          value={DarkMode}
          onChange={() => {
            setDarkMode(!DarkMode);
          }}
          type="checkbox"
          checked={DarkMode}
        ></input>
        <label htmlFor="">Dark Mode</label>
        &nbsp;&nbsp;
        <input
          value={bigletter}
          onChange={() => {
            setBigletter(!bigletter);
          }}
          type="checkbox"
          checked={bigletter}
        ></input>
        <label htmlFor="">Big Letter</label>
      </div>
      <br />
      { user && <>
      <div className={bigletter && "App-BIG"}>
        
        <FormGroup row>
          <Col xs="2" sm={2}></Col>
          <Col sm={7}>
            <Input
              placeholder="add todo ..."
              onChange={(e) => {
                setNewtodo(e.target.value);
              }}
              value={newtodo}
            ></Input>
          </Col>
          <Col sm={1}>
            <Button color="primary" onClick={() => addnew(newtodo)}>
              <AddCircleOutlineTwoToneIcon />
            </Button>
          </Col>
          <Col sm={2}></Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="2" sm={2}></Col>
          <Col sm={7}>
            {todoList.length == 0 && <p>No todos for today</p>}
            {todoList.map((e) => {
              return (
                <div key={e.id}>
                  {e.done ? (
                    <RadioButtonCheckedIcon style={{cursor: 'pointer'}} onClick={() => done(e.id,e.done)} />
                  ) : (
                    <RadioButtonUncheckedIcon style={{cursor: 'pointer'}} onClick={() => done(e.id,e.done)} />
                  )}
                  {e.name}
                  &nbsp; &nbsp;
                  <Button color="danger" onClick={() => deletetodo(e.id)}>
                    <DeleteOutlineTwoToneIcon />
                  </Button>
                  &nbsp;
                  <Button color="primary" onClick={() => clickInEdit(e.id)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button color="success" onClick={() => done(e.id, e.done)}>
                    {e.done ? "undone" : "done"}
                  </Button>
                  <br />
                  <br />
                </div>
              );
            })}
            <Modal isOpen={isopen}>
              <ModalHeader>Edit the Todo</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="name">the New Name of the Todo :</Label>
                  <Input
                    onChange={(e) => SetNewname(e.target.value)}
                    placeholder="name..."
                  />
                  {todoexisted && <p>already existed</p>}
                  {editnull && (
                    <center>
                      <p style={{ color: "red" }}>Empty</p>
                    </center>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => Edit(id)}>
                  Edit
                </Button>{" "}
                <Button color="secondary" onClick={() => setIsopen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <div>
              <Modal isOpen={exist}>
                <ModalBody>this Todo already Exist</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => setExist(false)}>
                    OK
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            </div>
            <hr />
            {todoList.length > 0 && (
              <>
                {" "}
                <span>
                  You have {todoList.length} todo{todoList.length > 1 && "s"}
                </span>
                <br />
                <span>
                  You have done {count} todo{count > 1 && "s"}
                </span>
                <br />
                <span>
                  {" "}
                  {todoList.length - count == 0
                    ? "All the work done "
                    : `${todoList.length - count}Left`}
                </span>
              </>
            )}
            <br />
            <Button
              color="danger"
              onClick={cleardone}
              disabled={nothinghaveDone}
            >
              Clear done
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => DeleteAll()}
              disabled={todoList.length == 0 ? true : false}
            >
              Clear All
            </Button>
          </Col>
          <Col xs="2" sm={2}></Col>
        </FormGroup>
        {alert && <Alert color="danger">the Todo cant be Empty</Alert>}
      </div>
      </>}
    </div>
    
  );
};

export default App;
