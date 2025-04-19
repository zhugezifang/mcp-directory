"use client";

import { sleep } from "openai/core.mjs";
import React, { useState } from 'react';

export default function DownLoad({ imageUrl,fileName }: { imageUrl: string,fileName:string }) {
    const [textFlag, setTextFlag] = useState(true);

    async function downloadImage(imageUrl:string,fileName:string){
        setTextFlag(false);
        await sleep(5000);
        setTextFlag(true);
        window.location.href = imageUrl;
    }

  return (
    <>
        <div className="flex items-center justify-center py-4">
            <div onClick={() => downloadImage(imageUrl, fileName)} className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                {textFlag? "下载简历模板":"下载中..."}
            </div>
        </div>
    </>
  );
}