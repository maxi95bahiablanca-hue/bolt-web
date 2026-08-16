/* ───────────────────────────────────────────────────────────────────────────
   PINTURAS PAMPACRYL × BOLT — la página (16-ago-2026)
   Tres piezas: el probador de color (canvas + máscara de pared), las fichas
   de producto con precio BOLT, y el pedido que sale armado por WhatsApp.
   Sin dependencias. Los datos vienen de datos.js / precios.js / colores.js.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";
  var D = window.PAMPACRYL, PRECIOS = window.PAMPACRYL_PRECIOS || {}, COLORES = window.PAMPACRYL_COLORES || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ── precios ─────────────────────────────────────────────────────────── */
  var IVA = D.PRECIOS_INCLUYEN_IVA ? 0 : D.IVA;
  function conIva(lista) { return lista * (1 + IVA); }
  function bolt(lista) { return conIva(lista) * (1 - D.DESCUENTO_BOLT); }
  function pesos(n) { return "$" + Math.round(n).toLocaleString("es-AR"); }
  function ordenEnvase(e) { // "500 ML" < "1 L" < "4 L" … y kg aparte
    var m = /^([\d,]+)\s*(ML|L|KG)/.exec(e); if (!m) return 9999;
    var n = parseFloat(m[1].replace(",", ".")); if (m[2] === "ML") n /= 1000; if (m[2] === "KG") n += 0.001;
    return n + (/tambor/.test(e) ? 1000 : 0);
  }
  function litros(env) { var m = /^([\d,]+)\s*(ML|L|KG)/.exec(env); if (!m) return null; var n = parseFloat(m[1].replace(",", ".")); return m[2] === "ML" ? n / 1000 : n; }
  function preciosDe(base) {
    var t = PRECIOS[base] || {}; return Object.keys(t).sort(function (a, b) { return ordenEnvase(a) - ordenEnvase(b); }).map(function (e) { return { env: e, lista: t[e] }; });
  }

  /* ── el color elegido (compartido entre probador y productos) ────────── */
  var colorElegido = null; // {codigo,en,es,hex}
  var COL = COLORES.map(function (c) { return { codigo: c[0], en: c[1], es: c[2], hex: c[3], fam: c[4] }; });
  var FAMS = []; COL.forEach(function (c) { if (FAMS.indexOf(c.fam) < 0) FAMS.push(c.fam); });
  var ORDEN_FAM = ["blancos y grises", "amarillos", "naranjas y terracotas", "beiges y marrones", "rojos", "rosas", "violetas", "azules", "turquesas", "verdes", "grises y negros"];
  FAMS.sort(function (a, b) { return ORDEN_FAM.indexOf(a) - ORDEN_FAM.indexOf(b); });
  var famColor = { "blancos y grises": "#EDEDE6", "amarillos": "#F6D64A", "naranjas y terracotas": "#E8853B", "beiges y marrones": "#B78B5A", "rojos": "#C8322B", "rosas": "#E58AB4", "violetas": "#8A63B8", "azules": "#3F6FC4", "turquesas": "#3FB3B8", "verdes": "#4E9A52", "grises y negros": "#4A4D52" };
  var famOn = null, filtro = "";

  function pintarFamilias() {
    var box = $("#familias"); box.innerHTML = "";
    var todos = el("button", famOn ? "" : "on", "Todos"); todos.onclick = function () { famOn = null; pintarFamilias(); pintarGrilla(); }; box.appendChild(todos);
    FAMS.forEach(function (f) {
      var b = el("button", famOn === f ? "on" : ""); b.innerHTML = '<i style="background:' + famColor[f] + '"></i>' + f;
      b.onclick = function () { famOn = famOn === f ? null : f; pintarFamilias(); pintarGrilla(); }; box.appendChild(b);
    });
  }
  function normal(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function pintarGrilla() {
    var g = $("#grilla"); g.innerHTML = "";
    var q = normal(filtro).trim();
    var lista = COL.filter(function (c) { return (!famOn || c.fam === famOn) && (!q || normal(c.codigo + " " + c.en + " " + c.es).indexOf(q) >= 0); });
    var frag = document.createDocumentFragment();
    lista.forEach(function (c) {
      var s = el("div", "sw" + (colorElegido && colorElegido.codigo === c.codigo ? " on" : "")); s.style.background = c.hex;
      s.title = c.codigo + " · " + c.es + " (" + c.en + ")"; s.setAttribute("role", "option"); s.dataset.codigo = c.codigo;
      frag.appendChild(s);
    });
    g.appendChild(frag);
    $("#cntColores").textContent = lista.length + " de " + COL.length + " colores" + (famOn ? " · " + famOn : "") + (q ? ' · "' + filtro + '"' : "");
  }
  $("#grilla").addEventListener("click", function (e) {
    var s = e.target.closest(".sw"); if (!s) return;
    elegirColor(COL.filter(function (c) { return c.codigo === s.dataset.codigo; })[0]);
  });
  $("#buscaColor").addEventListener("input", function (e) { filtro = e.target.value; pintarGrilla(); });

  function elegirColor(c) {
    colorElegido = c;
    $$(".sw.on").forEach(function (x) { x.classList.remove("on"); });
    var s = $('.sw[data-codigo="' + c.codigo + '"]'); if (s) s.classList.add("on");
    var e = $("#elegido"); e.hidden = false; $("i", e).style.background = c.hex; $("b", e).textContent = c.es + " · " + c.codigo; $("small", e).textContent = c.en + " · " + c.hex;
    var chip = $("#chipColor"); chip.hidden = false; $("i", chip).style.background = c.hex; $("b", chip).textContent = c.es; $("small", chip).textContent = c.codigo;
    pintarPared();
    $$(".prod .colorSel").forEach(pintarColorSel);
    try { localStorage.setItem("pamp_color", c.codigo); } catch (_) {}
  }
  $("#usarColor").onclick = function () {
    document.getElementById("pinturas").scrollIntoView({ behavior: "smooth", block: "start" });
    toast("Color elegido: " + colorElegido.es + ". Ahora agregá la pintura.");
  };

  /* ── el probador: foto + máscara → la pared cambia de color ──────────── */
  var lienzo = $("#lienzo"), ctx = lienzo.getContext("2d", { willReadFrequently: true });
  var fotoOn = null, cache = {}; // id → {img, mask, gris (Float32Array), ref}
  function pintarTabs() {
    var t = $("#tabsFotos"); t.innerHTML = "";
    D.fotos.forEach(function (f) {
      var b = el("button", "tab" + (fotoOn === f.id ? " on" : ""), f.nombre); b.onclick = function () { cargarFoto(f.id); }; t.appendChild(b);
    });
  }
  function cargarImg(src, intento) {
    return new Promise(function (ok, no) {
      var i = new Image(); i.onload = function () { ok(i); };
      // Un fallo de red aislado no tiene que dejar el probador muerto: se reintenta una vez.
      i.onerror = function () { if (!intento) cargarImg(src + (src.indexOf("?") < 0 ? "?r=1" : "&r=1"), 1).then(ok, no); else no(new Error("no cargó " + src)); };
      i.src = src;
    });
  }
  function cargarFoto(id) {
    fotoOn = id; pintarTabs();
    var f = D.fotos.filter(function (x) { return x.id === id; })[0];
    lienzo.width = f.w; lienzo.height = f.h; lienzo.parentNode.style.aspectRatio = f.w + "/" + f.h;
    if (cache[id]) return pintarPared();
    $("#cargando").hidden = false;
    Promise.all([cargarImg(f.src), cargarImg(f.mascara)]).then(function (r) {
      var img = r[0], mk = r[1];
      var c2 = document.createElement("canvas"); c2.width = f.w; c2.height = f.h; var x2 = c2.getContext("2d", { willReadFrequently: true });
      x2.drawImage(img, 0, 0, f.w, f.h); var foto = x2.getImageData(0, 0, f.w, f.h);
      x2.drawImage(mk, 0, 0, f.w, f.h); var mask = x2.getImageData(0, 0, f.w, f.h).data;
      var n = f.w * f.h, gris = new Float32Array(n), a = new Float32Array(n), suma = 0, cnt = 0, d = foto.data;
      for (var i = 0; i < n; i++) {
        var g = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255; gris[i] = g;
        a[i] = mask[i * 4] / 255; if (a[i] > 0.5) { suma += g; cnt++; }
      }
      cache[id] = { foto: foto, gris: gris, alpha: a, ref: cnt ? suma / cnt : 0.8 };
      $("#cargando").hidden = true; pintarPared();
    }).catch(function (e) { console.warn("probador:", e && e.message); $("#cargando").hidden = false; $("#cargando").textContent = "No se pudo cargar la foto. Probá recargar la página."; });
  }
  function hexRgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function pintarPared() {
    var c = cache[fotoOn]; if (!c) return;
    if (!colorElegido) { ctx.putImageData(c.foto, 0, 0); return; }
    var rgb = hexRgb(colorElegido.hex), out = ctx.createImageData(c.foto.width, c.foto.height), o = out.data, d = c.foto.data;
    // La pared conserva su luz (sombras, brillos) y toma el color: cada píxel
    // sale del color elegido escalado por su luminancia respecto de la media de
    // la pared. Un color oscuro en una pared muy iluminada se comprime un poco
    // (0,85 + 0,15·L) para que no quede plano.
    var ref = c.ref, n = c.gris.length;
    for (var i = 0; i < n; i++) {
      var al = c.alpha[i], j = i * 4;
      if (al <= 0.003) { o[j] = d[j]; o[j + 1] = d[j + 1]; o[j + 2] = d[j + 2]; o[j + 3] = 255; continue; }
      var l = c.gris[i] / ref; if (l > 1.25) l = 1.25;
      var k = 0.85 * l + 0.15 * Math.min(l, 1);
      var r = rgb[0] * k, g = rgb[1] * k, b = rgb[2] * k;
      if (r > 255) r = 255; if (g > 255) g = 255; if (b > 255) b = 255;
      o[j] = d[j] * (1 - al) + r * al; o[j + 1] = d[j + 1] * (1 - al) + g * al; o[j + 2] = d[j + 2] * (1 - al) + b * al; o[j + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
  }

  /* ── productos ───────────────────────────────────────────────────────── */
  function rendimientoTexto(p) {
    var r = p.rendimiento; if (!r) return null;
    var f = function (n) { return String(n).replace(".", ","); };
    if (r.unidad === "m2l") {
      var ficha = r.min === r.max ? f(r.min) + " m²/L" : f(r.min) + " a " + f(r.max) + " m²/L";
      var prom = (r.min + r.max) / 2, obra = prom * D.FACTOR_OBRA;
      return { ficha: ficha, fichaSub: "por mano, según la ficha", obra: f(Math.round(obra * 10) / 10) + " m²/L", obraSub: "por mano, en obra", obraNum: obra };
    }
    if (r.unidad === "kgm2") return { ficha: (r.min === r.max ? f(r.min) : f(r.min) + " a " + f(r.max)) + " kg/m²", fichaSub: "según la ficha", obra: null };
    if (r.unidad === "m2kg") return { ficha: f(r.min) + " a " + f(r.max) + " m²/kg", fichaSub: "1 mm de espesor", obra: null };
    return null;
  }
  function baldeTexto(p, env, rt) {
    if (!rt || !rt.obraNum) return "";
    var L = litros(env); if (!L) return "";
    var m2 = L * rt.obraNum / 2; // dos manos
    return "≈ " + Math.round(m2) + " m² a dos manos";
  }
  var estado = {}; // productoId → {variante, env}
  function pintarColorSel(box) {
    if (!colorElegido) { box.innerHTML = '<span style="color:var(--tx3)">Se prepara en cualquier color de la carta — <a data-ir="color">elegí uno arriba</a></span>'; return; }
    box.innerHTML = '<i style="background:' + colorElegido.hex + '"></i><span>Color: <b style="color:var(--tx)">' + colorElegido.es + '</b> ' + colorElegido.codigo + ' · <a data-ir="color">cambiar</a></span>';
  }
  document.addEventListener("click", function (e) { var a = e.target.closest("[data-ir=color]"); if (a) { e.preventDefault(); document.getElementById("color").scrollIntoView({ behavior: "smooth" }); } });

  function tarjeta(p) {
    var st = estado[p.id] = estado[p.id] || { variante: p.variantes ? 0 : null, env: null };
    var card = el("article", "prod"); card.dataset.id = p.id;
    var rt = rendimientoTexto(p);
    var top = el("div", "top", "<div><h4>" + p.nombre + "</h4><div class='acab'>" + (p.acabado || "") + "</div></div>");
    card.appendChild(top);
    card.appendChild(el("div", "usos", p.usos));
    card.appendChild(el("div", "porque", "<b>Por qué</b> — " + p.porque));
    if (p.caracteristicas && p.caracteristicas.length) card.appendChild(el("div", "carac", p.caracteristicas.map(function (c) { return "<span>" + c + "</span>"; }).join("")));
    if (rt) {
      var r = el("div", "rinde");
      r.appendChild(el("div", "", "<b>" + rt.ficha + "</b><small>" + rt.fichaSub + "</small>"));
      if (rt.obra) r.appendChild(el("div", "ob", "<b>" + rt.obra + "</b><small>" + rt.obraSub + " · <span class='balde'></span></small>"));
      card.appendChild(r);
    }
    if (p.colores === "carta") { var cs = el("div", "colorSel"); pintarColorSel(cs); card.appendChild(cs); }
    else if (p.nota && p.colores !== "variantes") card.appendChild(el("div", "usos", '<span style="color:var(--tx3);font-size:.82rem">' + p.nota + "</span>"));
    // variantes (colores de fábrica / acabados)
    var selV = null;
    if (p.variantes) {
      selV = el("div", "sel"); selV.innerHTML = "<label>Color / variante</label>"; var vs = el("div", "vars");
      p.variantes.forEach(function (v, i) {
        var b = el("button", "var" + (st.variante === i ? " on" : "")); b.type = "button";
        b.innerHTML = (v.hex ? '<i style="background:' + v.hex + '"></i>' : "") + v.nombre;
        b.onclick = function () { st.variante = i; st.env = null; refrescar(); }; vs.appendChild(b);
      });
      selV.appendChild(vs); card.appendChild(selV);
      if (p.nota) card.appendChild(el("div", "usos", '<span style="color:var(--tx3);font-size:.82rem">' + p.nota + "</span>"));
    }
    var selE = el("div", "sel"); selE.innerHTML = "<label>Envase</label>"; var envs = el("div", "envs"); selE.appendChild(envs); card.appendChild(selE);
    var pie = el("div", "pie"); pie.innerHTML = '<div class="pr"><s></s><b></b><small></small></div>'; var btn = el("button", "agregar", "Agregar"); btn.type = "button"; pie.appendChild(btn); card.appendChild(pie);

    function baseActual() { return p.variantes ? p.variantes[st.variante].precioBase : p.precioBase; }
    function refrescar() {
      $$(".var", card).forEach(function (b, i) { b.classList.toggle("on", i === st.variante); });
      var lista = preciosDe(baseActual()); envs.innerHTML = "";
      if (!lista.length) { envs.innerHTML = '<span style="color:var(--tx3);font-size:.85rem">Sin precio en la lista de agosto: se cotiza por WhatsApp.</span>'; }
      if (st.env == null || !lista.some(function (x) { return x.env === st.env; })) st.env = lista.length ? lista[Math.min(1, lista.length - 1)].env : null;
      lista.forEach(function (x) {
        var b = el("button", "env" + (x.env === st.env ? " on" : "")); b.type = "button";
        b.innerHTML = "<b>" + x.env + "</b>" + pesos(bolt(x.lista)) + "<br><s>" + pesos(conIva(x.lista)) + "</s>";
        b.onclick = function () { st.env = x.env; refrescar(); }; envs.appendChild(b);
      });
      var pr = $(".pr", pie), act = lista.filter(function (x) { return x.env === st.env; })[0];
      if (act) { $("s", pr).textContent = "Lista " + pesos(conIva(act.lista)); $("b", pr).textContent = pesos(bolt(act.lista)); $("small", pr).textContent = "con BOLT · IVA incluido · " + act.env; }
      else { $("s", pr).textContent = ""; $("b", pr).textContent = "A cotizar"; $("small", pr).textContent = ""; }
      var bal = $(".balde", card); if (bal) bal.textContent = st.env ? baldeTexto(p, st.env, rt) : "";
    }
    btn.onclick = function () {
      var lista = preciosDe(baseActual()), act = lista.filter(function (x) { return x.env === st.env; })[0];
      var v = p.variantes ? p.variantes[st.variante] : null;
      agregar({ id: p.id, nombre: p.nombre, variante: v ? v.nombre : null, hex: v && v.hex ? v.hex : null, env: st.env || "a cotizar", lista: act ? act.lista : null,
        color: p.colores === "carta" && colorElegido ? { codigo: colorElegido.codigo, es: colorElegido.es, hex: colorElegido.hex } : null });
    };
    refrescar();
    return card;
  }

  function pintarProductos() {
    var nav = $("#lineaNav"), cont = $("#lineas");
    D.lineas.forEach(function (l) {
      var prods = D.productos.filter(function (p) { return p.linea === l.id; }); if (!prods.length) return;
      var a = el("a", "", l.nombre); a.href = "#l-" + l.id; nav.appendChild(a);
      var sec = el("div", "linea rev"); sec.id = "l-" + l.id;
      sec.appendChild(el("h3", "", l.nombre)); sec.appendChild(el("div", "para", l.para));
      var grid = el("div", "prods"); prods.forEach(function (p) { grid.appendChild(tarjeta(p)); }); sec.appendChild(grid);
      cont.appendChild(sec);
    });
  }

  /* ── el pedido ───────────────────────────────────────────────────────── */
  var carrito = [];
  try { carrito = JSON.parse(localStorage.getItem("pamp_carrito") || "[]"); } catch (_) { carrito = []; }
  function guardar() { try { localStorage.setItem("pamp_carrito", JSON.stringify(carrito)); } catch (_) {} }
  function claveItem(it) { return [it.id, it.variante, it.env, it.color && it.color.codigo].join("|"); }
  function agregar(it) {
    var k = claveItem(it), ex = carrito.filter(function (x) { return claveItem(x) === k; })[0];
    if (ex) ex.cant++; else { it.cant = 1; carrito.push(it); }
    guardar(); pintarCarrito(); toast("Agregado: " + it.nombre + (it.env ? " " + it.env : ""));
  }
  function pintarCarrito() {
    var box = $("#items"); box.innerHTML = "";
    var n = carrito.reduce(function (s, x) { return s + x.cant; }, 0);
    $("#fabN").textContent = n;
    if (!carrito.length) box.appendChild(el("div", "vacio", "Todavía no agregaste nada. Elegí una pintura y tocá <b>Agregar</b>."));
    var lista = 0, total = 0, sinPrecio = false;
    carrito.forEach(function (it, i) {
      var row = el("div", "item");
      var sw = el("i", "sw2"); sw.style.background = (it.color && it.color.hex) || it.hex || "rgba(255,255,255,.08)"; row.appendChild(sw);
      var d = el("div", "d"); d.innerHTML = "<b>" + it.nombre + (it.variante ? " · " + it.variante : "") + "</b><small>" + it.env + (it.color ? " · color " + it.color.es + " (" + it.color.codigo + ")" : "") + "</small>";
      var q = el("div", "q"); q.innerHTML = "<button aria-label='menos'>−</button><span>" + it.cant + "</span><button aria-label='más'>+</button>";
      $$("button", q)[0].onclick = function () { it.cant--; if (it.cant <= 0) carrito.splice(i, 1); guardar(); pintarCarrito(); };
      $$("button", q)[1].onclick = function () { it.cant++; guardar(); pintarCarrito(); };
      d.appendChild(q); row.appendChild(d);
      var p = el("div", "p");
      if (it.lista != null) { var l = it.lista * it.cant; lista += conIva(l); total += bolt(l); p.innerHTML = pesos(bolt(l)) + "<small><s>" + pesos(conIva(l)) + "</s></small>"; }
      else { sinPrecio = true; p.innerHTML = "a cotizar"; }
      row.appendChild(p); box.appendChild(row);
    });
    $("#tLista").textContent = pesos(lista); $("#tDesc").textContent = "−" + pesos(lista - total); $("#tTotal").textContent = pesos(total) + (sinPrecio ? " + a cotizar" : "");
    var wp = $("#btnWp"); wp.setAttribute("aria-disabled", carrito.length ? "false" : "true"); wp.href = carrito.length ? linkWp(total, sinPrecio) : "#";
  }
  function linkWp(total, sinPrecio) {
    var lineas = ["Hola BOLT 👋 Quiero pedir pinturas Pampacryl con el 30% de descuento:", ""];
    carrito.forEach(function (it) {
      lineas.push("• " + it.cant + " × " + it.nombre + (it.variante ? " " + it.variante : "") + " — " + it.env + (it.color ? " — color " + it.color.es + " " + it.color.codigo : "") + (it.lista != null ? " — " + pesos(bolt(it.lista * it.cant)) : " — a cotizar"));
    });
    lineas.push("", "Total: " + pesos(total) + " (IVA incluido, con el 30% de BOLT)" + (sinPrecio ? " + lo que falta cotizar" : ""));
    var nom = $("#dNombre").value.trim(), zona = $("#dZona").value.trim();
    if (nom || zona) lineas.push("", (nom ? "Soy " + nom : "") + (zona ? (nom ? ", de " : "Zona: ") + zona : ""));
    lineas.push("", "Armado en bolt.com.ar/pinturas");
    return "https://wa.me/" + D.WHATSAPP + "?text=" + encodeURIComponent(lineas.join("\n"));
  }
  $("#dNombre").addEventListener("input", pintarCarrito); $("#dZona").addEventListener("input", pintarCarrito);
  function abrir(o) { $("#panel").classList.toggle("on", o); $("#velo").classList.toggle("on", o); document.body.style.overflow = o ? "hidden" : ""; }
  $("#fab").onclick = function () { abrir(true); }; $("#cerrarPanel").onclick = function () { abrir(false); }; $("#velo").onclick = function () { abrir(false); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") abrir(false); });

  var toastT; function toast(t) { var x = $("#toast"); x.textContent = t; x.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(function () { x.classList.remove("on"); }, 2200); }

  /* ── arranque ────────────────────────────────────────────────────────── */
  pintarFamilias(); pintarGrilla(); pintarProductos(); pintarCarrito(); pintarTabs();
  cargarFoto(D.fotos[0].id);
  try { var guardado = localStorage.getItem("pamp_color"); var c0 = COL.filter(function (c) { return c.codigo === guardado; })[0]; if (c0) elegirColor(c0); } catch (_) {}
  // reveal
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .08 });
  $$(".rev").forEach(function (x) { io.observe(x); });
})();
