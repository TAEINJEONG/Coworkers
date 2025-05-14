// pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: NextApiResponse<{ user: any } | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  // 1) 클라이언트가 보낸 쿠키에서 accessToken 꺼내기
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // 2) 외부 백엔드 API에 토큰을 헤더로 붙여 사용자 정보 요청
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await axios.get<{ user: any }>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.status(200).json({ user: data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('🛑 /api/user upstream 원본 에러:', err);
    console.error('message:', err.message);
    console.error('code:', err.code);
    return res
      .status(500)
      .json({ error: '사용자 정보 가져오기 실패(네트워크 에러)' });
  }
}
