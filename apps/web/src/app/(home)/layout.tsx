import React from "react";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import { Toaster } from "@template/ui";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <ReactQueryProvider>
      <main
        id='app-container'
        className='unselectable relative flex w-full flex-col h-full bg-zinc-950 overflow-x-hidden'
      >
        <div className='flex-1 w-full pt-14 pb-16 overflow-y-auto bg-zinc-950'>
          {children}
        </div>
      </main>
      <Toaster />
    </ReactQueryProvider>
  );
};

export default layout;
