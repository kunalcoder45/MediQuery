'use client';

import Link from 'next/link';

export default function ConstructionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-black font-['Roboto'] bg-gray-100">
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        {/* Animated HELLO */}
        <div className="flex justify-center items-center">
          <h1 id="one" className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-widest px-1 animate-one">H</h1>
          <h1 id="two" className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-widest px-1 animate-two">E</h1>
          <h1 id="three" className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-widest px-1 animate-three">L</h1>
          <h1 id="four" className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-widest px-1 animate-four">L</h1>
          <h1 id="five" className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-widest px-1 animate-five">O</h1>
        </div>

        {/* Under Construction Text */}
        <h2
          id="con"
          className="text-xl md:text-3xl lg:text-5xl font-medium tracking-[0.3em] animate-con"
        >
          WE ARE UNDER CONSTRUCTION
        </h2>

        {/* Button to go Home */}
        <Link
          href="/"
          className="mt-8 px-6 py-3 animate-con rounded-2xl bg-black text-white font-semibold text-lg shadow-md hover:bg-gray-800 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
