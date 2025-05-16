import { GetServerSideProps } from 'next';
import { parse } from 'cookie';

type DashboardProps = {
  profile: { id: number; email: string };
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async ({
  req,
}) => {
  // 1) 쿠키 파싱
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.accessToken;

  if (!token) {
    // 토큰 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // 2) 백엔드로 보호된 API 요청
  const res = await fetch(`${process.env.API_BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    // 예: 토큰 만료 시
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const profile = await res.json();

  return {
    props: { profile },
  };
};

export default function DashboardPage({ profile }: DashboardProps) {
  return (
    <div>
      <h1>Welcome, {profile.email}</h1>
      <p>Your user ID is {profile.id}</p>
    </div>
  );
}
