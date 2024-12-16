import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-100 p-4">
      <div className="w-64 bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
          </div>
          <div className="h-32 bg-gradient-to-b from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
            <span className="text-black-500 text-3xl font-bold">Quiz</span>
          </div>
          <Button
            asChild
            className="w-full bg-black-500 hover:bg-grey-600 text-white font-semibold py-3 rounded-full transition-all duration-300 ease-in-out"
          >
            <Link href="/quiz">Start</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}