 
 'use client';
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel,  FormMessage, Form } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError }  from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'


const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username : string}>()
    const {toast} = useToast()
 
     
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver : zodResolver(verifySchema),
      }) 
      const onSubmit = async (data : z.infer<typeof verifySchema>)=>{
        try {
        const response = await axios.post<ApiResponse>(`/api/verify-code`,{
            username : params.username,
            code : data.code
        })
        //console.log(response);
        toast({
            title : "Success",
            description : response.data.message
        })
        router.replace('/sign-in')

} catch (error) {
    console.error("Error in Sign Up of User",error);
                const axiosError = error as AxiosError<ApiResponse>
                const errorMsg = axiosError.response?.data.message ?? "An Error occurred in verify"
                toast({
                  title : 'signUp Error',
                  description : errorMsg,
                  variant : "destructive",
                })
}
}     

  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Verify Your Account
        </h1>
        <p className="mb-4"> Enter the verification code sent to your Email
        </p>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
                <Input  {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
         <Button type="submit">Submit</Button>
      </form>
    </Form>
   
      </div>
      </div>
  );
}


export default VerifyAccount