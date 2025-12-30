import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-[#5B9FA7] py-4 px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            SiGap
          </h1>
        </div>
        <div className="space-x-8 font-semibold text-white text-base">
          <button className="hover:text-gray-200 transition">Beranda</button>
          <button className="hover:text-gray-200 transition">Tentang</button>
          <button className="hover:text-gray-200 transition">Kontak</button>
          <button className="hover:text-gray-200 transition">Masuk</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Pemetaan Resiko
                </h1>
                <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Genangan Air
                </h2>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                Waspadai genangan air yang ada di sekitar wilayah lingkungan tempat tinggal Anda
              </p>

              <button 
                onClick={() => navigate('/login')}
                className="bg-[#5B9FA7] hover:bg-[#4A8A92] text-white font-semibold px-12 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Login
              </button>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="relative z-10">
                {/* Rain Lines */}
                <div className="absolute top-0 right-0 w-full h-full">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-blue-400 opacity-60"
                      style={{
                        width: '3px',
                        height: '40px',
                        top: `${10 + (i % 3) * 15}%`,
                        right: `${15 + i * 6}%`,
                        transform: `rotate(25deg)`,
                      }}
                    />
                  ))}
                </div>

                {/* Person with Umbrella Illustration */}
                <div className="relative flex justify-center items-end h-96">
                  {/* Umbrella */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      {/* Umbrella canopy */}
                      <div className="w-64 h-32 bg-gradient-to-b from-blue-600 to-blue-700 rounded-t-full relative overflow-hidden">
                        {/* Umbrella segments */}
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-0 w-1 h-full bg-blue-800 opacity-30"
                            style={{
                              left: `${i * 12.5}%`,
                              transformOrigin: 'bottom center',
                            }}
                          />
                        ))}
                      </div>
                      {/* Umbrella handle */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-32 w-2 h-32 bg-blue-900 rounded-full" />
                    </div>
                  </div>

                  {/* Person */}
                  <div className="relative z-20" style={{ marginTop: '120px' }}>
                    {/* Head */}
                    <div className="w-16 h-16 bg-orange-300 rounded-full mx-auto mb-2 relative">
                      {/* Face features */}
                      <div className="absolute top-6 left-4 w-2 h-2 bg-gray-800 rounded-full" />
                      <div className="absolute top-6 right-4 w-2 h-2 bg-gray-800 rounded-full" />
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gray-800 rounded-full" />
                    </div>

                    {/* Body */}
                    <div className="w-24 h-32 bg-orange-500 rounded-2xl mx-auto relative">
                      {/* Arm holding umbrella */}
                      <div className="absolute -top-4 right-0 w-12 h-8 bg-orange-400 rounded-full transform rotate-45" />
                    </div>

                    {/* Legs */}
                    <div className="flex justify-center gap-2 -mt-2">
                      <div className="w-10 h-24 bg-blue-900 rounded-b-2xl" />
                      <div className="w-10 h-24 bg-blue-900 rounded-b-2xl" />
                    </div>

                    {/* Shoes */}
                    <div className="flex justify-center gap-2 -mt-2">
                      <div className="w-12 h-6 bg-gray-800 rounded-full" />
                      <div className="w-12 h-6 bg-gray-800 rounded-full" />
                    </div>
                  </div>

                  {/* Water puddle */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-8 bg-blue-300 opacity-40 rounded-full blur-sm" />
                </div>
              </div>

              {/* Wave decorations */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg viewBox="0 0 1200 120" className="w-full h-24">
                  <path
                    d="M0,50 Q300,20 600,50 T1200,50 L1200,120 L0,120 Z"
                    fill="#5B9FA7"
                    opacity="0.1"
                  />
                  <path
                    d="M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z"
                    fill="#5B9FA7"
                    opacity="0.15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;