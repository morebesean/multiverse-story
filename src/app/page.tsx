import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white selection:bg-purple-500/30">

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-12">

        {/* Header / Logo Area */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl shadow-purple-500/20">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Multiverse Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            "그때 만약 다른 선택을 했다면?"
            <br />
            당신의 또 다른 인생 이야기를 AI가 들려드립니다.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Link
            href="/input"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
          >
            멀티버스 확인하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-6 text-sm text-gray-600">
            로그인 없이 바로 시작할 수 있습니다
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-6 text-xs text-gray-700">
        Powered by OpenAI & Vercel
      </footer>
    </main>
  );
}
