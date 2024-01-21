'use client';
import { ElementRef, useRef, useEffect, useState } from "react";
import { ChatListItem } from "./chatlist-item";
const axios = require('axios');

export const ChatList = ({
}) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios({
            withCredentials: true,
            method: "get",
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_chats/`
        }).then(function ( response: any) {
            setChats(response.data);
        });
    }, []);

    return(
        <div className="flex flex-col p-6 absolute 
                        top-10 overflow-scroll">
            {chats.map((chat: any) => (
                <ChatListItem
                    id={chat.id}
                    name={chat.name}
                    character_name={chat.character_key.name}
                    src={chat.character_key.src}
                />
            ))}
        </div>
    );
}
