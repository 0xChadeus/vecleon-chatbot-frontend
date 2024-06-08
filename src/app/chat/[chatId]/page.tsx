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

  const chatSocketId = makeid(32);
  const [chatSocket, setChatSocket] = useState<WebSocket>(new WebSocket(`${process.env.NEXT_PUBLIC_MIDSERVER_WEBSOCKET_URL}/chat/${chatSocketId}`));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currMes, setCurrmes] = useState<string>('');
  const [currMesId, setCurrMesId] = useState<string>('');
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

  //prompts
  //const [systemPrompt, setSystemPrompt] = useState('');
  //const [prefill, setPrefill] = useState('');
  //const [nsfw, setNsfw] = useState('');

  //const [images, setImages] = useState<string[]>([]);
  //const [audio, setAudio] = useState<string>('');

  //const [userName, setUserName] = useState<string>('');
  //const [userSrc, setUserSrc] = useState<string>('');

  const router = useRouter();


  useEffect(() => {
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
    }).then(function ( response: any) {
        if(response.data[0] === 'is_authenticated: false') {
          router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/register/`);
        }
    });
    axios({
      withCredentials: true,
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_subscription_is_active/`,
    }).then(function ( response: any) {
        if(response.data.response === 'inactive') {
          router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/subscriptions`);
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
          chat_id: params.chatId
        },
        headers: {"X-CSRFToken": csrftoken},
      }).then((response: any) => {
          const msgHistory = response.data.msg_history.map((message: any) => {
            const mes: MessageProps = {
              role: message[0],
              content: message[1],
              images: message[2].replace(/[\[\]']+/g, '').split(','),
              audio: message[3],
              mes_id: message[4],
              chat_id: params.chatId,
            }
            setContext(context => context.concat('\n' + message[1]));
            return mes;
          });
          setChathistory(msgHistory);
          setCharacter(response.data.character_key);
          //setUserName(response.data.user_name);
          //setUserSrc(response.data.user_img);
      });  
  }, []);



  useEffect(() => {
    //fetch('/system_prompt1.txt')
    //.then((r) => r.text())
    //.then(text  => {
    //  const sysprompt = text.replaceAll('{{char}}', character.name);
    //  setSystemPrompt(sysprompt.replaceAll('{{user}}', userName));
    //})    

    //fetch('/prefill.txt')
    //.then((r) => r.text())
    //.then(text  => {
    //  const prefill_text = text.replaceAll('{{char}}', character.name);
    //  setPrefill(prefill_text.replaceAll('{{user}}', userName));
    //})    

    //fetch('/nsfw.txt') 
    //.then((r) => r.text())
    //.then(text  => {
    //  const nsfw_text = text.replaceAll('{{char}}', character.name);
    //  setNsfw(nsfw_text.replaceAll('{{user}}', userName));
    //})

  }, [character]);


  useEffect(() => {    
    chatSocket!.onopen = () => {
      console.log('Chat socket opened');
    };  

    chatSocket!.onclose = () => {
      console.log('Chat socket closed');
    };  

    chatSocket!.onerror = () => {
      console.log('Chat socket error');
      chatSocket.close();
    };  

    chatSocket!.onmessage = function(e) {
      const data = JSON.parse(e.data);
      setCurrmes(currMes => currMes + data.message);
  
      if(data.msg_complete === 'true') {
        let rand_id = makeid(16);
        setCurrMesId(rand_id);
        //const aiMes: MessageProps = {
        //  role: 'ai',
        //  content: currMes,
        //  images: images,
        //  audio: audio,
        //  mes_id: rand_id,
        //  chat_id: params.chatId,
        //}    
        setChathistory(chatHistory => chatHistory.concat(aiMes));
        const csrftoken = getCookie('csrftoken');
        //const aiMesSend = {
        //  chat_id: params.chatId,
        //  msg: currMes,
        //  role: 'ai',
        //  images: images,
        //  audio: audio,
        //  mes_id: rand_id,
        //}
        axios({
          withCredentials: true,
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/update_chat/`,
          //data: aiMesSend,
          headers: {"X-CSRFToken": csrftoken},
        });
        setCurrmes('');
        //setImages([]);
        setIsLoading(false);
        setContext(context => context.concat('\n' + character.name + ': ' + currMes));
      }

      if(data.is_image) {
        //setImages(images => [...images, data.image]);
      }

      if(data.is_audio) {
        //setAudio(data.audio);
      }
    }

  }, [chatSocket, currMes]);

  
  const handleSubmit = async (e: any) => {
    // send user message 
    e.preventDefault();

    setIsLoading(true);

    let rand_id = makeid(16);
    const userMes: MessageProps = {
      role: 'user',
      content: userinput,
      mes_id: rand_id,
      chat_id: params.chatId,
    };

    setContext(context => context.concat('\n' + userName + ': ' + userinput));

    setChathistory(chatHistory => chatHistory.concat(userMes));

    //let message = [systemPrompt,
    //                'This is a description of ' + character.name + ':',
    //                character.description,
    //                character.personality_summary,
    //                character.scenario,
    //                '',
    //                context, 
    //                userName + ': ' + userinput,
    //                'complete the next message for ' + character.name,
    //                character.name + ': ',
    //                prefill,
    //                nsfw,
    //                params.chatId,];

    //chatSocket!.send(JSON.stringify({
    //  'message': message
    //}));

    //const userMesSend = {
    //  chat_id: params.chatId,  
    //  msg: userinput,
    //  role: 'user',
    //  images: images,
    //  audio: audio,
    //  mes_id: rand_id,
    //}

    const csrftoken = getCookie('csrftoken');
    //axios({
    //  withCredentials: true,
    //  method: 'post',
    //  url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/update_chat/`,
    //  data: userMesSend,
    //  headers: {"X-CSRFToken": csrftoken},
    //});

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
        userSrc={userSrc}
        currentMesId={currMesId}
        chatId={params.chatId}
      />

      <div className="fixed xl:left-1/4 sm:left-0 
      bottom-8 xl:w-1/2 w-full
      inline-block p-2 flex items-center 
      bg-slate-700 rounded-xl justify-start">
        <TextareaAutosize 
          rows={1}
          wrap="physical"
          placeholder="Send a message"
          className="appearance-none bg-transparent
          border-none w-full overflow-scroll flex-grow resize-none
          text-white mr-3 py-2 px-3 leading-tight focus:outline-none h-fit"
          value={userinput}
          onChange={(e: any) => { setUserinput(e.target.value); } } 
          onKeyDown={isLoading? undefined: onEnterPress}
          maxRows={5}
        />
        {isLoading ?
        <RingLoader
          color="white"
          loading={isLoading}
          cssOverride={{margin: 'auto'}}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> :
        <Button variant="ghost" className="flex flex-wrap px-4 text-cyan-400 
        text-2xl font-semibold hover:text-cyan-200" onClick={handleSubmit}> <BsFillArrowRightSquareFill/>
        </Button> 
        }
      </div>
    </>
  );
}

export default Chat;

