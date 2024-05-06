'use client';
import { useEffect, useState } from "react";
const axios = require('axios');
import {CSRFToken} from '@/components/csrftoken'
import { useRouter } from 'next/navigation'
import {Button, Form} from "react-bootstrap";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { LandingNavbar } from "@/components/landing-navbar";
import ReCAPTCHA from "react-google-recaptcha";


// authentication (login/signup) page
export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordconfirm] = useState('');
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<string | null>();
  const [errorText, setErrorText] = useState<string>('');
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

  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
    }).then(function ( response: any) {
        if(response.data[0] === 'is_authenticated: true') {
          router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/edit/characters`);
        } else {
          console.log(response.data);
        }
    });  
  }, []);

  const handleSubmit = (event: any) => {    
    event.preventDefault();
    const csrftoken = getCookie('csrftoken');

    if (captcha === undefined) {
      console.log('captcha not checked');
      setErrorText('Please complete the captcha');
      return;
    }

    event.preventDefault();
    if(!(email && email.match(emailFormat))){
      console.log('invalid email format');
      setErrorText('Invalid email format');
      return;
    }

    if (password !== passwordConfirm) {
      console.error('passwords do not match');
      setErrorText('Passwords do not match');
      return;
    }
    const data = {
      email: email,
      password: password,
      captcha: captcha,
    }

    axios({
      withCredentials: true,
      method: 'post',
      data: data,
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/register/`,
      headers: {"X-CSRFToken": csrftoken},
    })
      .then(function (response: any) {
          console.log(response.data);
          if(response.data.error) {
            setErrorText('User already exists. Please sign in, or use a different email.');
            return;
          } else {
            router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login`);
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
          <div className="text-red-500">
            {errorText}
          </div>  
          <ReCAPTCHA sitekey={`${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`} onChange={setCaptcha}/>
          <button type="submit" className="text-left block rounded py-2 
            px-4 bg-white hover:bg-cyan-200 text-black" id="password_confirm">Sign Up</button>
          <a className="hover:text-white text-slate-300" href="login">Already have an account? Sign in.</a>
          <div className="text-slate-300 text-xs pt-4" >By signing up and/or using this service, you acknowledge that you are 18 years of age or older and you agree to the <a className="hover:text-white font-bold" href="https://vecleon.com/terms"> terms of service</a></div>
        </div>
      </form>
    </>
  );

}

  
