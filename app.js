// Dados simulados
const startups = [
  {
    nome: 'XYZ Solutions',
    descricao:
      'XYZ Solutions Plataforma que utiliza IoT e IA para monitorar consumo energético e reduzir custos em pequenas e médias empresas.',
    tecnologias: ['IoT', 'IA', 'Cloud Computing'],
    segmento: 'tecnologia',
    imagem: '/imagens/xyz.png',
  },
  {
    nome: 'ABConnect',
    descricao:
      'Saúde Digital Aplicativo de telemedicina que conecta pacientes a médicos especialistas, com suporte a prontuário eletrônico.',
    tecnologias: ['Cloud', 'Machine Learning'],
    segmento: 'saúde',
    imagem: '/imagens/abconnect1.png',
  },
];

// Renderizar lista inicial
window.onload = () => render(startups);

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

// ===== ACESSIBILIDADE =====

// Aumentar fonte
document.getElementById('btnAumentar').onclick = () => {
  document.body.style.fontSize = 'larger';
};

// Libras (simulação)
document.getElementById('btnLibras').onclick = () => {
  alert('Plugin de Libras ativado (simulação).');
};

// Leitor de áudio
document.getElementById('btnAudio').onclick = () => {
  let texto = document.body.innerText;
  let speech = new SpeechSynthesisUtterance(texto);
  speech.lang = 'pt-BR';
  speechSynthesis.speak(speech);
};
