import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {User} from "next-auth";

export async function POST(request: Request)
{
    await dbConnect()

  const session = await getServerSession(authOptions)

  const user:User  = session?.user as User
  if(!session || !session.user){
    return Response.json(
        {
    success : false,
    message : "Not Authenticated"
        },
  { status : 401}
)
  }
const userId = user._id;
const {acceptMessages} = await request.json();

try {
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {isAcceptingMessage : acceptMessages},
        { new : true }
    )
    if(!updatedUser)
    {
        return Response.json(
            {
                success : false,
                message : "Failed to update user Status to Accept Messages"
                    },
              { status : 401}
        )
    }
 // Success Response
    return Response.json(
        {
            success : true,
            message : "Accepting Messages status updated Successfully"
                },
          { status : 200}
    )

    //
} catch (error) {
    console.log("Failed to update user Status to Accept Messages",error)
    return Response.json(
        {
            success : false,
            message : "Failed to update user Status to Accept Messages"
                },
          { status : 401}
    )
}


}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request)
{
    await dbConnect()

    const session = await getServerSession(authOptions)
  
    const user:User  = session?.user as User
    if(!session || !session.user){
      return Response.json(
          {
      success : false,
      message : "Not Authenticated"
          },
    { status : 401}
  )
    }
  const userId = user._id;
try {

    const foundUser = await UserModel.findById(userId);
 if(!foundUser){
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
isAcceptingMessage : foundUser.isAcceptingMessage
    },
{ status : 404}
)
    
} catch (error) {
    console.log("Error in getting  Accept Messages status",error)
    return Response.json(
        {
            success : false,
            message : "Error in getting  Accept Messages status"
                },
          { status : 500}
    )
}
 
}

