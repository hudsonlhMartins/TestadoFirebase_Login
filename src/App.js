import React, { useEffect } from 'react'
import {useState} from 'react'
import {db} from './firebaseConnection';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import { async } from '@firebase/util';
import { auth } from './firebaseConnection';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut
  } 
    from 'firebase/auth'
import './style.css'





function App() {
  const [users, setUsers] = useState([])
  const [inputName, setInputName] = useState('')
  const [inputAge, setInputAge] = useState('')
  const [registerEmail, setregisterEmail] = useState('')
  const [registerSenha, setregisterSenha] = useState('')
  const [user, setUser] = useState({})
  const [loginEmail, setloginEmail] = useState('')
  const [loginSenha, setloginSenha] = useState('')


  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
  })


  const registerUser = async()=>{
    try{
      const user = createUserWithEmailAndPassword(auth, registerEmail, registerSenha)
      console.log(user)
    }catch(error){
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginSenha
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deslogar = async()=>{
    await signOut(auth)
  }


  const usersCollectionRef = collection(db, 'uso')
  async function handleAdd (){
      await addDoc(usersCollectionRef, {idade: inputAge, nome: inputName})  
  }

  const deleteUser = async(id)=>{
    const userDoc = doc(db, 'uso', id)
    await deleteDoc(userDoc)
  }

  const updateUser = async(id, idade, nome)=>{
    const userDoc = doc(db, 'uso', id)
    setInputName(nome)
    setInputAge(idade)
    const newFields = {idade: idade=inputAge, nome: nome=inputName}
    updateDoc(userDoc, newFields)
  }


  useEffect(()=>{
    const getUsers = async ()=>{
      const data = getDocs(usersCollectionRef)
      console.log(data)
      data.then(data => setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id}))))
      // aqui ele esta pegando dos os item com .. e tbm criar umnova com id, pq o id não__
      // e uma prop do elemento ele ficar no field
    }
    getUsers()
  }, [])


  return (
    <div className="App">

      <h3>Registre</h3>
      <input  type='email' value={registerEmail} onChange={(e)=> setregisterEmail(e.target.value)} />
      <input  type='email' value={registerSenha} onChange={(e)=> setregisterSenha(e.target.value)} />
      <button onClick={registerUser}>Cadastrar Usuario</button>
      <br/>
      
      <hr/>
      


      <h2>Login</h2>
      <input  type='email' value={loginEmail} onChange={(e)=> setloginEmail(e.target.value)} />
      <input  type='email' value={loginSenha} onChange={(e)=> setloginSenha(e.target.value)} />
      <button onClick={login}>login</button>

      <h5>User Logado: {user?.email} </h5>
      <button onClick={deslogar} >Sair</button>
      <br/>


      <h1>Banco de Dados</h1>
     <input type='text' value={inputName} onChange={(e)=> setInputName(e.target.value)} />
     <input type='text' value={inputAge} onChange={(e)=> setInputAge(e.target.value)} />
     <button type='button' onClick={handleAdd}>Cadastrar</button>

     
     {users.map(item =>{
       return(
         <div>
           <h3>Nome: {item.nome}</h3>
           <h3>idade: {item.idade}</h3>
           <button onClick={()=>{updateUser(item.id, item.idade, item.nome)}}>editar</button>
           <button onClick={()=>{deleteUser(item.id)}}>Deletar</button>
         </div>
       )
     })}
 
    </div>
  );
}

export default App;
