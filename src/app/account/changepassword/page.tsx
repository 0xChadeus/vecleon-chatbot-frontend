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
import {FaEye, FaEyeSlash} from "react-icons/fa";

const ChangePassword = ({}) => {

  const [userEmail, setUserEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const[showCurrentPassword, setShowcurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setNewShowpassword] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_user_email/`,
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
        method: "post",
        data: {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword
        },
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/change_user_password/`,
        headers: {"X-CSRFToken": csrftoken},
    }).then(function ( response: any) {
        console.log(response);
        if (response.data.error) {
          setErrorText(response.data.error);
        } else {
          setSuccessText(response.data.success);
          setErrorText('');
          //router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/account/`);
        }
    });
  }

  return (
    <>
    <head>
    <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/w4BBSwAAAAAAAAAAAUAAjDrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAA6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+fwAA+B8AAPAPAADDwwAAh+EAAB/4AAA//AAAP/wAAD/8AAA//AAAP/wAAP//AADAAwAA//8AAA==" rel="icon" type="image/x-icon"/>
    </head>
      <NavBar/>
      <div className="flex xl:flex-col flex-row">
        <Card className="w-[350px] fixed left-1/3 top-1/4">
          <CardHeader>
            <CardTitle>Change your password</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <Label>Your email address</Label>
                <Label id="name"> {userEmail} </Label>
                <div className="flex flex-col space-y-1.5 text-center">
                  <Label>Current Password</Label>
                  <Input type={showCurrentPassword ? "text": "password"} id="password" onChange={(e) => setCurrentPassword(e.target.value)}/>
                  <Button variant={"outline"} type={'button'} onClick={() => setShowcurrentPassword(!showCurrentPassword)}
                  className="p-2">
                    {!showCurrentPassword ? <FaEyeSlash size={20} 
                    className="text-white"/> : 
                    <FaEye size={20} className="text-white" />}
                  </Button>
                  <Label>New Password</Label>
                  <Input type={showNewPassword ? "text": "password"} id="newPassword" onChange={(e) => setNewPassword(e.target.value)}/>
                  <Label>Confirm New Password</Label>
                  <Input type={showNewPassword ? "text": "password"} id="newPasswordConfirm" onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                  <Button variant={"outline"} type={'button'} onClick={() => setNewShowpassword(!showNewPassword)}
                  className="p-2 ">
                    {!showNewPassword ? <FaEyeSlash size={20} 
                    className="text-white"/> : 
                    <FaEye size={20} className="text-white" />}
                  </Button>
                  <p className="text-red-500">{errorText}</p>
                  <p className="text-green-500">{successText}</p>
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
