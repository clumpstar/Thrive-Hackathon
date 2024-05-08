import React, { Component } from 'react'
import Section3 from '@/components/section3'
import Navbar from '@/components/navbar'
import Link from "next/link";

export class section3 extends Component {
    render() {
        return (
            <main className="bg-neutral-50 min-h-screen">
                <Link href="/" className='flex flex-row gap-2 justify-center py-3 mb-5 cursor-pointer'>
                    <div className="font-bold">BeWell</div>
                    <div className="font-light"><span className="text-white bg-black rounded-xl py-2 px-1 font-semibold">filler</span></div>
                </Link>
                <div>
                    <Navbar activeSection={"section3"} />
                </div>
                <div>
                    <Section3 />
                </div>
            </main>
        )
    }
}

export default section3