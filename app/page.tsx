import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl">
        <div className="mb-6">
          <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
            Longform Emagazine
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Giao thông công cộng TP.HCM: Vì sao vẫn khó hút người đi?
        </h1>
        
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Khám phá những thách thức và cơ hội của hệ thống giao thông công cộng tại thành phố năng động nhất Việt Nam
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/emagazine/index.html"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem Emagazine
          </Link>
          
          <a 
            href="/emagazine/index.html"
            download="emagazine-giao-thong-cong-cong.html"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Tải về HTML
          </a>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold">10+</div>
            <div className="text-sm opacity-80">Hiệu ứng động</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold">11</div>
            <div className="text-sm opacity-80">Phần nội dung</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold">6</div>
            <div className="text-sm opacity-80">Infographic</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm opacity-80">Tương tác</div>
          </div>
        </div>
        
        <div className="mt-8 text-sm opacity-70">
          <p className="mb-2">3 file riêng biệt (HTML, CSS, JS) - Có thể mở trực tiếp trên trình duyệt hoặc chỉnh sửa trong VS Code</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <span className="bg-white/20 px-3 py-1 rounded-full">index.html</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">styles.css</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">script.js</span>
          </div>
        </div>
      </div>
    </main>
  )
}
