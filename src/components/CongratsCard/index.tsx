import Lottie from "lottie-react";
import confetti from "@/src/assets/animation/confetti.json";

export default function CongratsCard() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-100">
      <Lottie animationData={confetti} />
    </div>
  );
}
