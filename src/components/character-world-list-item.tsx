"use client";
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames';
import { Pencil, MessageSquarePlus } from 'lucide-react';
import { Button } from './ui/button';
import { DeleteDialog } from './delete-dialog';
import { useRouter } from 'next/navigation';
import { ChatCreate } from './chat-create';

export interface ListItemProps {
  role: "character" | "world";
  name: string;
  description: string;
  id: string;
  src: string;
}

export const ListItem = ({
  role,
  name,
  description,
  id,
  src
}: ListItemProps) => {

  const router = useRouter();
  const editButton = (event: any) => {
    router.push(`characters/${id}`)
  }
  const newChat = (event: any) => {
    router.push(`../chat`)
  }


  if(name === '') {
    return;
  }
  return(
    <div className={classNames(
      "flex max-w-s w-full gap-x-3 text-s inline-blockshadow-2xl \
      text-slate-900 py-2 border \
      rounded-xl border-white border-4 my-1\
      overflow-hidden h-40",
      role === "character" && "bg-black",
      role === "world" && "bg-cyan-950"
    )}> 
        <img className="mx-2 rounded-lg bg-black"
            src={src}
        />
        <Button variant="outline" className="bg-white" onClick={editButton}>
          <Pencil/>
        </Button>
        
        
        <ChatCreate
          characterId={id}
          characterName={name}
        />

        <div className="max-w-md mx-10 items-center space-x-4 rounded-xl">
            <a>
              <div className='text-white
              font-extrabold font-xl text-xl'> 
                  {name}
              </div>
            </a>
            <div className="py-2 px-12 mx-2 text-white">
                <ReactMarkdown>{description}</ReactMarkdown>
            </div>
        </div>

        <DeleteDialog
          id={id}
          src={src}
        />

    </div>
  );
};
