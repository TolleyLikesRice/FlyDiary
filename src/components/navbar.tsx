import Image from 'next/image';
import Script from 'next/script';
import { AiOutlineMenu } from "react-icons/ai";

import placeholderImg from '../../public/img/placeholder.png';

export default function NavBar() {
    return (
        <div id='navbar' className="bg-slate-950 transition duration-500 flex justify-between items-center px-4 py-3 fixed w-screen">
            <Script src='js/navbar.js'/>
            <AiOutlineMenu className="text-2xl w-9 text-gray-100" />
            <h1 className="text-gray-100 text-2xl">FlyDiary</h1>
            <Image className='h-9 aspect-square rounded-full w-fit' src={placeholderImg} alt='profile picture' />
        </div>
    )
}