import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {User} from "next-auth";


 
export async function DELETE(req:Request, props:{ params: Promise<{ messageid: string }>; })
{
  const messageId = await props.params;

    await dbConnect();

    const session = await getServerSession(authOptions);
  
    const _user:User  = session?.user as User;
    if(!session || !_user){
      return Response.json(
          {
      success : false,
      message : "Not Authenticated"
          },
    { status : 401}
  );
    }
try {
    const updateResult = await UserModel.updateOne(
      {_id : _user._id},
      {$pull:{messages:{_id : messageId}}}
    );
    if(updateResult.modifiedCount == 0)
    {
      return Response.json(
        {
    success : false,
    message : "Message not found or Already Deleted"
        },
  { status : 404}
);
    }
    return Response.json(
      {
  success : true,
  message : "Message Deleted"
      },
{ status : 200}
);
} catch (error) {
  console.log("Error in delete message route",error)
  return Response.json(
    {
success : false,
message : "Error in deleteing message"
    },
{ status : 500}
);
}
}
