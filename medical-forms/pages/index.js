import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Section1 from "@/components/section1";


export default function Home() {
  return (
    <main className="bg-neutral-50 min-h-screen">
      <div className="flex flex-row gap-2 justify-center py-3">
        <div className="font-bold">THRIVE</div>
        <div className="font-light"><span className="border text-white bg-black rounded-xl py-2 px-1 font-semibold">filler</span></div>
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <Section1 />
      </div>
    </main>
  );
}
