import Axios from 'axios'
import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook=({informParant =f=>f})=>{
    const responseFacebook=(response)=>{
        console.log(response)
        Axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/facebook-login`,
            data:{userID:response.userID,accessToken: response.accessToken}
        })
        .then(response=>{
            console.log('FACEBOOK SIGNIN SUCCESS',response)
            // inform parant
            informParant(response)
        })
        .catch(error=>{
            console.log('FACEBOOK SIGNIN ERROR',error.response)
        })
    }
    return(
        <div className="pb-3">

<FacebookLogin
  appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
  autoLoad={false}
  callback={responseFacebook}
  render={renderProps => (
    <button onClick={renderProps.onClick} className="btn btn-info btn-block"><i className="fab fa-facebook pr-2"></i> Login With Facebook</button>
  )}
/>
        </div>
    )
}
export default Facebook;








// Login with Google

// console.cloude.google.com

// on top blue menu bar click to create a new project 
// on left sidbar menu > API & Services> CredentialsContainerCreate credentials> OAuth client IDBCursor

// .apply.apply.apply. if the options are greyed out?
// click o configure consent screen>blue button on top right
// go on with forms ... domin name ... type anythin ... works!

// In create OAuth client id pageXOffsetjust enter javascript origins>http://localhost:3000