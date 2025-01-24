//import {z} from "zod";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
//import { usernameValidation } from "@/schemas/signUpSchema";
//import { NextResponse } from 'next/server';

export async function POST(request: Request)
{
    await dbConnect();
    
    try {
     const {username, code} =    await request.json();
     const decodedUsername = decodeURIComponent(username);
     const user = await UserModel.findOne({username:decodedUsername})

     if(!user)
     {
        return Response.json(
            {
                success : false,
                message : "User not Found"
            },
            {
                status : 404
            }
        )
     }

     const isCodeValid = user.verifyCode === code
     const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
     if(isCodeValid && isCodeNotExpired)
     {
    user.isVerified = true
    await user.save();

     return  Response.json(
        {
            success : true,
            message : "Account Verified Successfully"
        },
        {
            status : 200
        })
    } 
    else if(!isCodeNotExpired)
    {
        return  Response.json(
            {
                success : false,
                message : "Verification Code has been expired,Please sign up again to  get code"
            },
            {
                status : 400
            });
    }
    else{
        //code is incorrect
        return  Response.json(
            {
                success : false,
                message : "Incorrect Verification Code"
            },
            {
                status : 400
            })
    }
    
    } catch (error) {
        console.error("Error verifying users" , error)
        return Response.json(
        {
            success : false,
            message : "Error verifying users"
        },
        {
            status : 500
        }
    );
    }
}
  //Testing Purpose 
// export async function GET() {
//     return NextResponse.json({ success: true, message: "Route exists!" });
//   }
  