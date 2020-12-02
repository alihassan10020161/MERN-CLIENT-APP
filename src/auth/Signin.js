import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'

import Layout from '../cors/layout'
import {authenticate,isAuth} from './helpers'
import Google from './Google'
import Facebook from './Facebook'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin=({history})=>{
    const[values,setValues]=useState({
        email:'alihassan10020161@gmail.com',
        password:'ali123',
        buttonText:'Submit'
    });

    const {email, password , buttonText}=values;
    const handleChange=(name)=>(event)=>{
        console.log(event.target.value)
        setValues({...values,[name]:event.target.value})
    }
    const informParant=response=>{
        authenticate(response, ()=>{
            {isAuth()&& isAuth().role==='admin'? history.push('/admin'):history.push('/private')}
            }) 
    }

    const clickSubmit=event=>{
        event.preventDefault()
        setValues({...values,buttonText:'Submitting'}) 
        axios({
            
            method:'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email,password}
         }) 
        .then(response=>{
            console.log('SIGNIN SUCCESS', response)
            // save the response (user,token) localstorage/cookie
            authenticate(response, ()=>{
                setValues({...values,name:'',email:'',password:'',buttonText:'Submitted'});
                // toast.success(`Hey ${response.data.user.name}, Welcom back!`);
                {isAuth()&& isAuth().role==='admin'? history.push('/admin'):history.push('/private')}
                }) 
            })
        .catch(error=>{
            console.log('SIGNIN ERROR', error.response.data)
            setValues({...values,buttonText:'Submit'})
            toast.error(error.response.data.error);
        })
    }


    const signinForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>

            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>

            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    return(
        <Layout>
            {/* {JSON.stringify(isAuth())} */}
            {isAuth()?<Redirect to="/" />:null}
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {/* {JSON.stringify({name,email,password})} */}
            <h1 className="p-4">Signin</h1>
            
        <Google informParant={informParant}/>
        <Facebook informParant={informParant}/>
        {signinForm()}
        <br/>
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
            Forgot Passowrd
        </Link>    
        
            </div>
        </Layout>
    );
};

export default Signin;