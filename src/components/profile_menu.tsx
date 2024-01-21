"use client";
const axios = require("axios");
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookKey,
  CreditCard,
  Globe,
  Globe2,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { inherits } from 'util';


export const ProfileMenu = () => {
    const router = useRouter()

    const logOut = (e: any) => {
        e.preventDefault();
        axios({
          withCredentials: true,
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/logout/`,
        }).then(function ( response: any) {
            router.push("../auth/login");
        });  
      }

      return(
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-xl">                
              <User className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/account/`}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              </a>
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/subscriptions/`}>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Subscriptions</span>
              </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/edit/characters/`}>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Characters</span>
              </DropdownMenuItem>
              </a>
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/edit/characters/new/`}>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>New Character</span>
              </DropdownMenuItem>
              </a>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Extras (coming soon)</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Globe2 className="mr-2 h-4 w-4" />
                      <span>Worlds</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BookKey className="mr-2 h-4 w-4"/>
                      <span>Lorebooks</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem> */}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/support/`}>
              <span>Support</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form onSubmit={logOut}>
            <button className="w-full">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4"/>
              <span>Log out</span>
            </DropdownMenuItem>
            </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
    );
}

