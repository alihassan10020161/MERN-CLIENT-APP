import React,{useState,useEffect} from 'react'
import jwt from 'jsonwebtoken'
import Layout from '../cors/layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset=({match})=>{
    // props.match from react router dom
    const[values,setValues]=useState({
        name:'',
        token:'',
        newPassword:'',
        buttonText:'Password Reset'
    });

    useEffect(()=>{
        let token=match.params.token
        let {name}=jwt.decode(token)
        if(token){
            setValues({...values,name,token})
        }
    },[])

    const {name,token,newPassword, buttonText}=values;
   
    const handleChange=event=>{
        setValues({...values,newPassword:event.target.value})
    }

    const clickSubmit=event=>{
        event.preventDefault()
        setValues({...values,buttonText:'Requestting...'}) 
        axios({       
            method:'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword,resetPasswordLink:token}
         }) 
        .then(response=>{
            console.log('Reset PASSWORD SUCCESS', response)
            toast.success(response.data.message)
            setValues({...values,buttonText:'Done'})
        })
        .catch(error=>{
            console.log('Reset PASSWORD ERROR', error.response.data)
            toast.error(error.response.data.error);
            setValues({...values,buttonText:'Password Reset'})
        })
    }
    const passwordResetForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange} value={newPassword} placeholder="Type New Password"  type="password" className="form-control"/>
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
            <h1>Hey {name}, Type your new Password!</h1>
            
            {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default Reset;