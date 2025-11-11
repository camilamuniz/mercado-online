document.addEventListener('click', function(e) {
  const btnSearch = e.target.closest('#search-btn');
  const btnCart   = e.target.closest('#cart-btn');
  const btnLogin  = e.target.closest('#login-btn');
  const btnMenu   = e.target.closest('#menu-btn');

  const searchForm   = document.querySelector('.search-form');
  const shoppingCart = document.querySelector('.shopping-cart');
  const loginForm    = document.querySelector('.login-form');
  const navbar       = document.querySelector('.navbar');

  // busca
  if (btnSearch) {
    searchForm?.classList.toggle('active');
    shoppingCart?.classList.remove('active');
    loginForm?.classList.remove('active');
    navbar?.classList.remove('active');
    e.preventDefault();
    return;
  }

  // carrinho
  if (btnCart) {
    shoppingCart?.classList.toggle('active');
    searchForm?.classList.remove('active');
    loginForm?.classList.remove('active');
    navbar?.classList.remove('active');
    e.preventDefault();
    return;
  }

  // login
  if (btnLogin) {
    loginForm?.classList.toggle('active');
    searchForm?.classList.remove('active');
    shoppingCart?.classList.remove('active');
    navbar?.classList.remove('active');
    e.preventDefault();
    return;
  }

  // menu (mobile)
  if (btnMenu) {
    navbar?.classList.toggle('active');
    searchForm?.classList.remove('active');
    shoppingCart?.classList.remove('active');
    loginForm?.classList.remove('active');
    e.preventDefault();
    return;
  }
});

// Carregar header e footer do index.html (uma única requisição)
fetch('index.html')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');

    const header = doc.querySelector('header');
    const footer = doc.querySelector('.footer');

    // Insere header apenas se ainda não existir na página
    if (header && !document.querySelector('header')) {
      document.body.insertBefore(header.cloneNode(true), document.body.firstChild);
    }

    // Insere footer apenas se ainda não existir
    if (footer && !document.querySelector('.footer')) {
      document.body.appendChild(footer.cloneNode(true));
    }

    // Dispara evento quando header e footer terminam de carregar
    document.dispatchEvent(new Event('headerCarregado'));
  })
  .catch(err => console.error('Erro ao carregar header/footer:', err));

// Atualiza breadcrumb inicial
document.addEventListener("DOMContentLoaded", function() {
  const atual = document.getElementById("paginaAtual");

  const blocoAtivo = document.querySelector(".conteudo-item-int.ativo-int");
  if (blocoAtivo && atual) {
    const titulo = blocoAtivo.querySelector("h2");
    if (titulo) {
      atual.textContent = titulo.textContent.trim();
    }
  }
});

// Função para mostrar conteúdos (sidebar)
function mostrarConteudo(id, elemento) {
  document.querySelectorAll('.conteudo-item-int').forEach(div => {
    div.classList.remove('ativo-int');
  });

  document.querySelectorAll('.sidebar-int li').forEach(li => {
    li.classList.remove('active-int');
  });

  const blocoAtivo = document.getElementById(id);
  blocoAtivo.classList.add('ativo-int');
  elemento.classList.add('active-int');

  const atual = document.getElementById("paginaAtual");
  if (blocoAtivo && atual) {
    const titulo = blocoAtivo.querySelector("h2");
    if (titulo) {
      atual.textContent = titulo.textContent.trim();
    }
  }
}

// Contato com o Mercado
function mostrarAbaContato(id, botao) {
  document.querySelectorAll('.conteudo-aba-int').forEach(div => div.classList.remove('ativo'));
  document.querySelectorAll('.aba-int').forEach(b => b.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativo');
  botao.classList.add('ativa');
}

// Simulador de Frete
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("freteForm");
  const cepInput = document.getElementById("cep");
  const erroCep = document.getElementById("erroCep");
  const resultadoCidade = document.getElementById("resultadoCidade");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const cep = cepInput.value.trim().replace(/\D/g, "");
      const cepValido = /^[0-9]{8}$/.test(cep);

      if (!cepValido) {
        erroCep.style.display = "block";
        resultadoCidade.textContent = "";
        return;
      }

      erroCep.style.display = "none";
      resultadoCidade.textContent = "Buscando informações...";

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          resultadoCidade.textContent = "CEP não encontrado.";
        } else {
          resultadoCidade.textContent = `Cidade: ${data.localidade} - ${data.uf}`;
        }
      } catch (error) {
        resultadoCidade.textContent = "Erro ao buscar cidade. Tente novamente.";
        console.error(error);
      }
    });
  }
});

// Dropdown Mobile
function selecionarOpcaoMobile(id) {
  const bloco = document.getElementById(id);
  if (!bloco) return;

  document.querySelectorAll('.conteudo-item-int').forEach(div => {
    div.classList.remove('ativo-int');
  });

  bloco.classList.add('ativo-int');

  const atual = document.getElementById('paginaAtual');
  const titulo = bloco.querySelector('h2');
  if (atual && titulo) {
    atual.textContent = titulo.textContent.trim();
  }

  document.getElementById('menuMobileSelect').value = id;
}