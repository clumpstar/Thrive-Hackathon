import React, { Component } from 'react'
import Section2C1 from "@/components/section2C1"
import Navbar from '@/components/navbar'
import Link from "next/link";

export class section2C1 extends Component {
    render() {
        return (
            <main className="bg-neutral-50 min-h-screen">
                <Link href="/" className='flex flex-row gap-2 justify-center py-3 mb-5 cursor-pointer'>
                    <div className="font-bold">BeWell</div>
                    <div className="font-light"><span className="text-white bg-black rounded-xl py-2 px-1 font-semibold">filler</span></div>
                </Link>
                <div>
                    <Navbar activeSection={"section2"} />
                </div>
                <div className='flex flex-row gap-4 mt-4 mx-24'>
                    <div className='bg-black text-white font-semibold border rounded-lg px-3'>
                        Child 1
                    </div>
                    <div className='text-black font-semibold border rounded-lg px-3 hover:scale-110 transition-all ease-out'>
                        <Link href="/section2/section2C2">Child 2</Link>
                    </div>
                </div>
                <div>
                    <Section2C1 />
                </div>
            </main>
        )
    }
}

export default section2C1