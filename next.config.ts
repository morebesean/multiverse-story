import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 배포를 위한 설정
  // Edge Runtime 사용을 위해 output: 'standalone' 제거 (OpenNext가 처리)

  // 실험적 기능 설정
  experimental: {
    // Edge Runtime에서 서버 액션 지원
  },

  // ESLint 빌드 시 오류 무시 (개발 중에는 경고만)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript 빌드 시 오류 무시 (개발 중에는 경고만)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
