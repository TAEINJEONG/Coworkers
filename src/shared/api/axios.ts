import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? '' // no prefix → calls /api/login
      : process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // 쿠키에 자동 포함되므로 생략해도 되지만,
  // 만약 로컬 스토리지에서 꺼내려면 getState() 사용:
  // const token = useAuthStore.getState().user?.accessToken;
  // if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    // 토큰 갱신 요청 자체는 retry 하지 않기
    if (originalReq.url?.includes('/api/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        // 토큰 갱신
        const { data } = await axiosInstance.post('/api/refresh-token');
        // 헤더 갱신 후 원래 요청 재시도
        originalReq.headers!['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalReq);
      } catch (refreshErr) {
        // refresh 실패 시 로그아웃 처리 등
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
