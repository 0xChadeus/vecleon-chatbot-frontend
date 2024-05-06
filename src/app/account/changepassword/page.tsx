"use client";
const axios = require('axios');
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ChangePassword = ({}) => {

  const [userEmail, setUserEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorText, setErrorText] = useState('');

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
  }, [])

  function getCookie(name: any) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }    

  const changePassword = (e: any) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    axios({
        withCredentials: true,
        method: "put",
        data: {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword
        },
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/change_password/`,
        headers: {"X-CSRFToken": csrftoken},
    }).then(function ( response: any) {
        console.log(response);
        if (response.data.error) {
          setErrorText(response.data.error);
        } else {
          router.push(`${process.env.NEXT_PUBLIC_MIDSERVER_URL}/account/`);
        }
    });
  }

  return (
    <>
      <NavBar/>
      <div className="flex xl:flex-col flex-row">
        <Card className="w-[350px] fixed left-1/3 top-1/3">
          <CardHeader>
            <CardTitle>Change your password</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <Label>Your email address</Label>
                <Label id="name"> {userEmail} </Label>
                <div className="flex flex-col space-y-1.5">
                  <Label>Current Password</Label>
                  <Input id="password" onChange={(e) => setCurrentPassword(e.target.value)}/>
                  <Label>New Password</Label>
                  <Input id="password" onChange={(e) => setNewPassword(e.target.value)}/>
                  <Label>Confirm New Password</Label>
                  <Input id="password" onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                  <p className="text-red-500">{errorText}</p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={changePassword}>Confirm</Button>
          </CardFooter>
        </Card>
    </div>
    </>
  );
  
}

export default ChangePassword;
