// Dados simulados
const startups = [
  {
    nome: 'XYZ Solutions',
    descricao:
      'XYZ Solutions Plataforma que utiliza IoT e IA para monitorar consumo energético e reduzir custos em pequenas e médias empresas.',
    tecnologias: ['IoT', 'IA'],
    segmento: 'tecnologia',
    imagem: '/imagens/xyz.png',
    link: 'startup.html',
  },
  {
    nome: 'ABConnect',
    descricao:
      'Saúde Digital Aplicativo de telemedicina que conecta pacientes a médicos especialistas, com suporte a prontuário eletrônico.',
    tecnologias: ['Cloud', 'Machine Learning'],
    segmento: 'saúde',
    imagem: '/imagens/abconnect.png',
    link: '#',
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
      <div style="width:634px;min-height:316px;background:#fff;border-radius:20px;border:1px solid #BFBFBF;margin-bottom:32px;padding:28px;box-sizing:border-box;display:flex;flex-direction:column;">
        <div style="display:flex;align-items:center;gap:28px;">
          <img style="width:200px;height:200px;border-radius:16px;object-fit:cover;" src="${
            s.imagem
          }" />
          <div style="width:348px;display:flex;flex-direction:column;gap:8px;">
            <div style="color:#465EFF;font-size:24px;font-weight:600;">${
              s.nome
            }</div>
            <div style="color:#535353;font-size:18px;">${
              s.segmento.charAt(0).toUpperCase() + s.segmento.slice(1)
            }</div>
            <div style="color:#535353;font-size:18px;">${s.descricao}</div>
            <div style="display:flex;gap:13px;">
              ${s.tecnologias
                .map(
                  (t) => `
                <div style="min-width:68px;height:35px;padding:3px 19px;background:#FEFEFE;border-radius:10px;outline:1px solid #535353;display:flex;align-items:center;justify-content:center;color:#535353;font-size:16px;font-weight:500;">${t}</div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
        <div style="width:100%;height:27px;text-align:right;display:flex;align-items:center;justify-content:flex-end;color:#535353;font-size:14px;font-weight:500;text-decoration:underline;cursor:pointer;"> <a href="${
          s.link
        }" style="color:inherit;text-decoration:inherit;">Saber mais</a></div>
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
