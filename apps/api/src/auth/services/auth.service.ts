import { prisma } from "@template/database";
import tokenService from "./token.service";

const getKakaoAuthUrl = async () => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  return kakaoAuthUrl;
};

const kakaoCheckCode = async (code: string) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", process.env.KAKAO_REST_API_KEY!);
  params.append("redirect_uri", process.env.KAKAO_REDIRECT_URI!);
  params.append("code", code);
  params.append("client_secret", process.env.KAKAO_CLIENT_SECRET!);

  const tokenResponse = await fetch(`https://kauth.kakao.com/oauth/token`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    method: "POST",
    body: params,
  });

  const tokenData = await tokenResponse.json();

  console.log(tokenData);

  const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const userInfo = await userResponse.json();

  try {
    const socialAccount = await prisma.socialAccount.findUnique({
      where: {
        provider_accountId: {
          provider: "kakao",
          accountId: userInfo.id.toString(),
        },
      },
    });

    if (socialAccount) {
      await prisma.socialAccount.update({
        where: {
          id: socialAccount.id,
        },
        data: {
          accessToken: tokenData.access_token,
        },
      });

      const tokens = await getUserInfoAndSetTokens(socialAccount.userId);

      return tokens;
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: {
          email: userInfo.kakao_account.email,
        },
        update: {
          nickname: userInfo.kakao_account.profile.nickname,
        },
        create: {
          email: userInfo.kakao_account.email,
          nickname: userInfo.kakao_account.profile.nickname,
        },
      });

      const accessTokenExpiresAt = new Date(
        Date.now() + tokenData.expires_in * 1000,
      );
      const refreshTokenExpiresAt = new Date(
        Date.now() + tokenData.refresh_token_expires_in * 1000,
      );

      await tx.socialAccount.upsert({
        where: {
          provider_accountId: {
            provider: "kakao",
            accountId: userInfo.id.toString(),
          },
        },
        update: {
          accessToken: tokenData.access_token,
          accessTokenExpiresAt,
          refreshToken: tokenData.refresh_token,
          refreshTokenExpiresAt,
        },
        create: {
          user: {
            connect: {
              id: user.id,
            },
          },
          provider: "kakao",
          accountId: userInfo.id.toString(),
          accessToken: tokenData.access_token,
          accessTokenExpiresAt,
          refreshToken: tokenData.refresh_token,
          refreshTokenExpiresAt,
        },
      });
    });

    const user = await prisma.user.findUnique({
      where: {
        email: userInfo.kakao_account.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const tokens = await getUserInfoAndSetTokens(user.id);

    return tokens;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserInfoAndSetTokens = async (userId: string) => {
  const tokens = tokenService.issueJsonTokensWithId(userId);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  });

  return tokens;
};

export { getKakaoAuthUrl, kakaoCheckCode };
