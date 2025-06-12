import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface PaginaConfig {
  id: number;
  tipo: "auto" | "manual";
  layout: string;
  corFundo?: string;
  aurora?: boolean;
  tempoTransicao?: number;
  titulo?: string;
  subtitulo?: string;
  estrelas?: boolean;
  data?: string;
  texto?: string;
  contador?: {
    dataInicio: string;
    texto: string;
  };
  planetas?: boolean;
  youtube?: {
    videoId: string;
  };
  textoRodape?: string;
  imagem?: string;
  capitulo?: string;
  corTituloCapitulo?: string;
}

const paginasConfig: PaginaConfig[] = [
  {
    id: 1,
    tipo: "auto",
    tempoTransicao: 4000,
    titulo: "Nossa História",
    subtitulo: "Uma jornada de amor e momentos inesquecíveis",
    aurora: true,
    estrelas: true,
    layout: "titulo-principal"
  },
  {
    id: 2,
    tipo: "auto",
    tempoTransicao: 4000,
    data: "9 de setembro de 2024",
    texto: "Alguns encontros mudam nossas vidas para sempre...",
    corFundo: "#000",
    aurora: true,
    estrelas: true,
    layout: "texto-com-data"
  },
  {
    id: 3,
    tipo: "auto",
    tempoTransicao: 4000,
    texto: "Cada momento ao seu lado é uma memória eterna...",
    corFundo: "#000",
    aurora: true,
    estrelas: true,
    layout: "texto-simples"
  },
  {
    id: 4,
    tipo: "auto",
    tempoTransicao: 4000,
    texto: "Nossa história é feita de pequenos instantes mágicos...",
    corFundo: "#000",
    aurora: true,
    estrelas: true,
    layout: "texto-simples"
  },
  {
    id: 5,
    tipo: "auto",
    tempoTransicao: 4000,
    texto: "Deslize para reviver nossa jornada juntos...",
    corFundo: "#000",
    aurora: true,
    estrelas: true,
    layout: "texto-simples"
  },
  {
    id: 6,
    tipo: "auto",
    tempoTransicao: 5000,
    contador: {
      dataInicio: "2024-09-09T00:00:00",
      texto: "Já demos várias voltas ao redor do sol..."
    },
    corFundo: "linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)",
    layout: "contador-especial",
    planetas: true
  },
  {
    id: 7,
    tipo: "manual",
    titulo: "Que tal dar play na música que me faz reviver nossa história?",
    youtube: {
      videoId: "Wo-x0w-SMJY",
    },
    corFundo: "#000000",
    layout: "musica",
    textoRodape: "Dê play na música e continue rolando para reviver nossos momentos especiais."
  },
  {
    id: 8,
    tipo: "manual",
    titulo: "Nossa Primeira Foto",
    texto: "O momento em que capturamos nosso primeiro sorriso juntos. Um instante eternizado que marca o início da nossa história.",
    imagem: "https://i.postimg.cc/T1XhZd7N/Imagem-do-Whats-App-de-2025-06-10-s-12-27-15-ca72bb14.jpg",
    layout: "foto",
    capitulo: "Capítulo 1"
  },
  {
    id: 9,
    tipo: "manual",
    titulo: "Nossa Primeira Viagem",
    texto: "Descobrindo novos lugares e criando memórias inesquecíveis juntos.",
    imagem: "https://i.postimg.cc/NF7Lt3Zs/Imagem-do-Whats-App-de-2025-06-10-s-12-27-45-28b94800.jpg",
    layout: "foto",
    capitulo: "Capítulo 2"
  },
  {
    id: 10,
    tipo: "manual",
    titulo: "Momentos Especiais",
    texto: "Cada sorriso, cada abraço, cada momento ao seu lado é um tesouro eterno.",
    imagem: "https://i.postimg.cc/qM4zw7Cz/Imagem-do-Whats-App-de-2025-06-10-s-12-30-39-193a0633.jpg",
    layout: "foto",
    capitulo: "Capítulo 3"
  },
  {
    id: 11,
    tipo: "manual",
    titulo: "Momentos Atuais",
    texto: "Continuando nossa jornada de amor, construindo um futuro cheio de felicidade juntos.",
    imagem: "https://i.postimg.cc/MTBvPMDj/Imagem-do-Whats-App-de-2025-06-09-s-17-23-15-84fe5ac7.jpg",
    layout: "foto",
    capitulo: "Capítulo 4",
  },
  {
    id: 12,
    tipo: "manual",
    titulo: "Nossa História Continua...",
    texto: "Dividiamos a camisa 9.... Agora dividimos a vida.",
    contador: {
      dataInicio: "2024-09-09T00:00:00",
      texto: "Dias lado a lado:"
    },
    corFundo: "linear-gradient(to bottom, #9c27b033, #000000)",
    layout: "final"
  }
];

const estiloTextoPrincipal: React.CSSProperties = {
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  fontWeight: 700,
  marginBottom: '1rem',
  background: 'linear-gradient(135deg, #9c27b0, #e91e63)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

function App() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [transicaoAtiva, setTransicaoAtiva] = useState(false);
  const [contadorTempo, setContadorTempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const calcularTempoDecorrido = useCallback((dataInicio: string) => {
    const inicio = new Date(dataInicio);
    const agora = new Date();
    const diferenca = agora.getTime() - inicio.getTime();
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    return { dias, horas, minutos, segundos };
  }, []);

  useEffect(() => {
    const paginaConfig = paginasConfig.find(p => p.id === paginaAtual);
    const dataInicio = paginaConfig?.contador?.dataInicio;

    if (dataInicio) {
      const interval = setInterval(() => {
        setContadorTempo(calcularTempoDecorrido(dataInicio));
      }, 1000);
      setContadorTempo(calcularTempoDecorrido(dataInicio));
      return () => clearInterval(interval);
    }
  }, [paginaAtual, calcularTempoDecorrido]);

  useEffect(() => {
    const paginaConfig = paginasConfig.find(p => p.id === paginaAtual);
    if (paginaConfig?.tipo === "auto" && paginaConfig.tempoTransicao) {
      const timer = setTimeout(() => {
        if (paginaAtual < paginasConfig.length) {
          mudarPagina(paginaAtual + 1);
        }
      }, paginaConfig.tempoTransicao);
      return () => clearTimeout(timer);
    }
  }, [paginaAtual]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const offsetX = (clientX / innerWidth - 0.5) * 2;
      const offsetY = (clientY / innerHeight - 0.5) * 2;
      setMouseOffset({ x: offsetX, y: offsetY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina >= 1 && novaPagina <= paginasConfig.length && novaPagina !== paginaAtual) {
      setTransicaoAtiva(true);
      setTimeout(() => {
        setPaginaAtual(novaPagina);
        setTransicaoAtiva(false);
      }, 500);
    }
  };

  const avancarPagina = () => {
    if (paginaAtual < paginasConfig.length) {
      mudarPagina(paginaAtual + 1);
    }
  };

  const handleAutoPageClick = () => {
    const paginaConfig = paginasConfig.find(p => p.id === paginaAtual);
    if (paginaConfig?.tipo === 'auto') {
      avancarPagina();
    }
  };

  const renderizarEstrelas = () => (
    <div className="estrelas-fundo" style={{ '--offsetX': mouseOffset.x, '--offsetY': mouseOffset.y } as React.CSSProperties}>
      {[...Array(100)].map((_, i) => <div key={i} className="estrela" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${2 + Math.random() * 3}s` }} />)}
    </div>
  );

  const renderizarPlanetas = () => (
    <div className="planetas-container" style={{ '--offsetX': mouseOffset.x, '--offsetY': mouseOffset.y } as React.CSSProperties}>
      <div className="planeta p1"></div>
      <div className="planeta p2"></div>
    </div>
  );

  // Renderizar camadas de aurora com blur
  const renderizarAurora = () => (
    <div className="aurora-container">
      <div className="aurora-layer aurora-layer-1"></div>
      <div className="aurora-layer aurora-layer-2"></div>
      <div className="aurora-layer aurora-layer-3"></div>
      <div className="aurora-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="aurora-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderizarNavegacao = () => (
    <div className="navegacao-dots-container">
      {paginasConfig.map((pagina) => (
        <div key={pagina.id} className={`nav-dot ${pagina.id === paginaAtual ? 'ativo' : ''}`} onClick={() => mudarPagina(pagina.id)} />
      ))}
    </div>
  );

  const renderizarLayoutFoto = (pagina: PaginaConfig) => (
    <div className="layout-foto">
      {/* Adicionamos uma 'key' única ao card da foto para forçar a re-animação */}
      <div className="card-foto" key={`card-${pagina.id}`}>
        <img src={pagina.imagem} alt={pagina.titulo} className="imagem-capitulo" />
      </div>
      {/* Adicionamos também uma 'key' ao container de texto */}
      <div className="texto-capitulo-container" key={`texto-${pagina.id}`}>
        {pagina.capitulo && <p className="numero-capitulo">{pagina.capitulo}</p>}
        <h2 className="titulo-capitulo">{pagina.titulo}</h2>
        <p className="descricao-capitulo">{pagina.texto}</p>
      </div>
    </div>
  );

  const renderizarLayoutMusica = (pagina: PaginaConfig) => (
    <div className="layout-musica">
      <h1 className="titulo-animado" style={{ ...estiloTextoPrincipal, textAlign: 'center' }}>{pagina.titulo}</h1>
      <div className="player-container">
        <div className="video-wrapper">
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${pagina.youtube?.videoId}?autoplay=0&controls=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
      <p className="texto-rodape-musica">{pagina.textoRodape}</p>
    </div>
  );

  const renderizarConteudo = () => {
    const pagina = paginasConfig.find(p => p.id === paginaAtual);
    if (!pagina) return null;

    switch (pagina.layout) {
      case 'foto': return renderizarLayoutFoto(pagina);
      case 'musica': return renderizarLayoutMusica(pagina);
      case 'contador-especial':
        return (
          <div style={{ textAlign: 'center' }}>
            {pagina.planetas && renderizarPlanetas()}
            <h1 className="titulo-animado" style={{ ...estiloTextoPrincipal, color: 'white', background: 'none', WebkitTextFillColor: 'initial' }}>
              {pagina.contador?.texto}
            </h1>
            <div className="contador-container">
              {Object.entries(contadorTempo).map(([unidade, valor]) => (
                <div key={unidade} className="contador-item especial">
                  <span className="contador-valor">{valor}</span>
                  <span className="contador-label">{unidade}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'texto-com-data':
      case 'texto-simples':
        return (
          <div style={{ textAlign: 'center', padding: '2.5rem' }}>
            {pagina.data && <p className="data-texto">{pagina.data}</p>}
            <div style={{ animation: 'emergeFromMist 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}>
              <p style={{ ...estiloTextoPrincipal, lineHeight: 1.3 }}>
                {pagina.texto}
              </p>
            </div>
          </div>
        );

      case 'final':
        return (
          <div className="layout-final">
            <h1 className="titulo-animado" style={{ ...estiloTextoPrincipal, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{pagina.titulo}</h1>
            <p className="descricao-final">{pagina.texto}</p>
            <p className="contador-final-label">{pagina.contador?.texto}</p>
            <div className="contador-container">
              {Object.entries(contadorTempo).map(([unidade, valor]) => (
                <div key={unidade} className="contador-item final">
                  <span className="contador-valor">{valor}</span>
                  <span className="contador-label">{unidade}</span>
                </div>
              ))}
            </div>
            <button className="botao-compartilhar">Para sempre juntos ❤️</button>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center' }}>
            <h1 className="titulo-animado" style={{ ...estiloTextoPrincipal, color: 'white', background: 'none', WebkitTextFillColor: 'initial' }}>{pagina.titulo}</h1>
            <h2 className="subtitulo-principal">{pagina.subtitulo}</h2>
          </div>
        );
    }
  };

  const paginaConfig = paginasConfig.find(p => p.id === paginaAtual);

  return (
    <main
      className={`app-container ${paginaConfig?.aurora ? 'fundo-aurora' : ''}`}
      style={{
        padding: 0,
        background: paginaConfig?.aurora ? 'none' : (paginaConfig?.corFundo || '#000')
      }}
    >
      {paginaConfig?.aurora && renderizarAurora()}
      {renderizarNavegacao()}
      <div className={`conteudo-pagina ${transicaoAtiva ? 'saindo' : 'entrando'}`} onClick={handleAutoPageClick}>
        {paginaConfig?.estrelas && renderizarEstrelas()}
        {renderizarConteudo()}
        {paginaConfig?.tipo === 'manual' && paginaAtual < paginasConfig.length && (
          <div className="seta-container" onClick={avancarPagina}>
            <ChevronDown size={32} />
          </div>
        )}
      </div>

      <style>{`
        .app-container { 
          height: 100vh; 
          width: 100%; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center; 
          text-align: center; 
          padding: 1.5rem; 
          position: relative; 
          overflow: hidden; 
          z-index: 1; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          color: white; 
          transition: background 0.8s ease; 
        }
        
        /* FUNDO AURORA MELHORADO COM BLUR E CAMADAS */
        .fundo-aurora {
          background: radial-gradient(circle at 20% 30%, #1a0229 0%, #0d051a 100%);
        }

        .aurora-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .aurora-layer {
          position: absolute;
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          opacity: 0.8;
          mix-blend-mode: screen;
          filter: blur(40px);
          animation: auroraFlow 25s ease-in-out infinite;
        }

        .aurora-layer-1 {
          background: radial-gradient(ellipse 800px 400px at 30% 20%, 
            hsla(284, 80%, 60%, 0.6) 0%, 
            hsla(340, 75%, 55%, 0.4) 30%, 
            transparent 70%);
          animation-delay: 0s;
        }

        .aurora-layer-2 {
          background: radial-gradient(ellipse 600px 300px at 70% 80%, 
            hsla(240, 70%, 65%, 0.5) 0%, 
            hsla(300, 80%, 50%, 0.3) 40%, 
            transparent 70%);
          animation-delay: -8s;
          animation-duration: 30s;
        }

        .aurora-layer-3 {
          background: radial-gradient(ellipse 1000px 200px at 50% 60%, 
            hsla(320, 90%, 55%, 0.4) 0%, 
            hsla(260, 70%, 60%, 0.2) 50%, 
            transparent 80%);
          animation-delay: -15s;
          animation-duration: 35s;
          filter: blur(60px);
        }

        @keyframes auroraFlow {
          0%, 100% { 
            transform: translateX(-20%) translateY(-10%) rotate(0deg) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateX(10%) translateY(-20%) rotate(2deg) scale(1.1);
            opacity: 0.8;
          }
          50% { 
            transform: translateX(20%) translateY(10%) rotate(-1deg) scale(0.9);
            opacity: 0.7;
          }
          75% { 
            transform: translateX(-10%) translateY(20%) rotate(1deg) scale(1.05);
            opacity: 0.9;
          }
        }

        .aurora-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .aurora-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, 
            hsla(300, 100%, 80%, 0.8) 0%, 
            hsla(280, 100%, 70%, 0.4) 50%, 
            transparent 100%);
          border-radius: 50%;
          filter: blur(2px);
          animation: floatParticle linear infinite;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }

        .conteudo-pagina { 
          z-index: 10; 
          position: relative; 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center; 
          cursor: pointer; 
        }
        
        .conteudo-pagina.entrando { 
          animation: fadeIn 0.8s ease forwards; 
        }
        
        .conteudo-pagina.saindo { 
          animation: fadeOut 0.5s ease forwards; 
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        @keyframes emergeFromMist { from { opacity: 0; transform: scale(0.85); filter: blur(12px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }
        
        .titulo-animado, .subtitulo-principal, .data-texto, .texto-rodape-musica { 
          animation: slideUp 1s ease-out forwards; 
          text-shadow: 0 0 20px rgba(156, 39, 176, 0.5), 0 0 40px rgba(233, 30, 99, 0.3);
        }
        
        .subtitulo-principal { animation-delay: 0.2s; opacity: 0; }
        .seta-container { position: absolute; bottom: 2rem; cursor: pointer; animation: bounce 2s infinite; color: rgba(255,255,255,0.7); transition: color 0.3s ease; z-index: 50; }
        .seta-container:hover { color: #e91e63; }
        .estrelas-fundo, .planetas-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; transition: transform 0.2s ease-out; }
        .estrelas-fundo { transform: translate(calc(var(--offsetX, 0) * -15px), calc(var(--offsetY, 0) * -15px)); }
        .planetas-container { transform: translate(calc(var(--offsetX, 0) * 20px), calc(var(--offsetY, 0) * 20px)); }
        .estrela { position: absolute; background-color: rgba(255,255,255,0.8); border-radius: 50%; width: 2px; height: 2px; animation: piscar linear infinite; }
        @keyframes piscar { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        .planeta { border-radius: 50%; position: absolute; animation: float 6s ease-in-out infinite; }
        .planeta.p1 { width: 80px; height: 80px; background: linear-gradient(135deg, #ff9500 0%, #ff6b35 100%); top: 15%; right: 10%; box-shadow: 0 0 30px rgba(255, 149, 0, 0.5); }
        .planeta.p2 { width: 40px; height: 40px; background: linear-gradient(135deg, #00bcd4 0%, #2196f3 100%); top: 60%; left: 15%; box-shadow: 0 0 20px rgba(0, 188, 212, 0.5); animation-direction: reverse; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .subtitulo-principal { font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 400; color: rgba(255,255,255,0.9); }
        .data-texto { font-size: clamp(1rem, 2.5vw, 1.2rem); color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; }
        .layout-musica { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 500px; cursor: default; }
        .player-container { width: 100%; margin: 1rem 0; background: #181818; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 1rem; }
        .video-wrapper { position: relative; padding-top: 56.25%; border-radius: 8px; overflow: hidden; }
        .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .texto-rodape-musica { font-size: clamp(0.9rem, 2vw, 1rem); color: rgba(255,255,255,0.8); font-style: italic; margin-top: 1rem; opacity: 0; animation-delay: 0.4s; }
        .layout-foto { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; cursor: default; }
.card-foto { 
  position: relative; 
  width: 90%; 
  max-width: 380px; 
  border-radius: 20px; 
  box-shadow: 0 15px 40px rgba(0,0,0,0.6); 
  overflow: hidden; 
  opacity: 0; 
  animation: zoomIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; 
  transition: transform 0.4s ease, box-shadow 0.4s ease; 
}        .card-foto:hover { transform: translateY(-10px) scale(1.03); box-shadow: 0 25px 50px rgba(0,0,0,0.7); }
        .imagem-capitulo { display: block; width: 100%; height: 450px; object-fit: cover; }

.texto-capitulo-container { 
  background: rgba(28, 28, 28, 0.9); 
  backdrop-filter: blur(10px); 
  width: 90%; 
  max-width: 380px; 
  border-radius: 20px; 
  padding: 1.5rem; 
  margin-top: -60px; 
  padding-top: 2rem; 
  z-index: 20; 
  position: relative; 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  opacity: 0; 
  animation: slideUpFromBottom 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards 0.3s; 
}        .numero-capitulo { font-size: 0.9rem; color: #e91e63; font-weight: 600; text-transform: uppercase; margin: 0 0 0.5rem 0; }
        .titulo-capitulo { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 700; margin: 0 0 0.8rem 0; color: #FFFFFF; background: none; }
        .descricao-capitulo { font-size: clamp(1rem, 3vw, 1.1rem); color: rgba(255,255,255,0.9); line-height: 1.6; margin: 0; }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUpFromBottom { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        .contador-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin: 1.5rem 0; }
        .contador-item { text-align: center; padding: 1rem; border-radius: 15px; min-width: 80px; animation: slideUp 1s ease forwards; }
        .contador-item.especial { background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1)); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(15px); }
        .contador-valor { display: block; font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 700; }
        .contador-label { display: block; font-size: 0.9rem; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; }
        .layout-final { display: flex; flex-direction: column; align-items: center; cursor: default; }
        .descricao-final { font-size: clamp(1rem, 3vw, 1.3rem); color: rgba(255,255,255,0.9); margin: -0.5rem 0 1.5rem 0; max-width: 500px; }
        .contador-final-label { font-size: 1.2rem; font-weight: 500; }
        .contador-item.final { background: rgba(0,0,0,0.2); padding: 0.8rem; min-width: 70px; border-radius: 12px; }
        .botao-compartilhar { font-size: 1.1rem; font-weight: 600; color: white; background: linear-gradient(135deg, #9c27b0, #e91e63); border: none; border-radius: 50px; padding: 1rem 2.5rem; margin-top: 2rem; cursor: pointer; box-shadow: 0 5px 20px rgba(233, 30, 99, 0.4); transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .botao-compartilhar:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(233, 30, 99, 0.6); }
        .navegacao-dots-container { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 1000; }
        .nav-dot { width: 10px; height: 10px; background-color: rgba(255, 255, 255, 0.4); border-radius: 50%; cursor: pointer; transition: all 0.3s ease; }
        .nav-dot:hover { background-color: rgba(255, 255, 255, 0.8); transform: scale(1.2); }
        .nav-dot.ativo { background-color: #e91e63; transform: scale(1.4); box-shadow: 0 0 10px #e91e63; }
      `}</style>
    </main>
  );
}

export default App;