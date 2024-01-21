'use client';
import "../../globals.css";
import Image from "next/image";
import { useState, useEffect } from "react";
const axios = require('axios');
import { useRouter } from 'next/navigation'
var classNames = require('classnames');
import {CSRFToken} from '@/components/csrftoken'
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import TextareaAutosize from 'react-textarea-autosize';
import {MessageBox} from "@/components/messagebox";
import { MessageProps } from "@/components/message";
import { NavBar } from "@/components/navbar";
import { useId } from "react";
// import { REST, Routes } from 'discord.js';

const chatSocket = new WebSocket('ws://127.0.0.1:7950/chat/test');
export const Chat = (
  { params }: { params: { chatId: string }},
) => {

  const [currMes, setCurrmes] = useState<string>('');
  const [userinput, setUserinput] = useState<string>('');
  const [chatHistory, setChathistory] = useState<MessageProps[]>([]);
  const [context, setContext] = useState<string>('');
  const [character, setCharacter] = useState({
    src: '',
    name: '',
    description: '',
    personality_summary: '',
    scenario: '',
  });  
  const [systemPrompt, setSystemPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [audio, setAudio] = useState<string>('');

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

  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
    }).then(function ( response: any) {
        if(response.data[0] === 'is_authenticated: false') {
          router.push("../auth/login");
        }
    });
  }, [])


  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
      axios({
        withCredentials: true,
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_chat/`,
        data: {
          id: params.chatId
        },
        headers: {"X-CSRFToken": csrftoken},
      }).then((response: any) => {
            const msgHistory = response.data.msg_history.map((message: any) => {
            
            const mes: MessageProps = {
              role: message[0],
              content: message[1],
              images: message[2].replace(/[\[\]']+/g, '').split(','),
              audio: message[3],
            }
            return mes;
          });
          setChathistory(msgHistory);
          setCharacter(response.data.character_key);
      });  
  }, []);



  useEffect(() => {
    fetch('/system_prompt.txt')
    .then((r) => r.text())
    .then(text  => {
      const sysprompt = text.replaceAll('{{char}}', character.name);
      setSystemPrompt(sysprompt.replaceAll('{{user}}', 'User'));
    })    
  }, [character]);

  useEffect(() => {
    let n = 0;
    let contextString = ''
    for(let i = 0; i < chatHistory.length; i++) {
      const message = chatHistory[i];
      n += message.content.length;
      if(n > 8000) {
        break;
      }
      if(message.role == 'ai') {
        contextString += '\n' + character.name + ': ' + message.content;
      } else {
        contextString += '\n' + 'User' + ': ' + message.content;
      }
    }
    setContext(contextString);
  }, [chatHistory]);



  useEffect(() => {
    chatSocket.onclose = () => {
      console.log('Chat socket closed');
    };  
      
    chatSocket.onopen = () => {
      console.log('Chat socket opened');
    };  

    chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      console.log(data);
      setCurrmes(currMes => currMes + data.message);
  
      if(data.msg_complete === 'true') {
        const aiMes: MessageProps = {
          role: 'ai',
          content: currMes,
          images: images,
          audio: audio,
        }    
        setChathistory(chatHistory => chatHistory.concat(aiMes));
        const csrftoken = getCookie('csrftoken');
        const aiMesSend = {
          id: params.chatId,
          msg: currMes,
          role: 'ai',
          images: images,
          audio: audio,
        }
        axios({
          withCredentials: true,
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/update_chat/`,
          data: aiMesSend,
          headers: {"X-CSRFToken": csrftoken},
        });
        setCurrmes('');
        setImages([]);
      }

      if(data.is_image) {
        console.log(data.image);
        setImages(images => [...images, data.image]);
      }

      if(data.is_audio) {
        console.log(data.audio);
        setAudio(data.audio);
      }
    }

  }, [chatSocket, currMes]);

  
  const handleSubmit = async (e: any) => {
    // send user message 
    e.preventDefault();

    const userMes: MessageProps = {
      role: 'user',
      content: userinput
    };

    setChathistory(chatHistory => chatHistory.concat(userMes));

    let message = [systemPrompt,
                    'This is a description of ' + character.name + ':',
                    character.description,
                    character.personality_summary,
                    character.scenario,
                    'These are the last few messages in the conversation:',
                    context, 
                    'User:' + userinput,
                    'complete the next message for ' + character.name,
                    character.name + ': ',
                    params.chatId,];

    chatSocket.send(JSON.stringify({
      'message': message
    }));

    const userMesSend = {
      id: params.chatId,  
      msg: userinput,
      role: 'user',
      images: images,
      audio: audio,
    }

    const csrftoken = getCookie('csrftoken');
    axios({
      withCredentials: true,
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/update_chat/`,
      data: userMesSend,
      headers: {"X-CSRFToken": csrftoken},
    });

    setUserinput('');    
  }

  const onEnterPress = (e: any) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      handleSubmit(e);
    }
  }  


  return (
    <>
      <CSRFToken/>
      <NavBar/>
      
      <MessageBox
        messages={chatHistory}
        currentMes={currMes}
        characterSrc={character.src}
        userSrc={'/profile_placeholder.png'}
      />

      <div className="fixed xl:left-1/4 sm:left-0 
      bottom-8 h:fit xl:w-1/2 w-full
      inline-block p-2 shadow-2xl opacity-75
      flex items-center bg-slate-700 rounded-xl justify-start">
        <form id='send-msg' className="flex flex-grow" onSubmit={handleSubmit}> 
          <TextareaAutosize 
            rows={1}
            wrap="physical"
            placeholder="Send a message"
            className="appearance-none bg-transparent
            border-none w-full overflow-scroll flex-grow resize-none
            text-white mr-3 py-2 px-3 leading-tight focus:outline-none h-fit"
            value={userinput}
            onChange={(e: any) => { setUserinput(e.target.value); } } 
            onKeyDown={onEnterPress}
            maxRows={5}
          />
        </form> 
        <button form='send-msg' className="flex flex-wrap px-4 text-cyan-400 
        text-2xl font-semibold hover:text-cyan-200" 
          type="submit"> <BsFillArrowRightSquareFill/>
        </button>
      </div>
    </>
  );
}

export default Chat;

