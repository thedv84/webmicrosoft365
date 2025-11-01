'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          ÄÆ°a Ã½ tÆ°á»Ÿng cá»§a báº¡n vÃ o cuá»™c sá»‘ng vá»›i Microsoft 365
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Sá»Ÿ há»¯u cÃ¡c á»©ng dá»¥ng Office cao cáº¥p, lÆ°u trá»¯ Ä‘Ã¡m mÃ¢y vÃ  báº£o máº­t nÃ¢ng cao Ä‘á»ƒ hoÃ n thÃ nh má»i viá»‡c. Chá»n gÃ³i phÃ¹ há»£p vá»›i báº¡n.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-ms-orange text-white hover:bg-ms-orangeHover">
            <Link href="/products/personal">Mua ngay cho cA� nhA�n</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-ms-orange border-ms-orange hover:bg-ms-neutralLight">
            <Link href="/products/family">Mua ngay cho gia �`A�nh</Link>
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Image
          src="/images/microsoft365-hero.png" // Replace with a relevant Microsoft 365 image
          alt="Microsoft 365 applications"
          width={1200}
          height={400}
          className="rounded-lg shadow-2xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;

