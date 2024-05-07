import { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-300 text-white p-4 rounded-3xl mx-24">
      <div className="container flex flex-row justify-center items-center">
        <div className="hidden lg:flex space-x-16">
          <div className={activeSection === 'section1' ? 'border-b-4 rounded-md' : ''}>
            <Link href="/section1" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 1</Link>
          </div>
          <div className={activeSection === 'section2' ? 'border-b-4 rounded-md' : ''}>
            <Link href="/section2/section2C1" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 2</Link>
          </div>
          <div className={activeSection === 'section3' ? 'border-b-4 rounded-md' : ''}>
            <Link href="/section3" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 3</Link>
          </div>
          <div className={activeSection === 'section4' ? 'border-b-4 rounded-md' : ''}>
            <Link href="/section4" className='font-semibold cursor-pointer hover:scale-110 ease-out transition-all'>Section 4</Link>
          </div>
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
          <div className={activeSection === 'section1' ? 'underline' : ''}>
            <Link href="/section1" className='font-semibold cursor-pointer'>Section 1</Link>
          </div>
          <div className={activeSection === 'section2' ? 'underline' : ''}>
            <Link href="/section2/section2C1" className='font-semibold cursor-pointer'>Section 2</Link>
          </div>
          <div className={activeSection === 'section3' ? 'underline' : ''}>
            <Link href="/section3" className='font-semibold cursor-pointer'>Section 3</Link>
          </div>
          <div className={activeSection === 'section4' ? 'underline' : ''}>
            <Link href="/section4" className='font-semibold cursor-pointer'>Section 4</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
