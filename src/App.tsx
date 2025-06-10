import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

// =============================================================================
// INTERFACE DE TIPAGEM PARA AS PÁGINAS
// =============================================================================
// Documentação:
// A propriedade `corFundo` foi alterada para opcional (`corFundo?: string;`)
// para permitir que algumas páginas não a definam.
interface PaginaConfig {
  id: number;
  tipo: "auto" | "manual";
  layout: string;
  corFundo?: string; // <-- CORREÇÃO APLICADA AQUI
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


// =============================================================================
// CONFIGURAÇÃO DAS PÁGINAS DA RETROSPECTIVA
// =============================================================================
// Documentação:
// Nenhuma alteração necessária aqui. A correção na interface já resolve o problema.
const paginasConfig: PaginaConfig[] = [
  {
    id: 1,
    tipo: "auto",
    tempoTransicao: 4000,
    titulo: "Nossa História",
    subtitulo: "Uma jornada de amor e momentos inesquecíveis",
    corFundo: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    estrelas: true,
    layout: "titulo-principal"
  },
  {
    id: 2,
    tipo: "auto",
    tempoTransicao: 4000,
    data: "9 de fevereiro de 1999",
    texto: "Alguns encontros mudam nossas vidas para sempre...",
    corFundo: "#000",
    estrelas: true,
    layout: "texto-com-data"
  },
  {
    id: 3,
    tipo: "auto",
    tempoTransicao: 4000,
    texto: "Cada momento ao seu lado é uma memória eterna...",
    corFundo: "#000",
    estrelas: true,
    layout: "texto-simples"
  },
  {
    id: 4,
    tipo: "auto",
    tempoTransicao: 4000,
    texto: "Nossa história é feita de pequenos instantes mágicos...",
    corFundo: "#000",
    estrelas: true,
    layout: "texto-simples"
  },
  {
    id: 5,
    tipo: "auto",
    tempoTransicao: 4000,
    texto: "Deslize para reviver nossa jornada juntos...",
    corFundo: "#000",
    estrelas: true,
    layout: "texto-simples"
  },
  {
    id: 6,
    tipo: "auto",
    tempoTransicao: 5000,
    contador: {
      dataInicio: "1999-02-09T00:00:00",
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
      videoId: "pRpeEdMmmQ0", // Exemplo: All of Me - John Legend
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
    imagem: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "foto",
    capitulo: "Capítulo 1"
  },
  {
    id: 9,
    tipo: "manual",
    titulo: "Nossa Primeira Viagem",
    texto: "Descobrindo novos lugares e criando memórias inesquecíveis juntos.",
    imagem: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "foto",
    capitulo: "Capítulo 2"
  },
  {
    id: 10,
    tipo: "manual",
    titulo: "Momentos Especiais",
    texto: "Cada sorriso, cada abraço, cada momento ao seu lado é um tesouro eterno.",
    imagem: "https://images.pexels.com/photos/3290073/pexels-photo-3290073.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "foto",
    capitulo: "Capítulo 3"
  },
  {
    id: 11,
    tipo: "manual",
    titulo: "Momentos Atuais",
    texto: "Continuando nossa jornada de amor, construindo um futuro cheio de felicidade juntos.",
    imagem: "https://images.pexels.com/photos/1758531/pexels-photo-1758531.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "foto",
    capitulo: "Capítulo 4",
    corTituloCapitulo: 'linear-gradient(135deg, #2193b0, #6dd5ed)' // Cor azulada como na imagem
  },
  {
    id: 12,
    tipo: "manual",
    titulo: "Nossa História Continua...",
    texto: "Cada dia é uma nova oportunidade de escrever mais um capítulo juntos.",
    contador: {
      dataInicio: "1999-02-09T00:00:00",
      texto: "Dias lado a lado:"
    },
    corFundo: "linear-gradient(to bottom, #9c27b033, #000000)",
    layout: "final"
  }
];

// Estilo de texto padrão (gradiente roxo/rosa)
const estiloTextoPrincipal: React.CSSProperties = {
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  fontWeight: 700,
  marginBottom: '1rem',
  background: 'linear-gradient(135deg, #9c27b0, #e91e63)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'slideUp 0.8s ease forwards',
};


// =============================================================================
// COMPONENTE PRINCIPAL DA APLICAÇÃO
// =============================================================================
function App() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [transicaoAtiva, setTransicaoAtiva] = useState(false);
  const [contadorTempo, setContadorTempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  // =============================================================================
  // FUNÇÃO PARA CALCULAR TEMPO DECORRIDO EM TEMPO REAL
  // =============================================================================
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

  // =============================================================================
  // EFEITO PARA ATUALIZAR CONTADOR EM TEMPO REAL
  // =============================================================================
  // Documentação:
  // Corrigimos o erro 'possibly 'undefined'' guardando `dataInicio` em uma
  // constante antes de usá-la.
  useEffect(() => {
    const paginaConfig = paginasConfig.find(p => p.id === paginaAtual);
    const dataInicio = paginaConfig?.contador?.dataInicio; // <-- Armazena o valor aqui

    if (dataInicio) { // <-- Verifica se o valor existe
      const interval = setInterval(() => {
        setContadorTempo(calcularTempoDecorrido(dataInicio)); // <-- Usa a constante segura
      }, 1000);
      
      setContadorTempo(calcularTempoDecorrido(dataInicio)); // <-- Usa a constante segura
      
      return () => clearInterval(interval);
    }
  }, [paginaAtual, calcularTempoDecorrido]);

  // =============================================================================
  // EFEITO PARA TRANSIÇÃO AUTOMÁTICA ENTRE PÁGINAS
  // =============================================================================
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

  // =============================================================================
  // FUNÇÃO PARA MUDAR DE PÁGINA COM TRANSIÇÃO SUAVE
  // =============================================================================
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

  // =============================================================================
  // COMPONENTES DE RENDERIZAÇÃO - EFEITOS VISUAIS
  // =============================================================================
  const renderizarEstrelas = () => (
    <div className="estrelas-fundo">
      {[...Array(100)].map((_, i) => <div key={i} className="estrela" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${2 + Math.random() * 3}s` }} />)}
    </div>
  );

  const renderizarPlanetas = () => (
    <div className="planetas-container">
      <div className="planeta p1"></div>
      <div className="planeta p2"></div>
    </div>
  );

  // =============================================================================
  // RENDERIZAÇÃO DE LAYOUT PARA PÁGINAS COM FOTOS/CAPÍTULOS
  // =============================================================================
  const renderizarLayoutFoto = (pagina: PaginaConfig) => (
    <div className="layout-foto">
      <div className="card-foto">
        <img
          src={pagina.imagem}
          alt={pagina.titulo}
          className="imagem-capitulo"
        />
      </div>
      <div className="texto-capitulo-container">
        {pagina.capitulo && <p className="numero-capitulo">{pagina.capitulo}</p>}
        <h2 className="titulo-capitulo" style={{ background: pagina.corTituloCapitulo || 'linear-gradient(135deg, #9c27b0, #e91e63)' }}>
          {pagina.titulo}
        </h2>
        <p className="descricao-capitulo">{pagina.texto}</p>
      </div>
    </div>
  );

  // =============================================================================
  // RENDERIZAÇÃO DE LAYOUT PARA PÁGINA DE MÚSICA
  // =============================================================================
  const renderizarLayoutMusica = (pagina: PaginaConfig) => (
    <div className="layout-musica">
      <h1 style={{ ...estiloTextoPrincipal, textAlign: 'center' }}>{pagina.titulo}</h1>
      <div className="player-container">
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${pagina.youtube?.videoId}?autoplay=0&controls=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>
      <p className="texto-rodape-musica">{pagina.textoRodape}</p>
    </div>
  );

  // =============================================================================
  // FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO DE CONTEÚDO
  // =============================================================================
  const renderizarConteudo = () => {
    const pagina = paginasConfig.find(p => p.id === paginaAtual);
    if (!pagina) return null;

    switch (pagina.layout) {
      case 'foto':
        return renderizarLayoutFoto(pagina);

      case 'musica':
        return renderizarLayoutMusica(pagina);

      case 'contador-especial':
        return (
          <div style={{ textAlign: 'center' }}>
            {pagina.planetas && renderizarPlanetas()}
            <h1 style={{ ...estiloTextoPrincipal, color: 'white', background: 'none', WebkitTextFillColor: 'initial' }}>
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
          <div style={{ textAlign: 'center' }}>
            {pagina.data && <p className="data-texto">{pagina.data}</p>}
            <p style={{ ...estiloTextoPrincipal, lineHeight: 1.3 }}>{pagina.texto}</p>
          </div>
        );

      case 'final':
        return (
          <div className="layout-final">
            <h1 style={{ ...estiloTextoPrincipal, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{pagina.titulo}</h1>
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
            <h1 style={{ ...estiloTextoPrincipal, color: 'white', background: 'none', WebkitTextFillColor: 'initial' }}>{pagina.titulo}</h1>
            <h2 className="subtitulo-principal">{pagina.subtitulo}</h2>
          </div>
        );
    }
  };

  // =============================================================================
  // RENDERIZAÇÃO PRINCIPAL DO COMPONENTE
  // =============================================================================
  const paginaConfig = paginasConfig.find(p => p.id === paginaAtual);

  return (
    <main className="app-container" style={{ background: paginaConfig?.corFundo || 'linear-gradient(to bottom, #9c27b033, #000000)' }}>
      <div className={`conteudo-pagina ${transicaoAtiva ? 'saindo' : 'entrando'}`}>

        {paginaConfig?.estrelas && renderizarEstrelas()}

        {renderizarConteudo()}

        {paginaConfig?.tipo === 'manual' && paginaAtual < paginasConfig.length && (
          <div className="seta-container" onClick={avancarPagina}>
            <ChevronDown size={32} />
          </div>
        )}
      </div>

      {/* Folha de Estilos CSS embutida */}
      <style>{`
        /* --- Estilização Geral e Animações --- */
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

        .conteudo-pagina {
          z-index: 10;
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .conteudo-pagina.entrando {
          animation: fadeIn 0.8s ease forwards;
        }

        .conteudo-pagina.saindo {
          animation: fadeOut 0.5s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .seta-container {
          position: absolute;
          bottom: 2rem;
          cursor: pointer;
          animation: bounce 2s infinite;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
        }
        .seta-container:hover {
          color: #e91e63;
        }

        /* --- Estrelas e Planetas --- */
        .estrelas-fundo { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        .estrela { position: absolute; background-color: rgba(255,255,255,0.8); border-radius: 50%; width: 2px; height: 2px; animation: piscar linear infinite; }
        @keyframes piscar { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        
        .planetas-container { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 5; overflow: hidden; }
        .planeta { border-radius: 50%; position: absolute; animation: float 6s ease-in-out infinite; }
        .planeta.p1 { width: 80px; height: 80px; background: linear-gradient(135deg, #ff9500 0%, #ff6b35 100%); top: 15%; right: 10%; box-shadow: 0 0 30px rgba(255, 149, 0, 0.5); }
        .planeta.p2 { width: 40px; height: 40px; background: linear-gradient(135deg, #00bcd4 0%, #2196f3 100%); top: 60%; left: 15%; box-shadow: 0 0 20px rgba(0, 188, 212, 0.5); animation-direction: reverse; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        
        /* --- Layouts de Texto --- */
        .subtitulo-principal { font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 400; color: rgba(255,255,255,0.9); animation: slideUp 0.8s ease forwards 0.2s; opacity: 0; }
        .data-texto { font-size: clamp(1rem, 2.5vw, 1.2rem); color: rgba(255,255,255,0.8); margin-bottom: 1.5rem; animation: slideUp 0.8s ease forwards; }

        /* --- Layout de Música --- */
        .layout-musica { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 500px; }
        .player-container { width: 100%; margin: 1rem 0; background: #181818; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 1rem; }
        .video-wrapper { position: relative; padding-top: 56.25%; /* 16:9 Aspect Ratio */ border-radius: 8px; overflow: hidden; }
        .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .texto-rodape-musica { font-size: clamp(0.9rem, 2vw, 1rem); color: rgba(255,255,255,0.8); font-style: italic; margin-top: 1rem; animation: slideUp 0.8s ease forwards 0.4s; opacity: 0; }

        /* --- Layout de Foto (Capítulos) --- */
        .layout-foto { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; animation: fadeIn 0.8s ease; }
        .card-foto { position: relative; width: 90%; max-width: 380px; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.6); overflow: hidden; animation: slideUp 0.8s ease forwards; }
        .imagem-capitulo { display: block; width: 100%; height: 450px; object-fit: cover; }
        .texto-capitulo-container { background: rgba(28, 28, 28, 0.9); backdrop-filter: blur(10px); width: 90%; max-width: 380px; border-radius: 20px; padding: 1.5rem; margin-top: -50px; z-index: 20; position: relative; animation: slideUp 0.8s ease forwards 0.2s; opacity: 0; }
        .numero-capitulo { font-size: 0.9rem; color: #e91e63; font-weight: 600; text-transform: uppercase; margin: 0 0 0.5rem 0; }
        .titulo-capitulo { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 700; margin: 0 0 0.8rem 0; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .descricao-capitulo { font-size: clamp(1rem, 3vw, 1.1rem); color: rgba(255,255,255,0.9); line-height: 1.6; margin: 0; }

        /* --- Contador --- */
        .contador-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin: 1.5rem 0; }
        .contador-item { text-align: center; padding: 1rem; border-radius: 15px; min-width: 80px; animation: slideUp 0.8s ease forwards; }
        .contador-item.especial { background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1)); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(15px); }
        .contador-valor { display: block; font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 700; }
        .contador-label { display: block; font-size: 0.9rem; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; }

        /* --- Layout Final --- */
        .layout-final { display: flex; flex-direction: column; align-items: center; }
        .descricao-final { font-size: clamp(1rem, 3vw, 1.3rem); color: rgba(255,255,255,0.9); margin: -0.5rem 0 1.5rem 0; max-width: 500px; }
        .contador-final-label { font-size: 1.2rem; font-weight: 500; }
        .contador-item.final { background: rgba(0,0,0,0.2); padding: 0.8rem; min-width: 70px; border-radius: 12px; }
        .botao-compartilhar { font-size: 1.1rem; font-weight: 600; color: white; background: linear-gradient(135deg, #9c27b0, #e91e63); border: none; border-radius: 50px; padding: 1rem 2.5rem; margin-top: 2rem; cursor: pointer; box-shadow: 0 5px 20px rgba(233, 30, 99, 0.4); transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .botao-compartilhar:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(233, 30, 99, 0.6); }

      `}</style>
    </main>
  );
}

export default App;