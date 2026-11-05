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
