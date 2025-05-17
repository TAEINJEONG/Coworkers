import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import axios from 'axios';

const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://fe-project-cowokers.vercel.app'
    : 'http://localhost:3000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // 2) preflight 요청에 대한 응답
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  } else if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).end('Method Not Allowed');
  }

  // 3) 실제 로그인 로직
  try {
    const { email, nickname, password, passwordConfirmation } = req.body;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`,
      { email, nickname, password, passwordConfirmation }
    );

    const data = response.data;

    // accessToken: 1시간
    const accessOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60, // 1시간
    };
    // refreshToken: 30일
    const refreshOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30일
    };

    res.setHeader('Set-Cookie', [
      serialize('accessToken', data.accessToken, accessOptions),
      serialize('refreshToken', data.refreshToken, refreshOptions),
    ]);
    return res.status(201).json({ success: true, user: data.user });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const status = err.response?.status || 500;
    const payload = err.response?.data || {};

    return res.status(status).json({
      message: payload.message || 'Signup failed',
      details: payload.details ?? null,
    });
  }
}
