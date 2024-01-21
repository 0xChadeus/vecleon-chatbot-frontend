"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { CldUploadButton } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import Cropper from 'react-easy-crop'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import getCroppedImg from "./get-cropped-image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
  defaultSrc: string | null;
}

export const ImageUpload = ({
  onChange,
  disabled,
  value,
  defaultSrc
}: ImageUploadProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


  const getCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
      )
      console.log('done', { croppedImage })
      onChange(croppedImage);
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }

  return (
    <>
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div 
        className="
          p-4 
          border-4 
          border-dashed
          border-primary/10 
          rounded-lg 
          transition 
          flex 
          flex-col 
          space-y-2 
          items-center 
          justify-center">      
        <div className="relative h-40 w-40">
          <Image
            fill
            alt="Upload"
            src={croppedImage || defaultSrc || "/profile_placeholder.png"}
            className="rounded-lg object-cover"
          />
        </div>

      </div>

      <AlertDialog>
      <AlertDialogTrigger asChild>
      <input className="relative left-10"
        type="file" accept="image/*" onChange={onSelectFile}/>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-2/3 w-2/3">
        <div className="flex flex-col ">
            <div className="z-50 absolute bottom-0 right-36 text-sm">
              Scroll to zoom and drag to place
            </div>
            <div className=""> 
              {!!imgSrc && (
              <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={3/4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              />
              )}
            </div>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute bottom-0 left-0 h-9">
            Cancel</AlertDialogCancel>
          <AlertDialogAction className="absolute bottom-0 right-0 h-9" 
          onClick={getCroppedImage}>
            Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
    </>
  );
};