"use client";
import Image from "next/image";
const axios = require('axios');
import fs from 'fs';
import { CharacterForm } from "@/components/character-form";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ListItem, ListItemProps } from "@/components/character-world-list-item";
import { useEffect, useState } from "react";
import { UserPlus, Pencil, CreditCardIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CancelDialog } from "@/components/cancel-subscription-dialog";

const AccountPage = ({}) => {

  const [userEmail, setUserEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [subscriptionCancelled, setSubscriptionCancelled] = useState(false);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState('');
  const [currentPlan, setCurrentPlan] = useState('');

  const router = useRouter();
  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_user_email`,
    }).then(function ( response: any) {
        setUserEmail(response.data.email);
      }
    );
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_subscription/`,
    }).then(function ( response: any) {
        console.log(response);
        if(response.data.response == "not_subscribed") {
          setSubscriptionStatus(false);
        }      
        setSubscriptionStatus(true);
        setSubscriptionCancelled(response.data.cancelled)

        console.log(response.data.subscription);
        var a = new Date(response.data.subscription.current_period_end * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
        setCurrentPeriodEnd(time);
      });
  }, [])

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

  const getPortal = (e: any) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    axios({
        withCredentials: true,
        method: "put",
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_customer_portal/`,
        headers: {"X-CSRFToken": csrftoken},
    }).then(function ( response: any) {
        console.log(response);
        router.push(response.data.url);
    });
  }

  return (
    <>
      <NavBar/>
      <div className="flex xl:flex-col flex-row">
        <Card className="w-[350px] fixed lg:left-76 xl:left-1/4 md:top-1/4 left-1/4 top-24">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Check your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" value={userEmail} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Password</Label>
                  <div className="opacity-50">*************</div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Change Password</Button>
          </CardFooter>
        </Card>
      <div className="fixed lg:left-1/2 xl:top-72 top-2/3 right-24">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Subscription</h4>
          <p className="text-sm text-muted-foreground">
            Your subscription status.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-10 items-center space-x-4 text-sm">
          {
          subscriptionStatus ?
            subscriptionCancelled ? 
            <div> 
              Your subscription will end on <br/> 
              {currentPeriodEnd}, but all features paid for
              are <br/> available until that date.
            </div> :
            <div>
              Your subscription will renew on <br/> 
              {currentPeriodEnd}
            </div> 
          :
          <div> 
            You do not have an <br/> active subscription 
          </div>
          }
          <Separator orientation="vertical" />
          <a href="../subscriptions">
          {subscriptionStatus ?
            <Button>Change Plan</Button> :
              subscriptionCancelled ? 
              <Button> Rewnew Plan </Button> :
              <Button> Buy Plan </Button>
            }
          </a>
        </div>
        <Button onClick={getPortal} className="space-x-2 absolute top-36">
          <div>Manage Subscription</div>  <div><CreditCardIcon/></div>
        </Button>
        {/* {subscriptionCancelled? <></> : <CancelDialog/>} */}
      </div>
    </div>

    </>
  );
  
}

export default AccountPage
