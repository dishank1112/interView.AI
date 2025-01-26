"use client"
import Image from "next/image";
import AnimatedBackground from "./component/background/AnimatedBackground";
import GradientButton from "./component/gradientbutton/GradientButton";
import { useRouter } from "next/navigation";
import Header from "./component/header/Header";

export default function Home() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/fileupload");
  }
  return (
    <div className="min-h-screen min-w-screen">
        <div  className="absolute top-0 left-0 w-full z-10">
          <Header />
          </div>
      <AnimatedBackground/>
      <div className="flex h-screen w-screen justify-center items-center  ">
       <GradientButton title="Get " onClick={handleGetStarted}/>
      </div>
    </div> 
  );
}
