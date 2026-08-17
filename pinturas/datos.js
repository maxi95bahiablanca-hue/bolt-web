/* ───────────────────────────────────────────────────────────────────────────
   PINTURAS PAMPACRYL × BOLT — los datos de la página (16-ago-2026)
   ───────────────────────────────────────────────────────────────────────────
   Fuentes (Desktop/BOLT-pampacryl/):
   · catalogo-pampacryl.pdf  → cada producto: usos, acabado, rendimiento de
     FICHA (m² por litro y por mano), presentaciones, colores, características.
   · lista-de-precios-08-2026.pdf → precios.js (lista distribuidor, SIN IVA).
   · carta-de-colores.pdf → colores.js (1008 colores del sistema tintométrico).

   Los precios (Maxi, 16-ago-2026: "esa lista ya tiene descuentos"):
   · La lista distribuidora YA ES el precio con el 30 % de BOLT: se muestra tal
     cual + IVA. No se le descuenta nada más.
   · Como referencia se muestra tachado el precio "en pinturería", que es el
     de la lista llevado al 100 % (lista ÷ 0,70). Es una referencia, no un
     precio publicado por Pampacryl.
   · IVA: la lista viene sin IVA; al público se muestra con IVA incluido.

   El "rendimiento de obra" NO es el de la ficha: la ficha se mide en
   laboratorio (película fina, rodillo nuevo, pared sellada). En una casa real
   se usa cerca del doble. FACTOR_OBRA baja la ficha a lo que hay que ir a
   comprar (mismo criterio que la calculadora de bolt.com.ar/calculadora).
   ─────────────────────────────────────────────────────────────────────────── */
window.PAMPACRYL = {
  DESCUENTO_BOLT: 0.30,               // lo que el cliente de BOLT paga de menos que en pinturería
  LISTA_YA_CON_DESCUENTO: true,       // true = la lista ES el precio BOLT (no se descuenta de nuevo)
  IVA: 0.21,
  PRECIOS_INCLUYEN_IVA: false,       // la lista 08/26 dice "Los precios No incluyen IVA"
  FACTOR_OBRA: 0.55,                 // ficha × 0,55 = lo que rinde de verdad en obra
  VIGENCIA: "agosto 2026",
  WHATSAPP: "5492914199938",         // a dónde llega el carrito (BOLT)

  lineas: [
    { id: "latex",       nombre: "Látex",                    para: "Paredes y techos, adentro y afuera" },
    { id: "sintetico",   nombre: "Esmaltes sintéticos",      para: "Rejas, aberturas, metal y madera" },
    { id: "imperm",      nombre: "Impermeabilización",       para: "Frentes, techos y terrazas" },
    { id: "revest",      nombre: "Revestimientos",           para: "Texturados para el frente" },
    { id: "prep",        nombre: "Preparación de superficies", para: "Fijador, enduido, masilla, antióxido" },
    { id: "madera",      nombre: "Maderas",                  para: "Barnices, impregnante, fondo" },
    { id: "pisos",       nombre: "Pisos y piletas",          para: "Pintura para piso, piscina" },
    { id: "campo",       nombre: "Campo y ladrillos",        para: "Tranqueras, ladrillo visto" },
  ],

  productos: [
    // ── LÁTEX ────────────────────────────────────────────────────────────
    { id: "latex-interior-premium", linea: "latex", nombre: "Látex Interior Premium",
      acabado: "Mate o satinado", precioBase: "LATEX INTERIOR PREMIUM",
      usos: "Paredes y techos interiores: revoque, yeso, ladrillo, hormigón visto.",
      porque: "Es el látex de línea alta para adentro: cubre mucho (menos manos), se puede lavar y resiste el roce de todos los días sin marcarse. Previene hongos.",
      caracteristicas: ["Gran resistencia al roce", "Excelente poder cubritivo", "Lavable", "Previene hongos"],
      rendimiento: { min: 12, max: 12, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "carta", nota: "Blanco, con entonador o cualquiera de los 1008 colores de la carta." },
    { id: "latex-exterior-premium", linea: "latex", nombre: "Látex Exterior Premium",
      acabado: "Mate", precioBase: "LATEX EXTERIOR PREMIUM",
      usos: "Frentes y paredes exteriores de revoque, ladrillo, hormigón.",
      porque: "Está hecho para aguantar sol, lluvia y cambios de temperatura sin tizarse ni descascararse. Si es afuera, va éste y no el interior.",
      caracteristicas: ["Resistencia a la intemperie", "Excelente poder cubritivo", "Lavable", "Inhibe hongos"],
      rendimiento: { min: 12, max: 12, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "carta", nota: "Blanco, con entonador o los 1008 colores de la carta." },
    { id: "latex-int-ext-premium", linea: "latex", nombre: "Látex Interior-Exterior Premium",
      acabado: "Mate o satinado", precioBase: "LATEX INTERIOR EXTERIOR PREMIUM",
      usos: "Sirve para las dos cosas: adentro y afuera, sobre revoque, yeso o fibrocemento.",
      porque: "Un solo balde para toda la casa: resiste la intemperie afuera y es lavable adentro. Es el que más rinde de la línea (12 a 14 m² por litro).",
      caracteristicas: ["Resistencia a la intemperie", "Lavable", "Excelente poder cubritivo", "Inhibe hongos"],
      rendimiento: { min: 12, max: 14, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "carta", nota: "Blanco, con entonador o los 1008 colores de la carta." },
    { id: "latex-cielorraso", linea: "latex", nombre: "Látex Cielorraso Premium",
      acabado: "Mate", precioBase: "LATEX CIELORRASO",
      usos: "Techos interiores de revoque, yeso o fibrocemento.",
      porque: "Los techos juntan humedad y se manchan de hongos: éste evita la condensación y los inhibe. Mate profundo, así no marca las imperfecciones del techo.",
      caracteristicas: ["Evita condensación de humedad", "Alto poder cubritivo", "Inhibe hongos", "Lavable"],
      rendimiento: { min: 8, max: 10, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "blanco", nota: "Blanco. Permite entonador universal." },

    // ── SINTÉTICO ────────────────────────────────────────────────────────
    { id: "esmalte-3en1", linea: "sintetico", nombre: "Esmalte Sintético 3 en 1",
      acabado: "Brillante, satinado o mate", precioBase: null,
      usos: "Rejas, portones, aberturas, muebles de hierro y de madera; también sobre concreto.",
      porque: "Antióxido, anticorrosivo y esmalte en la misma lata: sobre hierro sano no hace falta dar convertidor aparte. Dureza final alta y poca pérdida de brillo.",
      caracteristicas: ["Antióxido + anticorrosivo + esmalte", "Gran lavabilidad y resistencia", "Óptima dureza final", "Escasa pérdida de brillo"],
      rendimiento: { min: 10, max: 15, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L", "20 L"],
      colores: "variantes",
      variantes: [
        { nombre: "Blanco brillante", precioBase: "ESMALTE SINTETICO BLANCO BRILLANTE 3 EN 1", hex: "#F4F4F0" },
        { nombre: "Blanco satinado", precioBase: "ESMALTE SINTETICO BLANCO SATINADO 3 EN 1", hex: "#F2F2EE" },
        { nombre: "Blanco mate", precioBase: "ESMALTE SINTETICO BLANCO MATE 3 EN 1", hex: "#EFEFEA" },
        { nombre: "Negro brillante", precioBase: "ESMALTE SINTETICO NEGRO BRILLANTE 3 EN 1", hex: "#111214" },
        { nombre: "Negro satinado", precioBase: "ESMALTE SINTETICO NEGRO SATINADO 3 EN 1", hex: "#17181A" },
        { nombre: "Negro mate", precioBase: "ESMALTE SINTETICO NEGRO MATE 3 EN 1", hex: "#1C1D1F" },
        { nombre: "Gris espacial", precioBase: "ESMALTE SINTETICO GRIS ESPACIAL 3 EN 1", hex: "#8A8D91" },
        { nombre: "Gris plomo", precioBase: "ESMALTE SINTETICO GRIS PLOMO 3 EN 1", hex: "#5C6066" },
        { nombre: "Azul marino", precioBase: "ESMALTE SINTETICO AZUL MARINO 3 EN 1", hex: "#1B2A56" },
        { nombre: "Azul Traful", precioBase: "ESMALTE SINTETICO AZUL TRAFUL 3 EN 1", hex: "#2E5C9E" },
        { nombre: "Azulejo", precioBase: "ESMALTE SINTETICO AZULEJO 3 EN 1", hex: "#3E7FC1" },
        { nombre: "Verde inglés", precioBase: "ESMALTE SINTETICO VERDE INGLES 3 EN 1", hex: "#1F4D35" },
        { nombre: "Verde noche", precioBase: "ESMALTE SINTETICO VERDE NOCHE", hex: "#12362A" },
        { nombre: "Verde Metalfor", precioBase: "ESMALTE SINTETICO VERDE METALFOR 3 EN 1", hex: "#2F7A3E" },
        { nombre: "Amarillo mediano", precioBase: "ESMALTE SINTETICO AMARILLO MEDIANO 3 EN 1", hex: "#F2C11B" },
        { nombre: "Naranja vial", precioBase: "ESMALTE SINTETICO NARANJA VIAL 3 EN 1", hex: "#F0701C" },
        { nombre: "Bermellón", precioBase: "ESMALTE SINTETICO BERMELLON 3 EN 1", hex: "#C8291F" },
        { nombre: "Ladrillo antiguo", precioBase: "ESMALTE SINTETICO LADRILLO ANTIGUO 3 EN 1", hex: "#8E4A2E" },
        { nombre: "Ocre", precioBase: "ESMALTE SINTETICO OCRE 3 EN 1", hex: "#B7862B" },
        { nombre: "Base Accent (para entonar)", precioBase: "ESMALTE SINTETICO BASE ACCENT 3 EN 1", hex: "#E9E9E9" },
        { nombre: "Base Deep (para entonar)", precioBase: "ESMALTE SINTETICO BASE DEEP 3 EN 1", hex: "#DADADA" },
      ],
      nota: "Los colores de fábrica van tal cual; con las bases Accent y Deep se entona cualquier color de la carta." },

    // ── IMPERMEABILIZACIÓN ───────────────────────────────────────────────
    { id: "frentes-muros", linea: "imperm", nombre: "Impermeabilizante Frentes y Muros",
      acabado: "Semi mate", precioBase: "IMPERMEABILIZANTE FRENTES Y MUROS",
      usos: "Frentes y muros exteriores de revoque, ladrillo, hormigón visto, material para frentes.",
      porque: "Cuando el frente chupa agua y aparece humedad adentro, un látex común no alcanza: éste forma una película elástica que no deja pasar el agua y acompaña las microfisuras sin cuartearse.",
      caracteristicas: ["Máxima blancura", "Óptimo comportamiento a la intemperie", "Excelente elasticidad"],
      rendimiento: { min: 8, max: 10, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "carta", nota: "Blanco, entonador y 500 colores pasteles y de mediana intensidad de la carta." },
    { id: "membrana-techos", linea: "imperm", nombre: "Membrana Líquida Techos Premium",
      acabado: "Semi mate", precioBase: "MEMBRANA LIQUIDA PARA TECHO",
      usos: "Techos y terrazas de fibrocemento, tejas, baldosas calcáreas, carpeta de cemento.",
      porque: "Es la solución de la gotera sin levantar el techo: se aplica como pintura, forma una membrana continua sin juntas y se refuerza con venda en las grietas. 1 kg por m².",
      caracteristicas: ["Gran rendimiento", "Previene filtraciones", "Excelente adhesión y cohesión"],
      rendimiento: { min: 1, max: 1, unidad: "kgm2" }, presentaciones: ["4 KG", "10 KG", "20 KG"],
      colores: "carta", nota: "Blanco, entonador y 500 colores pasteles. No apta para tanques de agua potable ni inmersión." },

    // ── REVESTIMIENTOS ───────────────────────────────────────────────────
    { id: "base-revestimiento", linea: "revest", nombre: "Base para Revestimiento",
      acabado: "Semi mate", precioBase: "BASE REVESTIMIENTO",
      usos: "Paredes interiores y exteriores donde después va un texturado.",
      porque: "Es la mano previa que ancla el texturado, empareja la absorción y ya impermeabiliza. Del mismo color que el revestimiento, así no se ve el fondo en las juntas.",
      caracteristicas: ["Mayor anclaje del revestimiento", "Fácil aplicación", "Impermeabilizante"],
      rendimiento: { min: 10, max: 12, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "carta", nota: "Blanco, entonador y pasteles; con el sistema tintométrico se logra un tono similar al del texturado elegido." },
    { id: "texturado-premium", linea: "revest", nombre: "Revestimiento Texturado Premium",
      acabado: "Mate · grano fino o medio", precioBase: null,
      usos: "Frentes de mampostería, ladrillo, bloques, sistemas EIFS; sobre revoque grueso fratasado, fino, placas de yeso, madera.",
      porque: "Reemplaza el revoque fino más la pintura: una sola pasada deja el frente terminado, impermeable y disimula las imperfecciones del revoque. Aguanta la intemperie años.",
      caracteristicas: ["Ideal para disimular imperfecciones", "Impermeable", "Excelente resistencia a la intemperie"],
      rendimiento: { min: 1.5, max: 3, unidad: "kgm2" }, presentaciones: ["13 KG", "27 KG", "300 KG tambor"],
      colores: "variantes",
      variantes: [
        { nombre: "Grano fino (1,5 a 2,5 kg/m² · llana, rodillo de lana o tolva)", precioBase: "TEXTURADO GRANO FINO PREMIUM", hex: "#E9E4DA" },
        { nombre: "Grano medio (2 a 3 kg/m² · llana o tolva)", precioBase: "TEXTURADO GRANO MEDIO PREMIUM", hex: "#E3DDD1" },
      ],
      nota: "Blanco, entonador, pasteles y 900 colores del sistema tintométrico. Antes va la Base para Revestimiento." },
    { id: "texturado-medio-pc2", linea: "revest", nombre: "Texturado Medio PC2",
      acabado: "Mate", precioBase: null,
      usos: "Mismos usos que el Premium, en la línea económica.",
      porque: "Flexible, lavable e impermeable, y reemplaza el revoque fino. Viene en colores fijos listos para usar (30 kg).",
      caracteristicas: ["Flexible, lavable, impermeable", "Excelente rendimiento y durabilidad", "Reemplaza revoque fino"],
      rendimiento: { min: 2, max: 3, unidad: "kgm2" }, presentaciones: ["30 KG", "300 KG tambor"],
      colores: "variantes",
      variantes: ["ANCONA", "ASTI", "BARI", "LODI", "MILAN", "NAPOLES", "PARMA", "PISA", "RIETI", "TURIN"].map(function (c) {
        var n = c.charAt(0) + c.slice(1).toLowerCase(); n = n.replace("Milan", "Milán").replace("Napoles", "Nápoles").replace("Turin", "Turín");
        return { nombre: n, precioBase: "PC2 TEXTURADO MEDIO " + c, hex: null };
      }),
      nota: "Colores de fábrica: Ancona, Asti, Bari, Lodi, Milán, Nápoles, Parma, Pisa, Rieti y Turín." },

    // ── PREPARACIÓN DE SUPERFICIES ───────────────────────────────────────
    { id: "fijador-sellador", linea: "prep", nombre: "Fijador Sellador Concentrado",
      acabado: "Mate · incoloro", precioBase: "FIJADOR SELLADOR CONCENTRADO",
      usos: "Preparar paredes nuevas, tizadas o enduidas antes de pintar o empapelar; adentro y afuera.",
      porque: "Sella y uniforma la pared: la pintura no se chupa en un lado y en otro no, y rinde más. Va diluido 1 parte de fijador en 3 de agua — un litro hace mucho.",
      caracteristicas: ["Sella y uniforma superficies", "Facilita el pintado", "Mejor rendimiento de la pintura", "Dilución 1:3 con agua"],
      rendimiento: { min: 10, max: 20, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "ninguno", nota: "Incoloro. Permite entonador universal." },
    { id: "fijador-aguarras", linea: "prep", nombre: "Fijador al Aguarrás",
      acabado: "Mate · incoloro", precioBase: "FIJADOR AL AGUARRAS",
      usos: "Paredes muy tizadas, pulverulentas o viejas, adentro y afuera, antes del impermeabilizante o el látex.",
      porque: "Cuando la pared suelta polvo al pasar la mano, el fijador al agua no ancla: éste penetra y consolida. Deja la superficie mate y lista.",
      caracteristicas: ["Mejora la adherencia de la pintura de terminación", "Confiere mayor resistencia al roce"],
      rendimiento: { min: 10, max: 20, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L"],
      colores: "ninguno", nota: "Incoloro." },
    { id: "enduido", linea: "prep", nombre: "Enduido",
      acabado: "Mate · blanco", precioBase: "ENDUIDO",
      usos: "Reparar y emparejar paredes interiores de yeso, concreto o mampostería: fisuras, poros, grietas.",
      porque: "Corrige las imperfecciones antes de pintar y se lija fácil. 1 kg hace 2 a 3 m² con 1 mm de espesor.",
      caracteristicas: ["Corrige imperfecciones", "Muy buena lijabilidad y adherencia"],
      rendimiento: { min: 2, max: 3, unidad: "m2kg" }, presentaciones: ["1,5 KG", "6,5 KG", "15 KG", "25 KG"],
      colores: "ninguno", nota: "Blanco. Sólo interiores." },
    { id: "masilla-yeso", linea: "prep", nombre: "Masilla para Placa de Yeso",
      acabado: "Mate · blanco", precioBase: "MASILLA PARA PLACA DE YESO",
      usos: "Juntas, tornillos y cantoneras de durlock; también reemplaza al enduido en paredes comunes con más relleno.",
      porque: "Mucho poder de relleno y mínima retracción al secar: la junta no se marca después. 0,8 kg/m² para juntas y tornillos, 1,4 con una mano total.",
      caracteristicas: ["Muy fácil de aplicar", "Alto poder de relleno", "Mínima retracción al secar"],
      rendimiento: { min: 0.8, max: 1.65, unidad: "kgm2" }, presentaciones: ["1,5 KG", "6,5 KG", "15 KG", "25 KG"],
      colores: "ninguno", nota: "Blanco." },
    { id: "antioxido", linea: "prep", nombre: "Antióxido",
      acabado: "Mate", precioBase: null,
      usos: "Fondo para hierro y metales ferrosos, adentro y afuera, antes del esmalte.",
      porque: "Sobre hierro nuevo o con óxido, la mano de antióxido es la que hace que el esmalte dure. Rinde 13 m² por litro.",
      caracteristicas: ["Protección de metales ferrosos", "Muy buen comportamiento sobre metal nuevo"],
      rendimiento: { min: 13, max: 13, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L", "20 L"],
      colores: "variantes",
      variantes: [
        { nombre: "Rojo", precioBase: "ANTIOXIDO ROJO", hex: "#9E3A2A" },
        { nombre: "Gris obra", precioBase: "ANTIOXIDO GRIS OBRA", hex: "#7C7F83" },
      ], nota: "" },

    // ── MADERAS ──────────────────────────────────────────────────────────
    { id: "barniz-sintetico", linea: "madera", nombre: "Barniz Sintético",
      acabado: "Brillante, satinado o mate", precioBase: null,
      usos: "Proteger y embellecer madera: muebles, aberturas, revestimientos.",
      porque: "Terminación pareja y dura, buena nivelación (no deja marcas de pincel). Elegís el brillo.",
      caracteristicas: ["Excelente terminación y brillo", "Óptima dureza final", "Buena pintabilidad y nivelación"],
      rendimiento: { min: 10, max: 12, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L", "20 L"],
      colores: "variantes",
      variantes: [
        { nombre: "Brillante", precioBase: "BARNIZ SINTETICO BRILLANTE", hex: "#C58B3F" },
        { nombre: "Satinado", precioBase: "BARNIZ SINTETICO SATINADO", hex: "#BF8A48" },
        { nombre: "Mate", precioBase: "BARNIZ SINTETICO MATE", hex: "#B58A55" },
      ], nota: "Incoloro; admite tintas." },
    { id: "barniz-marino", linea: "madera", nombre: "Barniz Marino",
      acabado: "Brillante", precioBase: "BARNIZ MARINO",
      usos: "Madera a la intemperie: aberturas, decks, portones, muebles de exterior.",
      porque: "Filtra los rayos UV y es flexible: acompaña el movimiento de la madera con el sol y la lluvia sin cuartearse. Para afuera va éste, no el sintético común.",
      caracteristicas: ["Protección frente a rayos UV", "Notable flexibilidad", "Elevada resistencia a la intemperie"],
      rendimiento: { min: 10, max: 12, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L", "20 L"],
      colores: "ninguno", nota: "Incoloro; admite tintas." },
    { id: "impregnante", linea: "madera", nombre: "Impregnante para Maderas",
      acabado: "Brillante", precioBase: "IMPREGNANTE PARA MADERA",
      usos: "Madera de exterior que se quiere dejar al natural: pérgolas, decks, cercos.",
      porque: "No forma película: penetra, repele el agua y filtra UV. Cuando se gasta se vuelve a dar sin lijar todo. El que más rinde: 14 a 16 m² por litro.",
      caracteristicas: ["Repele agua", "Filtra rayos UV", "Resiste el ataque de microorganismos"],
      rendimiento: { min: 14, max: 16, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L", "20 L"],
      colores: "ninguno", nota: "Incoloro; admite tintas." },
    { id: "fondo-maderas", linea: "madera", nombre: "Fondo Blanco para Maderas",
      acabado: "Mate", precioBase: "FONDO BLANCO DE MADERA",
      usos: "Madera nueva que se va a pintar con esmalte, adentro o afuera.",
      porque: "Sella los poros: el esmalte de arriba cubre con menos manos y no se chupa. Se lija muy bien.",
      caracteristicas: ["Sella poros de la madera", "Aumenta la cobertura de la pintura", "Excelente lijabilidad"],
      rendimiento: { min: 10, max: 10, unidad: "m2l" }, presentaciones: ["500 ML", "1 L", "4 L", "20 L"],
      colores: "blanco", nota: "Blanco. Permite entonador universal." },

    // ── PISOS Y PILETAS ──────────────────────────────────────────────────
    { id: "pintura-piso", linea: "pisos", nombre: "Pintura para Pisos",
      acabado: "Colores de fábrica", precioBase: null,
      usos: "Pisos de cemento, galerías, garajes, canchas.",
      porque: "Formulada para el tránsito: adherencia y dureza sobre cemento. Elegís el color de fábrica.",
      caracteristicas: ["Para pisos de cemento", "Colores listos para usar"],
      rendimiento: { min: 8, max: 10, unidad: "m2l" }, presentaciones: ["4 L", "10 L", "20 L"],
      colores: "variantes",
      variantes: [
        { nombre: "Gris claro", precioBase: "PINTURA PARA PISO GRIS CLARO", hex: "#B9BBBE" },
        { nombre: "Gris oscuro", precioBase: "PINTURA PARA PISO GRIS OSCURO", hex: "#5F6266" },
        { nombre: "Blanco", precioBase: "PINTURA PARA PISO BLANCO", hex: "#F1F1EE" },
        { nombre: "Negro", precioBase: "PINTURA PARA PISO NEGRO", hex: "#1A1B1D" },
        { nombre: "Arena", precioBase: "PINTURA PARA PISO ARENA", hex: "#D8C39A" },
        { nombre: "Terra", precioBase: "PINTURA PARA PISO TERRA", hex: "#9E4F2E" },
        { nombre: "Rojo vial", precioBase: "PINTURA PARA PISO ROJO VIAL", hex: "#B7241C" },
        { nombre: "Amarillo vial", precioBase: "PINTURA PARA PISO AMARILLO VIAL", hex: "#F0BE1A" },
        { nombre: "Azul", precioBase: "PINTURA PARA PISO AZUL", hex: "#2350A0" },
        { nombre: "Verde paddle", precioBase: "PINTURA PARA PISO VERDE PADDLE", hex: "#2E7A4B" },
      ], nota: "Rendimiento estimado; consultar la ficha del color elegido." },
    { id: "poliuretanico-pisos", linea: "pisos", nombre: "Esmalte Poliuretánico para Pisos (interior)",
      acabado: "Brillante", precioBase: "ESMALTE POLIURETANICO INTERIOR P/PISOS",
      usos: "Pisos interiores de madera o cemento con mucho tránsito.",
      porque: "Más duro y resistente a la abrasión que un esmalte común: para pisos que se pisan todo el día.",
      caracteristicas: ["Alta dureza", "Resistencia a la abrasión"],
      rendimiento: { min: 10, max: 12, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "20 L"],
      colores: "ninguno", nota: "Rendimiento estimado; consultar la ficha." },
    { id: "piscina", linea: "pisos", nombre: "Pintura para Piscina",
      acabado: "Mate", precioBase: null,
      usos: "Piletas de hormigón o revoque; también baños, vestuarios, fuentes.",
      porque: "Coloración intensa que dura, resiste el agua y los productos de mantenimiento, e inhibe hongos y verdín.",
      caracteristicas: ["Coloración intensa", "Gran resistencia y durabilidad", "Inhibe hongos y verdín"],
      rendimiento: { min: 10, max: 12, unidad: "m2l" }, presentaciones: ["4 L", "10 L", "20 L"],
      colores: "variantes",
      variantes: [
        { nombre: "Caribe", precioBase: "PINTURA PARA PISCINA CARIBE", hex: "#3FB0D8" },
        { nombre: "Océano", precioBase: "PINTURA PARA PISCINA OCEANO", hex: "#1F6FB0" },
        { nombre: "Paraíso", precioBase: "PINTURA PARA PISCINA PARAISO", hex: "#57C4C9" },
        { nombre: "Desierto", precioBase: "PINTURA PARA PISCINA DESIERTO", hex: "#D9C59C" },
      ], nota: "" },
    { id: "pileta-caucho", linea: "pisos", nombre: "Pileta Caucho Acrílico",
      acabado: "Brillante · azul intenso", precioBase: "PILETA CAUCHO ACRILICO",
      usos: "Piletas de natación plásticas (fibra).",
      porque: "Sobre la pileta de fibra la pintura común no agarra: el caucho acrílico adhiere y aguanta la abrasión.",
      caracteristicas: ["Muy buena resistencia a la abrasión", "Excelente adherencia y dureza"],
      rendimiento: { min: 8, max: 10, unidad: "m2l" }, presentaciones: ["4 L", "20 L"],
      colores: "ninguno", nota: "Azul intenso." },

    // ── CAMPO Y LADRILLOS ────────────────────────────────────────────────
    { id: "tranquera", linea: "campo", nombre: "Pintura para Tranqueras",
      acabado: "Mate · blanco", precioBase: "PINTURA PARA TRANQUERA",
      usos: "Tranqueras, alambrados, postes y madera de campo a la intemperie.",
      porque: "Pensada para el campo: muy buena resistencia a la intemperie, impermeable e hidrorrepelente, e inhibe hongos.",
      caracteristicas: ["Muy buena resistencia a la intemperie", "Inhibe crecimiento de hongos", "Impermeable e hidrorrepelente"],
      rendimiento: { min: 10, max: 12, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "blanco", nota: "Blanco." },
    { id: "ladrillos", linea: "campo", nombre: "Impregnante para Ladrillos Siliconado",
      acabado: "Satinado · incoloro", precioBase: "IMPREGNANTE PARA LADRILLOS SILICONADO",
      usos: "Ladrillo visto, piedra natural o artificial, tejas, cemento; adentro y afuera (no para pisos).",
      porque: "Impermeabiliza el ladrillo sin cambiarle el color y lo protege de la suciedad, los hongos y las manchas de humedad.",
      caracteristicas: ["Impermeabilizante", "Protege de suciedad, hongos y manchas"],
      rendimiento: { min: 4, max: 6, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "20 L"],
      colores: "ninguno", nota: "Incoloro." },
    { id: "ladrillo-visto", linea: "campo", nombre: "Ladrillo Visto — Recubrimiento Especial",
      acabado: "Satinado", precioBase: "LADRILLO VISTO RECUBRIMIENTO ESPECIAL",
      usos: "Ladrillo visto que se quiere realzar y proteger.",
      porque: "Recubrimiento con terminación satinada que aviva el color del ladrillo y lo impermeabiliza.",
      caracteristicas: ["Realza el color", "Impermeabiliza"],
      rendimiento: { min: 4, max: 6, unidad: "m2l" }, presentaciones: ["1 L", "4 L", "10 L", "20 L"],
      colores: "ninguno", nota: "Rendimiento estimado; consultar la ficha." },
  ],

  // Las fotos donde se prueba el color: la máscara dice qué parte es pared.
  // Accesorios y herramientas (accesorios.js): se agrupan así en la página.
  gruposAccesorios: ["Rodillos", "Pinceles", "Kits para pintar", "Bandejas y cubetas", "Extensores, altura y traslado", "Espátulas y llanas", "Lijas", "Para preparar y mezclar", "Cubrir y enmascarar", "Vendas, mallas y membranas", "Guantes y protección"],

  fotos: [
    { id: "frente",     nombre: "El frente",   src: "fotos/frente.jpg",     mascara: "fotos/frente-mascara.png",     w: 1200, h: 660 },
    { id: "living",     nombre: "El living",   src: "fotos/living.jpg",     mascara: "fotos/living-mascara.png",     w: 1200, h: 674 },
    { id: "dormitorio", nombre: "El dormitorio", src: "fotos/dormitorio.jpg", mascara: "fotos/dormitorio-mascara.png", w: 1200, h: 798 },
  ],
};
