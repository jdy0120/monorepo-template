"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@template/ui";

export const LoginPage = () => {
  const authLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_API_BASE_URL}/api/saju/auth/callback&prompt=login`;

  const handleClickKakaoLogin = () => {
    window.location.href = authLink;
  };

  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-950 px-4'>
      {/* Background Graphic */}
      <div className='absolute inset-0 -z-10 bg-zinc-950'>
        <div className='absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]' />
        <div className='absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-[120px]' />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md'
      >
        <Card className='border-indigo-500/20 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-xl'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-3xl font-bold tracking-tight text-white'>
              환영합니다.
            </CardTitle>
            <CardDescription className='text-zinc-400'>
              복잡한 절차 없이 간편하게 시작하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className='mt-8 flex flex-col space-y-4'>
            <Button
              variant='outline'
              onClick={handleClickKakaoLogin}
              className='h-14 w-full rounded-xl border-yellow-500/50 bg-[#FEE500]/10 text-lg font-bold text-[#FEE500] hover:bg-[#FEE500]/20 hover:text-[#FEE500] transition-colors'
            >
              카카오로 3초 만에 시작하기
            </Button>

            <p className='px-4 text-center text-xs text-zinc-500'>
              계속 버튼을 누르시면 서비스 이용약관 및 개인정보 처리방침에
              동의하시게 됩니다.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
