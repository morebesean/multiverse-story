# 배포 가이드 (Deployment Guide)

이 문서는 Multiverse Story 서비스를 Cloudflare와 Vercel에 배포하는 방법을 설명합니다. Currently, Vercel 배포를 권장합니다.

---

## 🔼 Vercel 배포 (권장 / 현재 설정)

Next.js 기능을 가장 완벽하게 지원하며, 설정이 매우 간편합니다.

### 1. GitHub 연동
1. [Vercel](https://vercel.com)에 로그인합니다.
2. **Add New...** -> **Project**를 클릭합니다.
3. `multiverse-story` 저장소를 선택하여 **Import**합니다.

### 2. 환경변수 설정
빌드 전 **Environment Variables** 섹션에 다음 항목을 추가합니다:
- `OPENAI_API_KEY`: 본인의 OpenAI API 키

### 3. 배포 실행
- **Framework Preset**: `Next.js` (자동 선택됨)
- **Root Directory**: `./`
- **Deploy** 버튼을 클릭합니다.

> [!TIP]
> Vercel은 Edge Runtime을 기본적으로 지원하므로 별도의 어댑터 설정 없이도 API Route가 빠르게 작동합니다.

---

## ☁️ Cloudflare Pages 배포 (참고용)

이전에 시도했던 방식이며, 현재는 설정이 원복되어 있습니다. 다시 시도하려면 OpenNext 설정이 필요합니다.

### 1. 환경변수 설정
- Cloudflare Pages 프로젝트 설정 -> Settings -> Environment variables
- `OPENAI_API_KEY` 추가

### 2. 빌드 설정 (OpenNext 사용 시)
- **Build command**: `npm run build:cloudflare` (현재는 제거됨)
- **Build output directory**: `.open-next`

> [!WARNING]
> Cloudflare Pages에서 Next.js의 동적 라우팅 및 API Route를 사용하려면 OpenNext나 @cloudflare/next-on-pages 같은 어댑터 설정이 필수적입니다.

---

## 🛠 공통 주의사항

### OpenAI API Key
- API Key는 절대 코드에 직접 입력하지 마세요. 반드시 플랫폼의 Settings에서 환경변수로 관리해야 합니다.
- `src/app/api/generate/route.ts` 파일에서 `runtime = "edge"` 설정을 통해 빠른 응답 속도를 확보하고 있습니다.
