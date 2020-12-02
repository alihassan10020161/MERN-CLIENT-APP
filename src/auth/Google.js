import Axios from 'axios'
import React from 'react'
import GoogleLogin from 'react-google-login'

const Google=({informParant =f=>f})=>{
    const responseGoogle=(response)=>{
        console.log(response.tokenId)
        Axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/google-login`,
            data:{idToken: response.tokenId}
        })
        .then(response=>{
            console.log('GOOGLE SIGNIN SUCCESS',response)
            // inform parant
            informParant(response)
        })
        .catch(error=>{
            console.log('GOOGLE SIGNIN ERROR',error.response)
        })
    }
    return(
        <div className="pb-3">
            <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-danger btn-block"><i className="fab fa-google pr-2"></i> Login With Google</button>
              )}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
export default Google;








// Login with Google

// console.cloude.google.com

// on top blue menu bar click to create a new project 
// on left sidbar menu > API & Services> CredentialsContainerCreate credentials> OAuth client IDBCursor

// .apply.apply.apply. if the options are greyed out?
// click o configure consent screen>blue button on top right
// go on with forms ... domin name ... type anythin ... works!

// In create OAuth client id pageXOffsetjust enter javascript origins>http://localhost:3000