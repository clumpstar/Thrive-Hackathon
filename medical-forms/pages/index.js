import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import WelcomeCard from "@/components/welcomecard";
import Link from "next/link";


export default function Home() {
  return (
    <main className="bg-neutral-50 min-h-screen">
      <Link href="/" className="flex flex-row gap-2 justify-center py-3 mb-5 cursor-pointer">
        <div className="font-bold">BeWell</div>
        <div className="font-light"><span className="text-white bg-black rounded-xl py-2 px-1 font-semibold">filler</span></div>
      </Link>
      <div>
        <Navbar />
      </div>
      <div>
        <WelcomeCard />
      </div>
    </main>
  );
}
