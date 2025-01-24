import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {User} from "next-auth";
import mongoose from "mongoose";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request)
{
    await dbConnect()

    const session = await getServerSession(authOptions)
  
    const _user: User  = session?.user as User;
    if(!session || !_user){
      return Response.json(
          {
      success : false,
      message : "Not Authenticated"
          },
    { status : 401}
  )
    }
  const userId = new mongoose.Types.ObjectId(_user._id);
  

  try {
        const user = await UserModel.aggregate([   
            {$match : {_id : userId}},
            {$unwind : '$messages'},
            {$sort : {'meassages.createdAt': -1}},
            {$group : { _id : '$_id', messages : {$push : '$messages'}}},
        ]).exec();

        if(!user || user.length === 0)
        {
            return Response.json(
                {
            success : false,
            message : "User Not Found"
                },
          { status : 404}
        )
        }

        return Response.json(
            {
        success : true,
        messages : user[0].messages   
            },
      { status : 200}
    );
  } catch (error) {
    console.log("error in  get-message",error)
    return Response.json(
        {
    success : false,
    message : "Internal Server Error"
        },
  { status : 500}
)
  }

}
