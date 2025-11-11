import React from 'react';
import loadingGif from '../assets/walk.gif';

export default function Spinner({ size = 200 }) { 
  return (
    <div className="flex justify-center items-center py-10"> 
      <img 
        src={loadingGif} 
        alt="Loading..." 
        style={{ width: size, height: size }} 
      />
    </div>
  );
}
