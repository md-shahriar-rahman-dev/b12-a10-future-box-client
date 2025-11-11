import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.lottie'; 

export default function LottieLoader({ width = 150, height = 150 }) {
  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width, height }} />
    </div>
  );
}
