import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Clock, 
  Gift, 
  ChevronRight, 
  Music, 
  Music2,
  Camera,
  Copy,
  ChevronLeft,
  Quote,
  Sparkles,
  Home,
  Users,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const scrollRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(to);

    const handleScroll = () => {
      const sections = ['home', 'mempelai', 'story', 'acara', 'galeri', 'kado'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => setIsPlaying(!isPlaying);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const scrollGallery = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const GununganOrnamen = ({ className }) => (
    <div className={`absolute opacity-10 pointer-events-none ${className}`}>
      <svg width="200" height="300" viewBox="0 0 100 150" fill="currentColor">
        <path d="M50,0 L100,150 L0,150 Z" opacity="0.5"/>
        <path d="M50,10 L90,140 L10,140 Z" />
        <circle cx="50" cy="80" r="10" />
        <path d="M50,30 L60,50 L40,50 Z" />
      </svg>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center relative overflow-hidden text-[#5D4037]">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-fractal.png")' }}></div>
        
        <GununganOrnamen className="-left-10 bottom-0 rotate-12 text-[#8D6E63]" />
        <GununganOrnamen className="-right-10 bottom-0 -rotate-12 text-[#8D6E63]" />

        <div className="z-10 text-center px-6 animate-fade-in">
          <div className="mb-6 flex justify-center">
             <div className="w-16 h-1 bg-[#8D6E63] rounded-full"></div>
          </div>
          <p className="uppercase tracking-[0.5em] text-[10px] mb-4 text-[#8D6E63] font-bold">The Wedding of</p>
          <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-tight">Bimo & Sekar</h1>
          
          <div className="mb-10 bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-[#D7CCC8] shadow-2xl max-w-sm mx-auto relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8D6E63] to-transparent"></div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4 text-[#8D6E63]">Yth. Bapak/Ibu/Saudara/i</p>
            <h2 className="text-3xl font-serif mb-2">{guestName}</h2>
            <p className="text-[10px] italic opacity-60">Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="bg-[#5D4037] text-[#FDFBF7] px-12 py-4 rounded-full flex items-center gap-3 hover:bg-[#3E2723] transition-all shadow-2xl group border-2 border-[#D7CCC8]"
          >
            Buka Undangan
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4037] font-sans selection:bg-[#D7CCC8] overflow-x-hidden pb-24">
      {/* Sticky Bottom Navbar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-white/90 backdrop-blur-lg border border-[#D7CCC8] px-3 md:px-4 py-2.5 md:py-3 rounded-full shadow-2xl flex items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 w-auto">
        {[
          { id: 'home', icon: <Home className="w-4 h-4 md:w-5 md:h-5" />, label: 'Home' },
          { id: 'mempelai', icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, label: 'Mempelai' },
          { id: 'story', icon: <BookOpen className="w-4 h-4 md:w-5 md:h-5" />, label: 'Cerita' },
          { id: 'acara', icon: <Calendar className="w-4 h-4 md:w-5 md:h-5" />, label: 'Acara' },
          { id: 'galeri', icon: <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />, label: 'Galeri' },
          { id: 'kado', icon: <Gift className="w-4 h-4 md:w-5 md:h-5" />, label: 'Kado' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center p-2 md:p-2.5 rounded-full transition-all min-w-[40px] md:min-w-[48px] ${
              activeTab === item.id ? 'bg-[#5D4037] text-white scale-105' : 'hover:bg-[#EFEBE9] text-[#8D6E63]'
            }`}
          >
            {item.icon}
            <span className="text-[6px] md:text-[8px] uppercase mt-0.5 md:mt-1 hidden sm:block font-bold tracking-tighter whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center px-6 bg-[#EFEBE9] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-fractal.png")' }}></div>
        <div className="z-10">
            <div className="mb-8 flex justify-center gap-3 opacity-30">
                <div className="w-12 h-px bg-[#5D4037]"></div>
                <Sparkles size={16} />
                <div className="w-12 h-px bg-[#5D4037]"></div>
            </div>
          <p className="text-xs tracking-[0.8em] uppercase mb-6 text-[#8D6E63] font-bold">The Wedding Celebration</p>
          <h1 className="font-serif text-7xl md:text-[10rem] mb-6 leading-none">Bimo & Sekar</h1>
          <p className="text-2xl tracking-[0.4em] font-light opacity-60">12 . 12 . 2025</p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
            <div className="w-px h-24 bg-gradient-to-b from-[#5D4037] to-transparent"></div>
        </div>
      </section>

      {/* Mempelai */}
      <section id="mempelai" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDFBF7] rounded-full -mr-32 -mt-32 border border-[#EFEBE9]"></div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          <div className="text-center group">
            <div className="relative inline-block mb-10">
              <div className="absolute -inset-6 border-2 border-dashed border-[#D7CCC8] rounded-full animate-spin-slow opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-72 h-72 mx-auto rounded-full overflow-hidden border-[12px] border-[#FDFBF7] shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop" alt="Bimo" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
            <h2 className="font-serif text-4xl mb-3">Bimo Wicaksono, S.T.</h2>
            <div className="flex justify-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#D7CCC8] self-center"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#8D6E63]">Putra Sulung</p>
                <div className="w-8 h-px bg-[#D7CCC8] self-center"></div>
            </div>
            <p className="text-sm opacity-70">Bapak Hardi & Ibu Sumarni</p>
            <p className="text-xs mt-2 italic text-[#A1887F]">Sleman, Yogyakarta</p>
          </div>

          <div className="text-center group">
            <div className="relative inline-block mb-10">
                <div className="absolute -inset-6 border-2 border-dashed border-[#D7CCC8] rounded-full animate-spin-slow-reverse opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-72 h-72 mx-auto rounded-full overflow-hidden border-[12px] border-[#FDFBF7] shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1621092120002-320d75c1b694?q=80&w=800&auto=format&fit=crop" alt="Sekar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
            <h2 className="font-serif text-4xl mb-3">Sekar Ayu Lestari, S.E.</h2>
            <div className="flex justify-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#D7CCC8] self-center"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#8D6E63]">Putri Bungsu</p>
                <div className="w-8 h-px bg-[#D7CCC8] self-center"></div>
            </div>
            <p className="text-sm opacity-70">Bapak Kusumo & Ibu Ratna</p>
            <p className="text-xs mt-2 italic text-[#A1887F]">Kotagede, Yogyakarta</p>
          </div>
        </div>
      </section>

      {/* Backstory - Enhanced Design */}
      <section id="story" className="py-32 px-6 bg-[#FDFBF7] relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 relative">
            <Quote className="mx-auto mb-6 text-[#D7CCC8] opacity-50" size={60} />
            <h2 className="font-serif text-5xl mb-4 italic relative z-10">Kisah Kita</h2>
            <p className="text-xs uppercase tracking-[0.4em] text-[#8D6E63] font-bold">Perjalanan Menuju Satu Atap</p>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#EFEBE9] -z-10"></div>
          </div>

          <div className="space-y-24 relative">
             <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#D7CCC8] -translate-x-1/2 hidden md:block opacity-30"></div>
            
            {/* Pertemuan */}
            <div className="relative group">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 text-center md:text-right mb-8 md:mb-0">
                        <div className="inline-block p-1 bg-gradient-to-br from-[#D7CCC8] to-transparent rounded-[2rem]">
                            <div className="bg-white p-8 rounded-[1.9rem] shadow-xl border border-white transition-all group-hover:-translate-y-2">
                                <span className="inline-block px-4 py-1 bg-[#FDFBF7] text-[#8D6E63] rounded-full text-[10px] font-bold tracking-widest mb-4 border border-[#EFEBE9]">MEI 2020</span>
                                <h3 className="font-serif text-2xl mb-4 text-[#5D4037]">Awal Perjumpaan</h3>
                                <p className="text-sm leading-relaxed text-[#795548] opacity-80">Dimulai dari sebuah sapaan canggung di pojok perpustakaan, kami menemukan bahwa dunia kami ternyata memiliki frekuensi yang sama. Sederhana, namun berbekas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#FDFBF7] border border-[#D7CCC8] rounded-full items-center justify-center z-20 shadow-lg">
                        <div className="w-3 h-3 bg-[#5D4037] rounded-full animate-pulse"></div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 opacity-20 group-hover:opacity-100 transition-all duration-700 overflow-hidden rounded-[2rem] h-48">
                         <img src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Pertemuan" />
                    </div>
                </div>
            </div>

            {/* Komitmen */}
            <div className="relative group">
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 md:pl-12 text-center md:text-left mb-8 md:mb-0">
                        <div className="inline-block p-1 bg-gradient-to-bl from-[#D7CCC8] to-transparent rounded-[2rem]">
                            <div className="bg-white p-8 rounded-[1.9rem] shadow-xl border border-white transition-all group-hover:-translate-y-2">
                                <span className="inline-block px-4 py-1 bg-[#FDFBF7] text-[#8D6E63] rounded-full text-[10px] font-bold tracking-widest mb-4 border border-[#EFEBE9]">AGUSTUS 2024</span>
                                <h3 className="font-serif text-2xl mb-4 text-[#5D4037]">Menerajut Janji</h3>
                                <p className="text-sm leading-relaxed text-[#795548] opacity-80">Setelah empat tahun berbagi musim, di bawah senja Pantai Parangtritis, kami memutuskan bahwa sisa hidup ini ingin kami lalui bersama-sama.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#FDFBF7] border border-[#D7CCC8] rounded-full items-center justify-center z-20 shadow-lg">
                        <div className="w-3 h-3 bg-[#5D4037] rounded-full animate-pulse"></div>
                    </div>
                    <div className="md:w-1/2 md:pr-12 opacity-20 group-hover:opacity-100 transition-all duration-700 overflow-hidden rounded-[2rem] h-48">
                         <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Komitmen" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acara */}
      <section id="acara" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-5xl mb-20">Agenda Bahagia</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#FDFBF7] p-12 rounded-[3rem] shadow-sm border border-[#EFEBE9] group hover:shadow-2xl transition-all duration-500 relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <GununganOrnamen className="scale-75" />
              </div>
              <Clock className="mx-auto mb-6 text-[#8D6E63]" size={32} />
              <h3 className="font-serif text-3xl mb-4">Akad Nikah</h3>
              <p className="font-bold text-xl mb-1 text-[#5D4037]">Minggu, 12 Desember 2025</p>
              <p className="mb-8 text-[#8D6E63] font-medium">08.00 - 10.00 WIB</p>
              <div className="w-16 h-px bg-[#D7CCC8] mx-auto mb-8"></div>
              <p className="flex items-center justify-center gap-2 text-sm italic opacity-80 mb-8">
                <MapPin size={18} /> Pendopo Agung Royal Ambarrukmo
              </p>
              <a href="#" className="inline-block px-8 py-3 bg-[#5D4037] text-white rounded-full text-xs font-bold tracking-widest hover:bg-[#3E2723] transition-all">PETUNJUK LOKASI</a>
            </div>

            <div className="bg-[#5D4037] text-[#FDFBF7] p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 p-8 opacity-10">
                 <GununganOrnamen className="scale-75 rotate-180" />
              </div>
              <Calendar className="mx-auto mb-6 text-[#D7CCC8]" size={32} />
              <h3 className="font-serif text-3xl mb-4">Resepsi</h3>
              <p className="font-bold text-xl mb-1">Minggu, 12 Desember 2025</p>
              <p className="mb-8 text-[#D7CCC8] font-medium">11.00 - 14.00 WIB</p>
              <div className="w-16 h-px bg-white/20 mx-auto mb-8"></div>
              <p className="flex items-center justify-center gap-2 text-sm italic opacity-80 mb-8">
                <MapPin size={18} /> Pendopo Agung Royal Ambarrukmo
              </p>
               <a href="#" className="inline-block px-8 py-3 bg-white text-[#5D4037] rounded-full text-xs font-bold tracking-widest hover:bg-[#D7CCC8] transition-all">SIMPAN TANGGAL</a>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri - Slider */}
      <section id="galeri" className="py-32 px-4 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Camera className="mx-auto mb-6 text-[#8D6E63]" size={32} />
            <h2 className="font-serif text-5xl mb-4">Galeri Prewedding</h2>
            <div className="w-16 h-1 bg-[#D7CCC8] mx-auto"></div>
          </div>
          
          <div className="relative group">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-12 scroll-smooth"
            >
              {[
                "https://images.unsplash.com/photo-1606216794074-735e91aa2c62?q=80&w=800",
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
                "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
                "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800",
                "https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=800",
                "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800"
              ].map((src, idx) => (
                <div key={idx} className="min-w-[85%] md:min-w-[40%] lg:min-w-[30%] h-[550px] snap-center rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.03]">
                  <img src={src} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="hidden md:block">
                <button 
                onClick={() => scrollGallery('left')}
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-2xl text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all z-20"
                >
                <ChevronLeft size={24} />
                </button>
                <button 
                onClick={() => scrollGallery('right')}
                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-2xl text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all z-20"
                >
                <ChevronRight size={24} />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Gift */}
      <section id="kado" className="py-32 px-6 bg-white relative">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Gift className="mx-auto mb-8 text-[#5D4037]" size={48} />
          <h2 className="font-serif text-5xl mb-6">Kirim Hadiah</h2>
          <p className="mb-12 text-[#795548] leading-relaxed italic opacity-80">Doa restu Anda adalah karunia yang paling berharga bagi kami. Namun jika Anda bermaksud memberikan hadiah sebagai tanda kasih, dapat dikirimkan melalui:</p>
          
          <div className="space-y-8">
            <div className="bg-[#FDFBF7] p-10 rounded-[3rem] border border-[#EFEBE9] shadow-sm group hover:border-[#D7CCC8] transition-all">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-2xl font-bold text-[#5D4037]">BCA</span>
                 <Sparkles className="text-[#D7CCC8]" size={20} />
              </div>
              <p className="text-3xl tracking-[0.2em] font-mono mb-2 text-[#5D4037]">8830 1234 56</p>
              <p className="text-xs mb-8 uppercase tracking-widest text-[#8D6E63] font-bold">a.n Bimo Wicaksono</p>
              <button 
                onClick={() => copyToClipboard('8830123456')}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-white border border-[#D7CCC8] text-[#5D4037] px-6 py-4 rounded-full hover:bg-[#5D4037] hover:text-white transition-all shadow-sm"
              >
                <Copy size={14} /> SALIN NOMOR REKENING
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 text-center px-6 bg-[#5D4037] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-fractal.png")' }}></div>
        <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="font-serif text-4xl mb-8 leading-relaxed">Merupakan suatu kehormatan & kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</h2>
            <div className="flex justify-center items-center gap-6 mb-12">
                <div className="w-16 h-px bg-white/30"></div>
                <Heart className="text-[#D7CCC8]" fill="currentColor" />
                <div className="w-16 h-px bg-white/30"></div>
            </div>
            <p className="font-serif text-5xl mb-2 text-[#D7CCC8]">Bimo & Sekar</p>
            <p className="text-[10px] uppercase tracking-[0.5em] mt-24 opacity-40 italic">Matur Nuwun</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');
        
        :root {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-serif {
            font-family: 'Playfair Display', serif;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .animate-spin-slow { animation: spin 30s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-reverse 35s linear infinite; }
        .animate-fade-in { animation: fadeIn 2s ease-out; }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;