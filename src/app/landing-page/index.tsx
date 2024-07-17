"use client";

import React from "react";
import Image from "next/image";
import FormGenerator from "../form-generator";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";


type Props = {
  cnt:number
};

const words = [
  {
    text: "Transform",
  },
  {
    text: "the",
  },
  {
    text: "way",
  },
  {
    text: "you",
  },
  {
    text: "create",
  },
  {
    text: "forms",
  },
  {
    text: "with",
  },
 
  
  {
    text: "Formify.",
    className: "text-blue-500 dark:text-white-500",
  },
];

const LandingPage: React.FC<Props> = (props) => {
  //  console.log(props.cnt)
  return (
    <div>
      <BackgroundBeams />
      <section className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full">
       
        <TypewriterEffect words={words} />
        <h2 >
          Generate, publish, and share your forms with the power of AI. 
        </h2>
        <FormGenerator cnt={props.cnt} />
        <div className="w-full h-24"></div>
      </section>
     
    </div>
  );
};

export default LandingPage;
