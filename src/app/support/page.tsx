"use client";
import Image from "next/image";
const axios = require('axios');
import fs from 'fs';
import { CharacterForm } from "@/components/character-form";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ListItem, ListItemProps } from "@/components/character-world-list-item";
import { useEffect, useState } from "react";
import { UserPlus, Pencil } from "lucide-react";

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

const AccountPage = ({}) => {

    return (
      <>
        <NavBar/>
        <div className="absolute top-96 left-60">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Support</h4>
            <p className="text-sm text-muted-foreground">
              Send support emails to:
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div> 11111@mememail.com </div>
            <Separator orientation="vertical" />
            <Button>Reveal Email Address</Button>
          </div>
        </div>
      </>
    );
  
}

export default AccountPage
