'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import dayjs from 'dayjs';
import axios, { AxiosError } from "axios";

type MessageCardProps = {
    message : Message;
    onMessageDelete : (messageId : string)=> void;
}
const MessageCard = ({message,onMessageDelete}: MessageCardProps) => {

    const {toast} =  useToast();
    const handleDeleteConfirm = async ()=>{
      try {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        toast({
            title:  response.data.message,
        });
        onMessageDelete(message._id as string); // added as string to  define the type of  the  messsge id

      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
            title: "Error",
            description: axiosError.response?.data.message ?? "Failed to delete the message.",
            variant: "destructive",
          });
      }
     
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>{message.content}</CardTitle>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"> 
            <X className = 'w-2 h-2' />
            </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure,You want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the message
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel><Button>Cancel</Button></AlertDialogCancel>
          <AlertDialogAction onClick = {handleDeleteConfirm}><Button>Continue</Button></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </CardHeader>
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
        <CardContent>

        </CardContent>
    </Card>
  );
};

export default MessageCard;
