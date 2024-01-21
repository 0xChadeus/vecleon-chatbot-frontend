"use client";
import Image from "next/image";
const axios = require('axios');
import fs from 'fs';
import { CharacterForm } from "@/components/character-form";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ListItem, ListItemProps } from "@/components/character-world-list-item";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Pencil, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CSRFToken } from "./csrftoken";
 
const starterDesc = 'Cost-effective access to state-of-the-art AI companions.'
const starterPack = [
  {
    feature: "AI Companion Chat",
    canAccess: "Yes",
  },
  {
    feature: "Discord Integration",
    canAccess: "Yes",
  },
  {
    feature: "Google Calendar Integration",
    canAccess: "Yes",
  },
  {
    feature: "Voice Calls",
    canAccess: "No",
  },
  {
    feature: "Long Term Memory",
    canAccess: "No",
  },
  {
    feature: "Animated Companion",
    canAccess: "No",
  },
  {
    feature: "Image generation",
    canAccess: "No",
  },
  {
    feature: "Image recognition",
    canAccess: "No",
  },
  {
    feature: "Companion Initiates Conversations",
    canAccess: "No",
  },
  {
    feature: "Companion Creation",
    canAccess: "Yes, limit of 3",
  },
  {
    feature: "Chat Limit",
    canAccess: "2000 messages per month",
  },
]

const standardDesc = 'Bang-for-your-buck AI companions with a rich featureset'
const standardPack = [
  {
    feature: "AI Companion Chat",
    canAccess: "Yes",
  },
  {
    feature: "Discord Integration",
    canAccess: "Yes",
  },
  {
    feature: "Google Calendar Integration",
    canAccess: "Yes",
  },
  {
    feature: "Voice Calls",
    canAccess: "Yes",
  },
  {
    feature: "Long Term Memory",
    canAccess: "Yes",
  },
  {
    feature: "Animated Companion",
    canAccess: "No",
  },
  {
    feature: "Image generation",
    canAccess: "No",
  },
  {
    feature: "Image recognition",
    canAccess: "No",
  },
  {
    feature: "Companion Initiates Conversations",
    canAccess: "No",
  },
  {
    feature: "Companion Creation",
    canAccess: "Yes, limit of 20",
  },
  {
    feature: "Chat Limit",
    canAccess: "10,000 messages per month",
  },
]

const unlimitedDesc = 'Unlimited access to all features.'
const unlimitedPack = [
  {
    feature: "AI Companion Chat",
    canAccess: "Yes",
  },
  {
    feature: "Discord Integration",
    canAccess: "Yes",
  },
  {
    feature: "Google Calendar Integration",
    canAccess: "Yes",
  },
  {
    feature: "Voice Calls",
    canAccess: "Yes",
  },
  {
    feature: "Long Term Memory",
    canAccess: "Yes",
  },
  {
    feature: "Animated Companion",
    canAccess: "Yes",
  },
  {
    feature: "Image generation",
    canAccess: "Yes",
  },
  {
    feature: "Image recognition",
    canAccess: "Yes",
  },
  {
    feature: "Companion Initiates Conversations",
    canAccess: "Yes",
  },
  {
    feature: "Companion Creation",
    canAccess: "Yes, limit of 200",
  },
  {
    feature: "Chat Limit",
    canAccess: "No Limit",
  },
]


export interface PricingCardProps {
  product: string;
};

export const PricingCard = ({
  product, 
}: PricingCardProps) => {

    const router = useRouter();

    function getCookie(name: any) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the  name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    }    

    const handleSubmit = async (e: any) => {
      const csrftoken = getCookie('csrftoken');
      e.preventDefault();

      await axios({
        withCredentials: true,
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
      }).then(function ( response: any) {
          if(response.data[0] === 'is_authenticated: false') {
            router.push("../auth/login");
          }
      });      

      await axios({
          withCredentials: true,
          method: "put",
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/checkout/`,
          data: {
            product: product
          },
          headers: {"X-CSRFToken": csrftoken},
      }).then(function ( response: any) {
        console.log(response);
        router.push(response.data.url);
      });
    }

    return(
      <>
        <Card className="xl:w-96 xl:h-full">
          <CSRFToken/>
          <CardHeader>
            <CardTitle>
              {product === 'starter' && <h1>Starter</h1> }
              {product === 'standard' && <h1>Standard</h1> }
              {product === 'unlimited' && <h1>Unlimited</h1> }
          
            <br/><br/>
              {product === 'starter' && <div>$4.99/month</div> }
              {product === 'standard' && <div>$19.99/month</div> }
              {product === 'unlimited' && <div>$29.99/month</div> }
            </CardTitle>
            <CardDescription>
             <br/> 
              {product === 'starter' && <div>{starterDesc}</div> }
              {product === 'standard' && <div>{standardDesc}</div> }
              {product === 'unlimited' && <div> <br/> {unlimitedDesc}</div> }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Features accessible in this tier</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product === 'starter' && starterPack.map((starterPack) => (
                  <TableRow key={starterPack.feature}>
                    <TableCell className="font-medium">{starterPack.feature}</TableCell>
                    <TableCell>{starterPack.canAccess}</TableCell>
                  </TableRow>
                ))}
                {product === 'standard' && standardPack.map((standardPack) => (
                  <TableRow key={standardPack.feature}>
                    <TableCell className="font-medium">{standardPack.feature}</TableCell>
                    <TableCell>{standardPack.canAccess}</TableCell>
                  </TableRow>
                ))}
                {product === 'unlimited' && unlimitedPack.map((unlimitedPack) => (
                  <TableRow key={unlimitedPack.feature}>
                    <TableCell className="font-medium">{unlimitedPack.feature}</TableCell>
                    <TableCell>{unlimitedPack.canAccess}</TableCell>
                  </TableRow> 
                )) }
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
              <Button className="space-x-1" onClick={handleSubmit}>
                <CreditCard/>  <div>Buy Now</div>
              </Button>
          </CardFooter>
        </Card>     
      </> 
    );
}

