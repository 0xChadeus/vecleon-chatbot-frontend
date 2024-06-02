"use client";
const axios = require('axios');
import { NavBar } from "@/components/navbar";
import { LandingNavbar } from "@/components/landing-navbar";

import { useEffect, useState} from "react";

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import {useRouter} from 'next/navigation';

const SupportPage = ({}) => {
  const router = useRouter();

  const [userAuthenticated, setUserAuthenticated] = useState(false);

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
        } else {
          router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login/`);
        }
    });  
  }, []);

  const handleSubmit = (event: any) => {    
    event.preventDefault();
    const csrftoken = getCookie('csrftoken');  

    axios({
      withCredentials: true,
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/test_email/`,
      headers: {"X-CSRFToken": csrftoken},
    }).then(function ( response: any) {
        console.log(response);
    });  
  }

  return (
    <>
      <NavBar/>
      <div className="absolute top-96 left-60">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Support</h4>
          <p className="text-sm text-muted-foreground">
            For technical support:
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div> support@vecleon.com </div>
          <Separator orientation="vertical" />
          <Button onClick={handleSubmit}>Reveal Email Address</Button>
        </div>
      </div>
    </>
  );
  
}

export default SupportPage





