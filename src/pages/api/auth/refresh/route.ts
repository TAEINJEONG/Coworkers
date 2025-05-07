// src/app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = await fetch(
    'https://cowokers-api.vercel.app/13-3/auth/refresh-token',
    {
      method: 'POST',
      credentials: 'include',
    }
  );
  const cookie = res.headers.get('set-cookie');
  const next = NextResponse.json(null, { status: res.status });
  if (cookie) next.headers.set('set-cookie', cookie);
  return next;
}
