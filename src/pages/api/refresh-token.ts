import type { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';
import axios from 'axios';

const FRONTEND_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://fe-project-cowokers.vercel.app';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ← 이 CORS 헤더들을 OPTIONS 뿐 아니라 POST에도 항상 달아 줘야 합니다
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).end('Method Not Allowed');
  }

  // 이제 브라우저가 실제 요청에도 쿠키를 보낼 수 있습니다
  const cookies = parse(req.headers.cookie || '');
  const refreshToken = cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const { data } = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      refreshToken,
    });

    // 새 토큰 쿠키 설정 (access 5분, refresh 30일 예시)
    res.setHeader('Set-Cookie', [
      serialize('accessToken', data.accessToken, {
        ...COOKIE_OPTS,
        maxAge: 5 * 60,
      }),
    ]);
    return res.status(200).json({ accessToken: data.accessToken });
  } catch {
    return res.status(401).json({ message: 'Refresh failed' });
  }
}
