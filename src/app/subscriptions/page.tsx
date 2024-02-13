"use client";
import Image from "next/image";
const axios = require('axios');
import fs from 'fs';
import { CharacterForm } from "@/components/character-form";
import { useRouter } from "next/navigation";
import { ListItem, ListItemProps } from "@/components/character-world-list-item";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Pencil } from "lucide-react";
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
        {userAuthenticated ? <NavBar/> : <LandingNavbar/>}
        <div className="xl:absolute xl:flex xl:flex-row xl:left-96 xl:right-96 xl:top-12 relative top-24">
          <div className='xl:py-10 md:py-2 px-2'>
            <PricingCard
              product='starter'
            />
          </div>
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
