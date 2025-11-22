// Dados simulados
const startups = [
  {
    nome: 'XYZ Solutions',
    descricao:
      'XYZ Solutions Plataforma que utiliza IoT e IA para monitorar consumo energético e reduzir custos em pequenas e médias empresas.',
    tecnologias: ['IoT', 'IA', 'Cloud Computing'],
    segmento: 'tecnologia',
    imagem: '/imagens/xyz.png',
    link: 'startup.html',
    pitch:
      'A XYZ Solutions é uma plataforma inteligente que combina IoT e Inteligência Artificial para monitorar em tempo real o consumo energético de pequenas e médias empresas. Nossa solução identifica padrões de uso, prevê picos de demanda e sugere ações personalizadas para reduzir custos e aumentar a eficiência energética, ajudando negócios a economizarem até 30% na conta de energia.',
    razaoSocial: 'XYZ Solutions Tecnologia Sustentável Ltda.',
    nomeFantasia: 'XYZ Solutions',
    cnpj: '45.987.321/0001-09',
    fundacao: '03/10/2025',
    modeloNegocio: 'SaaS',
    links: {
      site: '#',
      linkedin: '#',
      whatsapp: '#',
      pitchdesk: '#',
    },
  },
  {
    nome: 'ABConnect',
    descricao:
      'Saúde Digital Aplicativo de telemedicina que conecta pacientes a médicos especialistas, com suporte a prontuário eletrônico.',
    tecnologias: ['Cloud', 'Machine Learning'],
    segmento: 'saúde',
    imagem: '/imagens/abconnect1.png',
    link: '#',
    pitch:
      'A ABConnect conecta pacientes a médicos especialistas via telemedicina, com suporte a prontuário eletrônico e recursos avançados de saúde digital.',
    razaoSocial: 'ABConnect Saúde Digital Ltda.',
    nomeFantasia: 'ABConnect',
    cnpj: '12.345.678/0001-99',
    fundacao: '15/04/2024',
    modeloNegocio: 'Marketplace',
    links: {
      site: '#',
      linkedin: '#',
      whatsapp: '#',
      pitchdesk: '#',
    },
  },
];
// Função para obter o nome da startup via query string
function getStartupNome() {
  const params = new URLSearchParams(window.location.search);
  return params.get('nome');
}

// Renderizar condicionalmente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('resultados')) {
    render(startups);
  }

  if (document.getElementById('conteudo-detalhe')) {
    renderDetalhe();
  }

  // ===== ACESSIBILIDADE =====
  const btnAumentar = document.getElementById('btnAumentar');
  if (btnAumentar) {
    btnAumentar.onclick = () => {
      document.body.style.fontSize = 'larger';
    };
  }

  const btnLibras = document.getElementById('btnLibras');
  if (btnLibras) {
    btnLibras.onclick = () => {
      alert('Plugin de Libras ativado (simulação).');
    };
  }

  const btnAudio = document.getElementById('btnAudio');
  if (btnAudio) {
    btnAudio.onclick = () => {
      let texto = document.body.innerText;
      let speech = new SpeechSynthesisUtterance(texto);
      speech.lang = 'pt-BR';
      speechSynthesis.speak(speech);
    };
  }

  // Proxy do botão VLibras: quando o botão customizado for clicado,
  // acionamos o botão do plugin (elemento com atributo `vw-access-button`).
  const btnVlibrasCustom = document.querySelector('.btn-vlibras');
  function attemptClickVlibras() {
    const vlBtn = document.querySelector('[vw-access-button]');
    if (vlBtn) {
      try {
        vlBtn.click();
        return true;
      } catch (e) {
        console.warn('Erro ao clicar no botão VLibras', e);
      }
    }
    return false;
  }
  if (btnVlibrasCustom) {
    function handleCustomVlibrasActivation(e) {
      if (e && e.preventDefault) e.preventDefault();
      console.debug('Custom VLibras button activated', {
        page: location.pathname,
      });
      // tenta imediatamente; se não existir ainda, faz retries
      if (!attemptClickVlibras()) {
        let retries = 0;
        const maxRetries = 50; // ~10s com intervalo 200ms
        const interval = setInterval(() => {
          const found = attemptClickVlibras();
          retries++;
          console.debug('VLibras retry', { retries, found });
          if (found || retries >= maxRetries) {
            clearInterval(interval);
            if (!found) {
              console.warn(
                'Botão VLibras não encontrado após várias tentativas.'
              );
            }
          }
        }, 200);
      }
    }

    btnVlibrasCustom.addEventListener('click', handleCustomVlibrasActivation);
    // Accessibility: activate with Enter or Space when focused
    btnVlibrasCustom.setAttribute('tabindex', '0');
    btnVlibrasCustom.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleCustomVlibrasActivation(e);
      }
    });
  }
});

// Render function
function render(lista) {
  const area = document.getElementById('resultados');
  area.innerHTML = '';
  lista.forEach((s) => {
    area.innerHTML += `
      <div class="card-resultado">
        <div class="card-resultado-topo">
          <img class="card-resultado-img" src="${s.imagem}" />
          <div class="card-resultado-info">
            <div class="card-resultado-nome">${s.nome}</div>
            <div class="card-resultado-segmento">${
              s.segmento.charAt(0).toUpperCase() + s.segmento.slice(1)
            }</div>
            <div class="card-resultado-descricao">${s.descricao}</div>
            <div class="card-resultado-tecnologias">
              ${s.tecnologias
                .map((t) => `<div class="card-resultado-tec">${t}</div>`)
                .join('')}
            </div>
          </div>
        </div>
        <div class="card-resultado-link">
          <a href="detalhamento.html?nome=${encodeURIComponent(
            s.nome
          )}">Saber mais</a>
        </div>
      </div>
    `;
  });
}

// Busca por texto
function buscar() {
  let texto = document.getElementById('searchInput').value.toLowerCase();
  let filtradas = startups.filter(
    (s) =>
      s.nome.toLowerCase().includes(texto) ||
      s.descricao.toLowerCase().includes(texto)
  );
  render(filtradas);
}

// Aplicar filtros
function aplicarFiltros() {
  let selecionados = [...document.querySelectorAll('.filtro-seg:checked')].map(
    (i) => i.value
  );
  let filtradas = startups.filter((s) => selecionados.includes(s.segmento));
  render(filtradas);
}

// Limpar
function limparFiltros() {
  document.querySelectorAll('.filtro-seg').forEach((i) => (i.checked = false));
  render(startups);
}

// (Handlers movidos para o listener de DOMContentLoaded)

function renderDetalhe() {
  const nome = getStartupNome();
  const startup = startups.find((s) => s.nome === nome) || startups[0];
  const el = document.getElementById('conteudo-detalhe');
  el.innerHTML = `
    <section class="detalhe-main">
      <a href="index.html" class="detalhe-voltar">
        <span style="font-size:2rem;vertical-align:middle;">&#8592;</span> Voltar
      </a>
      <h2 class="detalhe-nome">${startup.nome}</h2>
      <div class="detalhe-img-descricao">
        <div class="detalhe-img-links">
          <img class="detalhe-img" src="${
            startup.imagem
          }" alt="Logo da startup" />
          <div class="detalhe-links">
            <a class="detalhe-link" href="${
              startup.links.pitchdesk
            }" target="_blank">Pitch Desk</a>
            <a class="detalhe-link" href="${
              startup.links.site
            }" target="_blank">Site</a>
            <a class="detalhe-link" href="${
              startup.links.linkedin
            }" target="_blank">Linkedin</a>
            <a class="detalhe-link" href="${
              startup.links.whatsapp
            }" target="_blank">Whatsapp</a>
          </div>
        </div>
        <p class="detalhe-descricao">${startup.descricao}</p>
      </div>
      <div class="detalhe-info-basica">
        <h3 class="detalhe-titulo">Informações básicas</h3>
        <div class="detalhe-info-grid">
          <div>
            <strong>Razão Social:</strong><br>
            <span>${startup.razaoSocial}</span>
          </div>
          <div>
            <strong>CNPJ:</strong><br>
            <span>${startup.cnpj}</span>
          </div>
          <div>
            <strong>Nome fantasia:</strong><br>
            <span>${startup.nomeFantasia}</span>
          </div>
          <div>
            <strong>Data de fundação:</strong><br>
            <span>${startup.fundacao}</span>
          </div>
        </div>
      </div>
      <div class="detalhe-sobre">
        <h3 class="detalhe-titulo">Sobre a startup</h3>
        <div class="detalhe-sobre-grid">
          <div class="detalhe-sobre-esquerda">
            <strong>Pitch:</strong>
            <p>${startup.pitch}</p>
          </div>
          <div class="detalhe-sobre-direita">
            <div>
              <strong>Modelo de Negócios:</strong><br>
              <span>${startup.modeloNegocio}</span>
            </div>
            <div>
              <strong>Tecnologias utilizadas:</strong>
              <div class="detalhe-tecnologias">
                ${startup.tecnologias
                  .map((t) => `<span class="detalhe-tec">${t}</span>`)
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// A renderização de detalhe também é chamada condicionalmente no DOMContentLoaded
