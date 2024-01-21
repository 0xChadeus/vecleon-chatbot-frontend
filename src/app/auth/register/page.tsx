'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
const axios = require('axios');
import fs from 'fs';
import {CSRFToken} from '@/components/csrftoken'
import { useRouter } from 'next/navigation'
import {Button, Form, InputGroup} from "react-bootstrap";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { LandingNavbar } from "@/components/landing-navbar";


// authentication (login/signup) page
export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordconfirm] = useState('');
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const router = useRouter()

  const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  function getCookie(name: any) {
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

  const handleSubmit = (event: any) => {    
    const csrftoken = getCookie('csrftoken');

    event.preventDefault();
    if(!(email && email.match(emailFormat))){
      console.log('invalid email format');
      return;
    }
    console.log("email: " + email);
    console.log(password);
    console.log(passwordConfirm);

    if (password !== passwordConfirm) {
      console.error('passwords do not match');
      return;
    }
    const data = {
      email: email,
      password: password,
    }

    axios({
      withCredentials: true,
      method: 'post',
      data: data,
      url: 'http://127.0.0.1:7950/authbackend/register/',
      headers: {"X-CSRFToken": csrftoken},
    })
      .then(function (response: any) {
        router.push("./login/");
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
          <input type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="text-left block border border-white rounded py-2 
          px-4 bg-cyan-slate-950 text-white" id="email"
          placeholder="Email"/>
          <Form.Control type={showPassword ? "text" : "password"} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="text-left block border border-blue-200 rounded py-2 
          px-4 bg-white text-black" id="password"
          placeholder="Password"/>
          <Form.Control type={showPassword ? "text" : "password"} 
          value={passwordConfirm} 
          onChange={(e) => setPasswordconfirm(e.target.value)}
          className="text-left block border border-blue-200 rounded py-2 
          px-4 bg-white text-black" id="password"
          placeholder="Confirm Password"/>
          <Button onClick={() => setShowpassword(!showPassword)}
          className="p-2">
            {!showPassword ? <FaEyeSlash size={20} 
            className="text-white"/> : 
            <FaEye size={20} className="text-white" />}
          </Button>
          <button type="submit" className="text-left block rounded py-2 
            px-4 bg-white hover:bg-cyan-200 text-black" id="password_confirm">Sign Up</button>
          <a className="hover:text-white text-slate-300" href="login">Already have an account? Sign in.</a>

        </div>
      </form>
    </>
  );

}

  
