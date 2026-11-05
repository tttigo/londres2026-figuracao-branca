// Links internos ("voltar ao topo" e a seta ↓) rolam a página SEM colocar
// #topo / #manifesto no endereço. Com a âncora no endereço, ao atualizar a
// página o Chrome do iPhone pulava para ela e errava a conta da barra de
// endereço, deixando o topo do vídeo cortado.
(function () {
  // (location.hash vem vazio para um "#" sozinho, por isso olhamos o endereço inteiro)
  function hasHash() { return location.href.indexOf('#') !== -1; }
  function cleanHash() {
    if (hasHash() && history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  // se a página abrir/atualizar com qualquer # no endereço, limpa e fica no topo
  // (a página não tem outros pontos de entrada por âncora)
  if (hasHash()) {
    cleanHash();
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    if (!id) {
      // link provisório (href="#"), p.ex. a página de prints que ainda não existe:
      // não faz nada em vez de abrir o próprio site com "#" numa aba nova
      link.addEventListener('click', function (e) { e.preventDefault(); });
      return;
    }
    link.addEventListener('click', function (e) {
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (id === 'topo') window.scrollTo({ top: 0, behavior: 'smooth' });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      cleanHash();
    });
  });
})();

// Entrada suave das imagens ao rolar a página.
// Sem JS, tudo aparece normalmente (a classe .js só é adicionada aqui).
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window)) return;
  root.classList.add('js');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();

// Fotos em tela cheia: clicar abre; Esc, clique fora ou "fechar" fecha;
// setas do teclado, botões ← → ou arrastar (celular) passam as fotos.
// Sem JS, o link abre a foto grande normalmente.
(function () {
  var box = document.getElementById('lightbox');
  var links = Array.prototype.slice.call(document.querySelectorAll('a.zoom'));
  if (!box || !links.length) return;

  var img = box.querySelector('.lightbox__img');
  var count = box.querySelector('.lightbox__count');
  var closeBtn = box.querySelector('.lightbox__close');
  var current = 0;
  var opener = null;

  function show(i) {
    current = (i + links.length) % links.length;
    var link = links[current];
    img.classList.add('is-loading');
    img.onload = function () { img.classList.remove('is-loading'); };
    img.src = link.getAttribute('href');
    img.alt = link.querySelector('img').alt;
    count.textContent = (current + 1) + ' / ' + links.length;
    // pré-carrega a próxima
    new Image().src = links[(current + 1) % links.length].getAttribute('href');
  }

  function open(i) {
    opener = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(function () { box.classList.add('is-open'); });
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    box.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { box.hidden = true; img.removeAttribute('src'); }, 300);
    if (opener) opener.focus({ preventScroll: true });
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      open(i);
    });
  });

  box.addEventListener('click', function (e) {
    if (e.target.closest('.lightbox__prev')) return show(current - 1);
    if (e.target.closest('.lightbox__next')) return show(current + 1);
    if (e.target === img) return;
    close();
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      // mantém o foco dentro da visualização
      var f = box.querySelectorAll('button');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // arrastar para o lado no celular
  var startX = null, startY = null;
  box.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
  }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
