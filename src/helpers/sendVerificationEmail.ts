import { resend } from "@/lib/resend";

//import React from "react";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
email: string,
username : string,
verifyCode: string,

): Promise< ApiResponse >{

try {
    console.log("Sending verification email...");
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Verification Code:", verifyCode);


    const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email ,
        subject: 'ShadowComms || Verification Code',
        react: VerificationEmail({username, otp: verifyCode}),
    });
    console.log('Response', response);
    return { success: true, message: "Verification email sent successfully" };
}catch (emailError) {
    console.error("Error sending verification email",emailError)

    return { success : false, message:'Failed to send verification email'}
}
}