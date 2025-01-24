import {z} from 'zod';

export const signInSchema = z.object({
    identifier : z.string(),   // indetifier = email
    password : z.string(),
})