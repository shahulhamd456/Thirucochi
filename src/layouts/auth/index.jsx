import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function Auth({ children }) {
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:min-h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                {children}
                {/* Visual side illustration for desktop */}
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-center justify-center bg-gradient-to-br from-[#003366] to-[#06B6D4] lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                  >
                     <div className="relative flex flex-col items-center text-center p-12 text-white">
                        <div className="mb-8 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                        <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter">Finance CRM</h2>
                        <p className="max-w-md text-lg font-medium opacity-80 leading-relaxed">
                           Manage your clients, investments, and pipeline with our state-of-the-art administrative dashboard.
                        </p>
                        <div className="mt-12 flex gap-4">
                           <div className="h-2 w-12 rounded-full bg-white"></div>
                           <div className="h-2 w-2 rounded-full bg-white/40"></div>
                           <div className="h-2 w-2 rounded-full bg-white/40"></div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
