import React from 'react';

const Title = ({ text1, text2 }) => (
  <div className="text-center mb-10">
    <h2 className="section-heading">
      <span className="text-gray-400 font-light">{text1} </span>
      <span className="text-gray-800">{text2}</span>
    </h2>
    <div className="flex items-center justify-center gap-2 mt-2">
      <div className="w-8 h-px bg-rose-300" />
      <div className="w-2 h-2 rounded-full bg-rose-400" />
      <div className="w-16 h-px bg-rose-400" />
      <div className="w-2 h-2 rounded-full bg-rose-400" />
      <div className="w-8 h-px bg-rose-300" />
    </div>
  </div>
);

export default Title;
