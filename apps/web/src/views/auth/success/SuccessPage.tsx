"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@template/ui";
import { useRouter } from "next/navigation";

export const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 px-4'>
      {/* Background Graphic */}
      <div className='absolute inset-0 -z-10 bg-zinc-950'>
        <div className='absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]' />
        <div className='absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-emerald-600/20 blur-[120px]' />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md'
      >
        <Card className='border-emerald-500/20 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-3xl text-center'>
          <CardHeader className='space-y-4'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
              className='mx-auto'
            >
              <CheckCircle2 className='h-20 w-20 text-emerald-500' />
            </motion.div>
            <div className='space-y-2'>
              <CardTitle className='text-3xl font-bold tracking-tight text-white'>
                가입이 완료되었습니다!
              </CardTitle>
              <CardDescription className='text-zinc-400'>
                이제 사주 분석을 시작할 준비가 끝났습니다.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className='mt-8'>
            <Button
              className='h-14 w-full rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20'
              onClick={() => router.push("/")}
            >
              사주 보러 가기
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
