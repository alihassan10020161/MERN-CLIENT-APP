import cookie from 'js-cookie'

// set in cookie
export const setCookie=(key,value)=>{
    if(window!=='undefined'){
        cookie.set(key,value,{
            expires:1 //1 day expire
        })
    }
}
// remove from cookie
export const removeCookie=(key)=>{
    if(window!=='undefined'){
        cookie.remove(key,{
            expires:1 //1 day expire
        })
    }
}
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie=(key)=>{
    if(window!=='undefined'){
      return cookie.get(key)
    }
}



// set in localstorage
export const setLocalStorage=(key,value)=>{
    if(window!=='undefined'){
       localStorage.setItem(key,JSON.stringify(value))
    }
}
// remove from localstorage
export const removeLocalStorage=(key)=>{
    if(window!=='undefined'){
       localStorage.removeItem(key)
    }
}
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate=(response,next)=>{
    console.log('AUTHENTICATE helper on singin response',response)
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user);
    next();
}
// access user infor from loocalstorage
export const isAuth=()=>{
    if(window!=='undefined'){
        const cookieChecked=getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user'))
            return JSON.parse(localStorage.getItem('user'))
        }
        else{
            return false;
        }
    }   
}


// signout functionality
export const signout =next=>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
}


//update localStorage
export const updateUser=(response,next)=>{
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS',response)
    if(typeof window !== 'undefined'){
        let auth =JSON.parse(localStorage.getItem('user'))
        auth=response.data
        localStorage.setItem('user',JSON.stringify(auth))
    }
    next()
}