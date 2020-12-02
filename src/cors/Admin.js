import React,{useState,useEffect} from 'react'

import Layout from '../cors/layout'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie, isAuth, signout, updateUser } from '../auth/helpers';

const Admin=(history)=>{
    const[values,setValues]=useState({
        role:'',
        name:'',
        email:'',
        password:'',
        buttonText:'Update'
    });

    const token=getCookie('token')
    // useEffect(()=>{},[leave empty if effect any change other wise write name])

    useEffect(()=>{
        loadProfile()
        console.log(token)
    },[])

const loadProfile=()=>{
    axios({
        method:'GET',
        url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        console.log('Admin Profile Update',response)
        const {role,name,email}=response.data
        setValues({...values,role,name,email})
    })
    .catch(error=>{
        console.log('Admin Profile Update Error',error.response.data.error)
        if(error.response.status===401){
            signout(()=>{
                history.pushState('/')
            })
        }
    })
}


    const {role, name, email, password , buttonText}=values;
    const handleChange=(name)=>(event)=>{
        console.log(event.target.value)
        setValues({...values,[name]:event.target.value})
    }
    const clickSubmit=event=>{
        event.preventDefault()
        setValues({...values,buttonText:'Updatting'}) 
        axios({
            method:'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: {name,password}
         }) 
        .then(response=>{
            console.log('Admin USER PROFILE UPDATE SUCCESSFULLY', response)
            updateUser(response,()=>{
                setValues({...values,buttonText:'Updated'});
                toast.success('Profile update successfully');
                })
        })
        .catch(error=>{
            console.log('Admin ERROR', error.response.data.error)
            setValues({...values,buttonText:'Submit'})
            toast.error(error.response.data.error);
        })
    }


    const AdminForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled/>

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
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="text-center">Admin</h1>
            <p className="lead text-center">Update Profile</p>
            {AdminForm()}                
            </div>
        </Layout>
    );
};

export default Admin;