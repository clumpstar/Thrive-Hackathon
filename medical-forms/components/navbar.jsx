import { useState } from 'react';
import Link from 'next/link';

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-300 text-white p-4 rounded-3xl mx-24">
      <div className="container flex flex-row justify-center items-center">
        <div className="hidden lg:flex space-x-16">
          <Link href="/section1" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 1</Link>
          <Link href="/section2/section2C1" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 2</Link>
          <Link href="/section3" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 3</Link>
          <Link href="/section4" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 4</Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden mt-4">
          <Link href="/section1" className='block py-2 px-4 font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 1</Link>
          <Link href="/section2/section2C1" className='block py-2 px-4 font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 2</Link>
          <Link href="/section3" className='block py-2 px-4 font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 3</Link>
          <Link href="/section4" className='block py-2 px-4 font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 4</Link>
        </div>
      )}
    </nav>
  );
};

export default navbar;
