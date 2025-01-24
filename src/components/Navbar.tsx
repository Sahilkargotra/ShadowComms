'use client'
import React from 'react'
import Link  from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const {data : session} = useSession();
    const router = useRouter();
    
    const user : User = session?.user as User
    const handleLogout = async () => {
        await signOut({ redirect: false }); // Prevent automatic redirect
        router.replace('/'); // Redirect to your desired page after logout
    };

  return (
   <nav className='P-4 md:p-6 shadow-md'>
    <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a className='text-xl font-bold mb-4 md:mb-0' > ShadowComms</a>
        {
            session? (
                <div className='flex items-center'>
                <span className='mr-4'> Welcome,{user?.username || user?.email}
                </span>
                <Button className = 'w-full md:w-auto'onClick={handleLogout} aria-label="Logout">Logout</Button>
                </div>
            ):(
                <Link href = '/sign-in'>
                    <Button className = 'w-full md:w-auto'>Login</Button>
                </Link>
            )
        }
    </div>
   </nav>
  )
}

export default Navbar;