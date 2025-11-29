export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Circles */}
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-4 border-[#ffd700]/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border-4 border-[#9333ea]/30 animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="absolute inset-4 rounded-full border-4 border-[#ffd700] animate-spin" />
        </div>
        
        {/* Logo/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl animate-pulse">🎤</span>
        </div>
      </div>
      
      <h2 className="mt-8 text-2xl" style={{ 
        color: '#ffd700',
        fontWeight: 700,
        textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
      }}>
        KARAOKE THỦ ĐÔ
      </h2>
      
      <p className="mt-2 text-gray-400">Đang tải...</p>
    </div>
  );
}
