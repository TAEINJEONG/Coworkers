import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setCookie } from 'nookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }

  try {
    const { email, password } = req.body;
    const { data } = await axios.post(
      'https://fe-project-cowokers.vercel.app/13-1/auth/signIn',
      { email, password }
    );

    const { accessToken, refreshToken, user } = data;

    // ① HTTP-only 쿠키로 토큰 저장
    setCookie({ res }, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60,
      path: '/',
      sameSite: 'lax',
    });
    setCookie({ res }, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    // ② 클라이언트에는 민감 정보 없이 유저 정보만 반환
    return res.status(200).json({ user });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('[signIn proxy error]', err);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
