/* eslint-disable @next/next/no-head-element */
import React from 'react';

interface EmailVerificationProps {
  otp: string;
  username: string;
}

export  default function VerificationEmail({username, otp}:EmailVerificationProps){
 return (  
 <html>
      <head>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              text-align: center;
              color: #333;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #4CAF50;
              display: block;
              text-align: center;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #777;
              font-size: 12px;
            }
            .footer a {
              color: #4CAF50;
              text-decoration: none;
            }
          `}
        </style>
      </head>
      <body>
        <div className="email-container">
          <div className="email-header">
            <h1>Email Verification</h1>
            <h2> Hello {username}</h2>
            <p>Thank you for registering with us! Please verify your email address by entering the OTP below.</p>
          </div>

          <div className="otp">
            <p>Your OTP is: <strong>{otp}</strong></p>
          </div>

          <p>If you didnt request this, please ignore this email or contact support.</p>

          <div className="footer">
            <p>Need help? <a href="mailto:support@example.com">Contact Support</a></p>
            <p>© 2025 ShadowComms. All rights reserved.</p>
            <p>Created by Sahil Kargotra</p>
          </div>
        </div>
      </body>
    </html>
  );
}

//export default VerificationEmail;
