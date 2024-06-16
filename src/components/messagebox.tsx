'use client';
import {Message, MessageProps } from "@/components/message";
import classNames from "classnames";
import { ElementRef, useRef, useEffect } from "react";


interface MessageBoxProps {
    messages: MessageProps[];
    currentMes: string;
    characterSrc?: string;
    userSrc?: string;
    currentMesId: string;
    chatId: string;
};

export const MessageBox = ({
    messages = [],
    currentMes,
    characterSrc,
    userSrc,
    currentMesId,
    chatId,
}: MessageBoxProps) => {

    const AlwaysScrollToBottom = () => {
        const scrollRef = useRef<ElementRef<"div">>(null);
        useEffect(() => scrollRef.current?.scrollIntoView());
        return <div ref={scrollRef} />;
    };

    return(
        <div className="flex flex-col py-6 fixed xl:left-1/4
        sm:left-0 xl:w-1/2 sm:w-full top-20 bottom-32 
        border rounded-xl border-cyan-500 bg-slate-950">
          <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-800 
        scrollbar-track-slate-950">
            {messages.map((message) => (
                <Message
                    key={message.mes_id}
                    mes_id={message.mes_id}
                    role={message.role}
                    content={message.content}
                    src={classNames(
                    message.role === "user" && userSrc,
                    message.role === "ai" && characterSrc)} 
                    images={message.images}
                    chat_id={chatId}
                />
            ))}
            <Message
                role={'ai'}
                content={currentMes}
                src={characterSrc}
                mes_id={currentMesId}
                chat_id={chatId}
            /> 
            <AlwaysScrollToBottom/>
          </div>
        </div>
    );
}

