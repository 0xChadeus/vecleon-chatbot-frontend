'use client';
import "../../globals.css";
import { useState, useEffect} from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import {CSRFToken} from '@/components/csrftoken'
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import TextareaAutosize from 'react-textarea-autosize';
import {MessageBox} from "@/components/messagebox";
import { MessageProps } from "@/components/message";
import { NavBar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import RingLoader from "react-spinners/RingLoader"

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


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

const Chat = (
  { params }: { params: { chatId: string }},
) => {



  return (
    <>
    </>
  );
}

export default Chat;

