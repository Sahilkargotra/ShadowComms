import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {Message} from "@/models/User"


export async function POST(request : Request)
{
    await dbConnect();
    const  {username,content} = await request.json();

    try {
      const user =  await UserModel.findOne({username})

      if(!user)
      {
        return Response.json(
            {
        success : false,
        message : "User Not Found"
            },
      { status : 404}
    )

      }
      if(!user.isAcceptingMessage)
      {
        return Response.json(
            {
        success : false,
        message : "User not Accepting Messages"
            },
      { status : 403}
    )
      }

      const newMessage = {content,createdAt: new Date()}
      user.messages.push(newMessage as Message)

      await user.save()
      return Response.json(
        {
    success : true,
    message : "Message sent Successfully"
        },
  { status : 200}
)
    } catch (error) {
        console.log("Send Message Error ",error)
        return Response.json(
            {
        success : false,
        message : "Error occurred in send Message"
            },
      { status : 500}
    )
    }
}