const botaoMenu = document.querySelector(".menu-mobile");
const navMenu = document.querySelector(".nav-menu");
const linksMenu = document.querySelectorAll(".nav-menu a");
const subtituloInicio = document.querySelector(".inicio-subtitulo");
const tituloInicio = document.querySelector(".inicio h1");
const descricaoInicio = document.querySelector(".inicio-descricao");
const header = document.querySelector(".header");
const sobreSecao = document.querySelector(".sobre");
const detalheTopo = document.querySelector(".detalhe-topo");
const detalheTitulo = document.querySelector(".detalhe-titulo");
const tecnologiasSecao = document.querySelector(".tecnologias");
const detalheTecnologiasTopo = document.querySelector(".detalhe-tecnologias-topo");
const detalheTecnologiasTitulo = document.querySelector(".detalhe-tecnologias-titulo");
const tecnologiaCards = document.querySelectorAll(".tecnologia-card");
const cursosSecao = document.querySelector(".cursos");
const detalheCursosTopo = document.querySelector(".detalhe-cursos-topo");
const detalheCursosTitulo = document.querySelector(".detalhe-cursos-titulo");
const cursoCards = document.querySelectorAll(".curso-card");
const experienciasSecao = document.querySelector(".experiencias");
const detalheExperienciasTopo = document.querySelector(".detalhe-experiencias-topo");
const detalheExperienciasTitulo = document.querySelector(".detalhe-experiencias-titulo");
const linhaProgressoExperiencias = document.querySelector(".linha-progresso");
const experienciaItens = document.querySelectorAll(".experiencia-item");
const projetosSecao = document.querySelector(".projetos");
const detalheProjetosTopo = document.querySelector(".detalhe-projetos-topo");
const detalheProjetosTitulo = document.querySelector(".detalhe-projetos-titulo");
const projetosDescricao = document.querySelector(".projetos-descricao");
const projetoCards = document.querySelectorAll(".projeto-card");
const contatoSecao = document.querySelector(".contato");
const detalheContatoTopo = document.querySelector(".detalhe-contato-topo");
const detalheContatoTitulo = document.querySelector(".detalhe-contato-titulo");
const contatoForm = document.querySelector(".contato-form");
const secoesNavbar = [
  document.querySelector(".inicio"),
  sobreSecao,
  tecnologiasSecao,
  experienciasSecao,
  projetosSecao,
  cursosSecao,
  contatoSecao,
].filter(Boolean);

botaoMenu.addEventListener("click", () => {
  navMenu.classList.toggle("ativo");
});

function atualizarLinkAtivo(hashAtual) {
  linksMenu.forEach((link) => {
    const ehAtivo = link.getAttribute("href") === hashAtual;
    link.classList.toggle("ativo-link", ehAtivo);
  });
}

function atualizarLinkAtivoPorScroll() {
  const pontoReferencia = window.innerHeight * 0.35;
  let secaoAtiva = null;

  for (const secao of secoesNavbar) {
    const retangulo = secao.getBoundingClientRect();
    if (retangulo.top <= pontoReferencia && retangulo.bottom > pontoReferencia) {
      secaoAtiva = secao;
      break;
    }
  }

  if (!secaoAtiva) {
    secaoAtiva =
      [...secoesNavbar]
        .reverse()
        .find((secao) => secao.getBoundingClientRect().top <= pontoReferencia) ||
      secoesNavbar[0];
  }

  if (secaoAtiva?.id) {
    atualizarLinkAtivo(`#${secaoAtiva.id}`);
  }
}

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    atualizarLinkAtivo(link.getAttribute("href"));
  });
});

window.addEventListener("hashchange", () => {
  atualizarLinkAtivo(window.location.hash);
});

const hashInicial = window.location.hash || "#inicio";
atualizarLinkAtivo(hashInicial);

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function digitarNoElemento(elemento, velocidade = 26) {
  if (!elemento) return;

  const conteudoOriginal = Array.from(elemento.childNodes);
  elemento.textContent = "";
  elemento.classList.add("digitando");

  async function digitarNosFilhos(noPai, filhosOriginais) {
    for (const no of filhosOriginais) {
      if (no.nodeType === Node.TEXT_NODE) {
        const texto = no.textContent || "";
        let noTextoAtual = null;

        for (const caractere of texto) {
          if (!noTextoAtual) {
            noTextoAtual = document.createTextNode("");
            noPai.appendChild(noTextoAtual);
          }

          noTextoAtual.textContent += caractere;
          await esperar(velocidade);
        }
      } else if (no.nodeType === Node.ELEMENT_NODE) {
        const elementoClonado = no.cloneNode(false);
        noPai.appendChild(elementoClonado);
        await digitarNosFilhos(elementoClonado, Array.from(no.childNodes));
      }
    }
  }

  await digitarNosFilhos(elemento, conteudoOriginal);
  elemento.classList.add("digitacao-finalizada");
}

async function animarInicio() {
  if (!subtituloInicio || !tituloInicio || !descricaoInicio) return;

  subtituloInicio.classList.add("fade-in-ativo");
  await esperar(450);

  tituloInicio.classList.add("fade-in-ativo");
  await esperar(700);

  await digitarNoElemento(descricaoInicio);
}

window.addEventListener("DOMContentLoaded", () => {
  animarInicio();
  atualizarTemaHeader();
  atualizarLinkAtivoPorScroll();
  animarRetangulosSobre();
  animarTecnologias();
  animarCursos();
  animarExperiencias();
  animarProjetos();
  animarContato();
});

function animarRetangulosSobre() {
  if (!sobreSecao || !detalheTopo || !detalheTitulo) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        window.setTimeout(() => {
          detalheTopo.classList.add("ativo");
        }, 0);

        window.setTimeout(() => {
          detalheTitulo.classList.add("ativo");
        }, 180);

        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.35,
    }
  );

  observador.observe(sobreSecao);
}

function atualizarTemaHeader() {
  if (!header) return;

  const pontoX = window.innerWidth / 2;
  const pontoY = Math.min(header.offsetHeight + 1, window.innerHeight - 1);
  const elementoSobCabecalho = document.elementFromPoint(pontoX, pontoY);
  const secaoAtual = elementoSobCabecalho?.closest("section");
  const secoesComTemaClaro = ["sobre", "tecnologias", "experiencias", "projetos", 
    "cursos", "contato"];
  const estaNoSeparador = Boolean(elementoSobCabecalho?.closest(".separador-secao"));
  const temaClaro = secoesComTemaClaro.includes(secaoAtual?.id) || estaNoSeparador;

  header.classList.toggle("tema-claro", temaClaro);
  header.classList.toggle("tema-escuro", !temaClaro);
}

function animarTecnologias() {
  if (!tecnologiasSecao) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        window.setTimeout(() => {
          detalheTecnologiasTopo?.classList.add("ativo");
        }, 0);

        window.setTimeout(() => {
          detalheTecnologiasTitulo?.classList.add("ativo");
        }, 180);

        tecnologiaCards.forEach((card, index) => {
          window.setTimeout(() => {
            card.classList.add("ativo");
          }, 280 + index * 120);
        });

        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.25,
    }
  );

  observador.observe(tecnologiasSecao);
}

function animarCursos() {
  if (!cursosSecao) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        window.setTimeout(() => {
          detalheCursosTopo?.classList.add("ativo");
        }, 0);

        window.setTimeout(() => {
          detalheCursosTitulo?.classList.add("ativo");
        }, 180);

        cursoCards.forEach((card, index) => {
          window.setTimeout(() => {
            card.classList.add("ativo");
          }, 280 + index * 130);
        });

        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.25,
    }
  );

  observador.observe(cursosSecao);
}

function animarExperiencias() {
  if (!experienciasSecao) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        detalheExperienciasTopo?.classList.add("ativo");

        window.setTimeout(() => {
          detalheExperienciasTitulo?.classList.add("ativo");
        }, 180);

        window.setTimeout(() => {
          linhaProgressoExperiencias?.classList.add("ativo");
        }, 420);

        experienciaItens.forEach((item, index) => {
          window.setTimeout(() => {
            item.classList.add("revelado");
          }, 850 + index * 720);
        });

        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.3,
    }
  );

  observador.observe(experienciasSecao);
}

function animarProjetos() {
  if (!projetosSecao) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        detalheProjetosTopo?.classList.add("ativo");

        window.setTimeout(() => {
          detalheProjetosTitulo?.classList.add("ativo");
        }, 180);

        window.setTimeout(() => {
          projetosDescricao?.classList.add("ativo");
        }, 320);

        projetoCards.forEach((card, index) => {
          window.setTimeout(() => {
            card.classList.add("ativo");
          }, 520 + index * 150);
        });

        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.25,
    }
  );

  observador.observe(projetosSecao);
}

function animarContato() {
  if (!contatoSecao) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        detalheContatoTopo?.classList.add("ativo");

        window.setTimeout(() => {
          detalheContatoTitulo?.classList.add("ativo");
        }, 180);

        window.setTimeout(() => {
          contatoForm?.classList.add("ativo");
        }, 320);

        observer.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.25,
    }
  );

  observador.observe(contatoSecao);
}

window.addEventListener("scroll", atualizarTemaHeader);
window.addEventListener("scroll", atualizarLinkAtivoPorScroll);
window.addEventListener("resize", atualizarTemaHeader);
window.addEventListener("resize", atualizarLinkAtivoPorScroll);
window.addEventListener("load", atualizarTemaHeader);
window.addEventListener("load", atualizarLinkAtivoPorScroll);