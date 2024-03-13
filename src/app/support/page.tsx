"use client";
import Image from "next/image";
const axios = require('axios');
import { NavBar } from "@/components/navbar";
import { LandingNavbar } from "@/components/landing-navbar";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const AccountPage = ({}) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  
  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
    }).then(function ( response: any) {
        if(response.data[0] === 'is_authenticated: true') {
          setUserAuthenticated(true);
        } else {
          setUserAuthenticated(false);
          console.log(response.data);
        }
    });  
  }, []);


  return (
    <>
      {userAuthenticated ? <NavBar/> : <LandingNavbar/>}
      <div className="absolute top-96 left-60">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Support</h4>
          <p className="text-sm text-muted-foreground">
            Send support emails to:
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div> 11111@mememail.com </div>
          <Separator orientation="vertical" />
          <Button>Reveal Email Address</Button>
        </div>
      </div>
    </>
  );
  
}

export default AccountPage
