import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(2,"username must be atleast 2 characters")
    .max(20,"Username should be less than  20 characters")
    .superRefine((value, ctx) => {
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username can only contain letters, numbers, and underscores",
        });
      }});

    export const signUpSchema = z.object({
       username : usernameValidation,
       email : z.string().email({message : 'Invalid email address'}),

       password: z.string().min(6,{message : "Password must be atleast 6 characters"})
    })