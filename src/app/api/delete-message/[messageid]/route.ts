import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(request: Request, context : { params: { messageid: string } }) {
  const {messageid} = context.params;

  // Connect to the database
  await dbConnect();

  // Get the current session
  const session = await getServerSession(authOptions);
  
  const _user: User = session?.user as User;

  // Check if the session exists and the user is authenticated
  if (!session || !_user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Not Authenticated",
      }),
      { status: 401 }
    );
  }

  try {
    // Attempt to remove the message from the user's messages array
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageid } } }
    );

    // If no document was updated, return a not found response
    if (updateResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found or Already Deleted",
        }),
        { status: 404 }
      );
    }

    // If the message was successfully deleted, return a success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message Deleted",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete message route", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in deleting message",
      }),
      { status: 500 }
    );
  }
}
