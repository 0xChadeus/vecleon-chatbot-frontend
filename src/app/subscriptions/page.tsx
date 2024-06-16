"use client";
const axios = require('axios');
import { useEffect, useState } from "react";
import { PricingCard } from "@/components/pricing-card";
import { LandingNavbar } from "@/components/landing-navbar";
import { NavBar } from "@/components/navbar";

const SubscriptionsPage = () => {

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

    return(
      <>
      <head>
      <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/w4BBSwAAAAAAAAAAAUAAjDrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAA6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+fwAA+B8AAPAPAADDwwAAh+EAAB/4AAA//AAAP/wAAD/8AAA//AAAP/wAAP//AADAAwAA//8AAA==" rel="icon" type="image/x-icon"/>
      </head>
        {userAuthenticated ? <NavBar/> : <LandingNavbar/>}
        <div className="xl:absolute xl:flex xl:flex-row xl:left-96 xl:right-96 xl:top-12 relative top-24">
          <div className='xl:py-10 md:py-2 px-2'>
            <PricingCard
              product='standard'
            />
          </div>
          <div className='xl:py-10 md:py-2 px-2'>
            <PricingCard
              product='unlimited'
            />
          </div>
        </div>
      </>
    );
}

export default SubscriptionsPage;
