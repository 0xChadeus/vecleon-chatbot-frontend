'use client';
import { useEffect, useState } from "react";
const axios = require('axios');
import {CSRFToken} from '@/components/csrftoken'
import { useRouter } from 'next/navigation'
import {Button, Form} from "react-bootstrap";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { LandingNavbar } from "@/components/landing-navbar";

// authentication (login/signup) page
export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const router = useRouter()

  function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
    }).then(function ( response: any) {
        if(response.data[0] === 'is_authenticated: true') {
          router.push("../../edit/characters");
        } else {
          console.log(response.data);
        }
    });  
  }, []);

  const handleSubmit = (event: any) => {    
    const csrftoken = getCookie('csrftoken');  
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    }
    axios({
      withCredentials: true,
      method: 'post',
      data: data,
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/login/`,
      headers: {"X-CSRFToken": csrftoken},
    }).then(function ( response: any) {
        if(response.data['success'] === 'login success') {
          router.push("../../edit/characters");
        } else {
          console.log('error');
          console.log(response);
        }
    });  
  }
  


  return (
    // We pass the event to the handleSubmit() function on submit.
    <>
      <LandingNavbar/>

      <form onSubmit={handleSubmit}>
        <CSRFToken/>
        <div className="p-12 max-w-sm mx-auto bg-black rounded-2xl shadow-2xl
        flex items-center flex-col content-center object-center space-y-1 border
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
          className="text-left block border border-white rounded py-2 
          px-4 bg-slate-900 text-white" id="email"
          placeholder="Email"/>
          <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
          className="text-left block border border-blue-200 rounded py-2 
          px-4 bg-white text-black" id="password"
          placeholder="Password"/>
          <Button onClick={() => setShowpassword(!showPassword)}
          className="p-2">
            {!showPassword ? <FaEyeSlash size={20} 
            className="text-white"/> : 
            <FaEye size={20} className="text-white" />}
          </Button>
          <button type="submit" className="text-left block rounded py-2 
            px-4 bg-slate-200 hover:bg-white text-black" id="password_confirm">Log In</button>
          <a className="hover:text-white text-slate-300" href="register">Don't have an account? Sign Up.</a>
        </div>
      </form>
    </>
  );
}




  
