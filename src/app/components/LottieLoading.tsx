"use client"
import React from 'react'
import Lottie from "react-lottie";
import * as animationData from '../../asset/json/loadingEat.json'
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function LottieLoading() {
  const isLoading = useSelector((state: RootState) => state.loadingSlice.isLoading)

  return (
    <>
      {
        isLoading ?
          <div className="fixed h-full w-full flex items-center justify-center bg-opacity-50 bg-black z-50">
            <div>
              <Lottie
                style={{
                  pointerEvents: 'none',
                }}
                options={defaultOptions}
                height={300}
                width={300}
              />
            </div>
          </div>
          : null}
    </>
  )
}

export default LottieLoading