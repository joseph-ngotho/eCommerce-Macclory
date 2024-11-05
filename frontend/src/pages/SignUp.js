import React, { useState } from 'react'
import loginicons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';

const SignUp = () => {
  const [showPassowrd,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false) 
    const [data,setData] = useState({
        email:"",
        password: "",
        name : "",
        confirmPassword : "",
        profilePic : ""
    })

    const handleOnchange = (e) =>{
        const {name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadPic = async(e) =>{
      const file = e.target.files[0]

      const imagePic = await imageTobase64(file)  
      
      setData((preve)=>{
        return{
          ...preve,
          profilePic : imagePic 
        }
      })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.password === data.confirmPassword){
            console.log("SummaryApi.signUp.url",'http://localhost:5000/api/signup')


           const dataResponse = await fetch('http://localhost:5000/api/signup',{
            method : "post",
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        console.log("dataAPi",dataApi)

        }else{
            console.log("Please check password and confirm password")
        }
        
    }
    console.log("data login", data)    
  return (
    <section id='signup'>
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                  <img src={data.profilePic || loginicons} alt='login icons'/>
                </div>
                <form>
                  <label>
                    <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                      Upload photo
                    </div>
                    <input type='file' className='hidden' onChange={handleUploadPic}/>
                  </label>
                  
                </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                      <label>Name :</label>
                      <div className='bg-slate-100 p-2'>
                          <input 
                              type='text' 
                              placeholder='enter your name' 
                              name='name'
                              value={data.name}
                              onChange={handleOnchange}
                              required
                              className='w-full h-full outline-none bg-transparent'/>                            
                      </div>
                </div>
                <div className='grid'>
                    <label>Email :</label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type='email' 
                            placeholder='enter your email' 
                            name='email'
                            value={data.email}
                            onChange={handleOnchange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>                            
                    </div>
                </div>
                <div>
                    <label>Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input 
                            type={showPassowrd ? "text" : "password"}
                            placeholder='enter your password...'                             
                            name='password'
                            value={data.password}
                            onChange={handleOnchange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                            <span>
                                {
                                    showPassowrd ? (
                                        <FaEyeSlash/>
                                    )
                                    :
                                    (
                                        <FaEye/>
                                    )
                                }                                                                       
                            </span>
                        </div>
                    </div>                    
                </div>

                <div>
                    <label>Confirm Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='enter confirm password...'                             
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnchange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                            <span>
                                {
                                    showConfirmPassword ? (
                                      
                                        <FaEyeSlash/>
                                    )
                                    :
                                    (
                                        <FaEye/>
                                    )
                                }                                                                       
                            </span>
                        </div>
                    </div>                    
                </div>

                <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
            </form>
            <p className='my-5'>Already have account? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link> </p>
        </div>
    </div>
</section>
  )
}

export default SignUp