'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

interface Props {
    SetAcceptedCookies: React.Dispatch<React.SetStateAction<boolean>>
  }


export default function CookieModal({SetAcceptedCookies}:any){
    const router = useRouter();

    const declineCookie = (event: any):void=>{
        event.preventDefault();
        SetAcceptedCookies(true)
        router.push('/')
    }

    const acceptCookie = (event: any):void => {
        event.preventDefault();
        SetAcceptedCookies(true)
        Cookies.set('AcceptedCookies', 'Accepted')
        router.push('/')
    }

    return (
        <div className="cookie_modal_container">
            <button className="close_out_button" onClick={declineCookie}>X</button>
            <h3>nom nom nom</h3>
            <p> Some basic stuff about how cookies are great</p>
           <button className="accept_cookies" onClick={acceptCookie}>Accept</button>
        </div>
    )
}