const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// Datos de productos por categoría
// ========================================
const PRODUCTOS = {
  aspirante: {
    slug: 'aspirante',
    nombre: 'Aspirante / Expelente',
    descripcion: 'Mangueras diseñadas para succión y descarga de líquidos en aplicaciones industriales exigentes. Resistentes a la corrosión, productos químicos y abrasión.',
    icono: 'fa-faucet-drip',
    items: [
      {
        id: 'asp-1',
        nombre: 'Aspirante/Expelente 1"',
        descripcion: 'Manguera flexible de PVC reforzada con textil de poliéster. Ideal para bombas de vacío y trasvase de agua con partículas en suspensión.',
        especificaciones: {
          'Diámetro interior': '25 mm (1")',
          'Presión máx.': '6 bar',
          'Temperatura': '-10°C a 60°C',
          'Refuerzo': 'Textile de poliéster',
          'Cubierta': 'PVC flexible negro'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Asp+1%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Bomba+de+vacu%C3%ADo',
          'https://placehold.co/600x400/293241/98c1d9?text=Trasvase+industrial',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Sistema+de+drenaje'
        ]
      },
      {
        id: 'asp-2',
        nombre: 'Aspirante/Expelente 2"',
        descripcion: 'Alta capacidad de caudal para instalaciones que requieren mayor volumen de fluido. Espiral de PVC rígido incorporado para evitar colapso bajo vacío.',
        especificaciones: {
          'Diámetro interior': '50 mm (2")',
          'Presión máx.': '5 bar',
          'Temperatura': '-10°C a 60°C',
          'Refuerzo': 'Espiral PVC + textile',
          'Cubierta': 'PVC flexible negro'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Asp+2%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Aspiraci%C3%B3n+tanque',
          'https://placehold.co/600x400/293241/98c1d9?text=Descarga+cisterna',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Riego+industrial'
        ]
      },
      {
        id: 'asp-3',
        nombre: 'Aspirante/Expelente 3"',
        descripcion: 'Versión de gran diámetro para caudales industriales elevados. Construcción robusta con triple capa para máxima durabilidad en entornos agresivos.',
        especificaciones: {
          'Diámetro interior': '75 mm (3")',
          'Presión máx.': '4 bar',
          'Temperatura': '-10°C a 60°C',
          'Refuerzo': 'Espiral PVC + textile doble',
          'Cubierta': 'PVC flexible negro'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Asp+3%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Planta+industrial',
          'https://placehold.co/600x400/293241/98c1d9?text=Descarga+camion',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Mineria'
        ]
      },
      {
        id: 'asp-4',
        nombre: 'Aspirante/Expelente 4"',
        descripcion: 'Manguera de gran porte para industria pesada. Diseñada para trabajar en condiciones de alta exigencia con fluidos abrasivos o viscosos.',
        especificaciones: {
          'Diámetro interior': '100 mm (4")',
          'Presión máx.': '3.5 bar',
          'Temperatura': '-10°C a 60°C',
          'Refuerzo': 'Espiral acero + textile',
          'Cubierta': 'PVC flexible negro'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Asp+4%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Industria+pesada',
          'https://placehold.co/600x400/293241/98c1d9?text=Fluidos+viscosos',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Construccion'
        ]
      }
    ]
  },

  generales: {
    slug: 'generales',
    nombre: 'Usos Generales',
    descripcion: 'Mangueras versátiles para aplicaciones domésticas e industriales. Flexibles, livianas y fáciles de manipular. Disponibles en múltiples diámetros y longitudes.',
    icono: 'fa-layer-group',
    items: [
      {
        id: 'gen-1',
        nombre: 'Cristal Flexible 3/4"',
        descripcion: 'Manguera transparente de PVC puro. Permite visualizar el flujo del fluido. Apta para agua, aceites ligeros y productos alimenticios.',
        especificaciones: {
          'Diámetro interior': '19 mm (3/4")',
          'Longitudes': '15m, 30m, 50m',
          'Temperatura': '-5°C a 55°C',
          'Material': 'PVC cristal 100%',
          'Usos': 'Agua, aceite, alimentos'
        },
        imagen: 'https://placehold.co/400x300/3d5a80/e0fbfc?text=Cristal+3%2F4%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Nivel+de+agua',
          'https://placehold.co/600x400/293241/98c1d9?text=Laboratorio',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Alimentos'
        ]
      },
      {
        id: 'gen-2',
        nombre: 'Multiuso Flexible 1"',
        descripcion: 'Manguera de PVC flexible en color negro. Resiste el paso del tiempo y los efectos del ozono. Para aire comprimido, agua y fluidos no agresivos.',
        especificaciones: {
          'Diámetro interior': '25 mm (1")',
          'Longitudes': '15m, 30m, 50m',
          'Temperatura': '-10°C a 60°C',
          'Material': 'PVC flexible negro',
          'Usos': 'Aire, agua, polvo'
        },
        imagen: 'https://placehold.co/400x300/3d5a80/e0fbfc?text=Multiuso+1%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Aire+comprimido',
          'https://placehold.co/600x400/293241/98c1d9?text=Taller+mecanico',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Aspiracion+polvo'
        ]
      },
      {
        id: 'gen-3',
        nombre: 'Corrugada Liviana 2"',
        descripcion: 'Diseño corrugado que permite máxima flexibilidad con mínimo radio de curvatura. Liviana y compacta para instalaciones en espacios reducidos.',
        especificaciones: {
          'Diámetro interior': '50 mm (2")',
          'Longitudes': '5m, 10m, 25m',
          'Temperatura': '-20°C a 60°C',
          'Material': 'PVC corrugado liviano',
          'Usos': 'Extracción de humos, ventilación'
        },
        imagen: 'https://placehold.co/400x300/3d5a80/e0fbfc?text=Corrugada+2%22',
        imagenesUso: [
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Ventilacion',
          'https://placehold.co/600x400/293241/98c1d9?text=Extraccion+humos',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=HVAC'
        ]
      }
    ]
  },

  presion: {
    slug: 'presion',
    nombre: 'Alta Presión',
    descripcion: 'Mangueras de alta presión para trabajos exigentes en industria, minería y construcción. Refuerzo de trenzado de acero para máxima resistencia.',
    icono: 'fa-gauge-high',
    items: [
      {
        id: 'pre-1',
        nombre: 'Presión Media 10 bar',
        descripcion: 'Manguera reforzada con trenzado de poliéster para aplicaciones de media presión. Cubierta anti-abrasión resistente a aceites e hidrocarburos.',
        especificaciones: {
          'Presión de trabajo': '10 bar',
          'Presión de rotura': '30 bar',
          'Temperatura': '-20°C a 60°C',
          'Refuerzo': 'Trenzado de poliéster',
          'Cubierta': 'PVC anti-abrasión'
        },
        imagen: 'https://placehold.co/400x300/1a2130/ee6c4d?text=10+bar',
        imagenesUso: [
          'https://placehold.co/600x400/1a2130/ee6c4d?text=Manguera+agua',
          'https://placehold.co/600x400/293241/f48a6a?text=Jardiner%C3%ADa+industrial',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Lavado+a+presi%C3%B3n'
        ]
      },
      {
        id: 'pre-2',
        nombre: 'Presión Alta 16 bar',
        descripcion: 'Construcción robusta con doble trenzado de acero. Apta para hidráulica de baja presión, líneas de agua a presión y sistemas de pulverización.',
        especificaciones: {
          'Presión de trabajo': '16 bar',
          'Presión de rotura': '48 bar',
          'Temperatura': '-25°C a 70°C',
          'Refuerzo': 'Doble trenzado acero',
          'Cubierta': 'PVC anti-abrasión negro'
        },
        imagen: 'https://placehold.co/400x300/1a2130/ee6c4d?text=16+bar',
        imagenesUso: [
          'https://placehold.co/600x400/1a2130/ee6c4d?text=Hidraulica',
          'https://placehold.co/600x400/293241/f48a6a?text=Pulverizacion',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Mineria'
        ]
      },
      {
        id: 'pre-3',
        nombre: 'Presión Máxima 20 bar',
        descripcion: 'La opción de mayor resistencia de la línea. Triple refuerzo de acero de alta resistencia. Para aplicaciones industriales críticas y equipos de alta demanda.',
        especificaciones: {
          'Presión de trabajo': '20 bar',
          'Presión de rotura': '60 bar',
          'Temperatura': '-30°C a 80°C',
          'Refuerzo': 'Triple trenzado acero AR',
          'Cubierta': 'PVC EPDM anti-abrasión'
        },
        imagen: 'https://placehold.co/400x300/1a2130/ee6c4d?text=20+bar',
        imagenesUso: [
          'https://placehold.co/600x400/1a2130/ee6c4d?text=Industria+pesada',
          'https://placehold.co/600x400/293241/f48a6a?text=Construccion',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Equipos+criticos'
        ]
      }
    ]
  },

  hogar: {
    slug: 'hogar',
    nombre: 'Hogar y Jardín',
    descripcion: 'Mangueras para el hogar y jardín. Anti-UV, anti-algas y resistentes a las condiciones climáticas. Compatibles con conectores rápidos estándar.',
    icono: 'fa-house-chimney',
    items: [
      {
        id: 'hog-1',
        nombre: 'Jardín Clásica',
        descripcion: 'Manguera de jardín básica para riego cotidiano. Liviana y fácil de enrollar. Resistente a los rayos UV para uso en exteriores todo el año.',
        especificaciones: {
          'Diámetro interior': '13 mm (1/2")',
          'Longitudes': '15m, 25m, 50m',
          'Temperatura': '0°C a 50°C',
          'Material': 'PVC anti-UV',
          'Garantía': '3 años'
        },
        imagen: 'https://placehold.co/400x300/293241/98c1d9?text=Clasica',
        imagenesUso: [
          'https://placehold.co/600x400/293241/98c1d9?text=Riego+jardin',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Lavado+auto',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Limpieza+exterior'
        ]
      },
      {
        id: 'hog-2',
        nombre: 'Jardín Reforzada',
        descripcion: 'Con capa intermedia de refuerzo textil. Mayor resistencia a retorcimientos y aplastamiento. Ideal para uso intensivo o profesional en jardines y huertos.',
        especificaciones: {
          'Diámetro interior': '13 mm (1/2")',
          'Longitudes': '20m, 50m',
          'Temperatura': '-5°C a 55°C',
          'Material': 'PVC + textile anti-torsión',
          'Garantía': '5 años'
        },
        imagen: 'https://placehold.co/400x300/293241/98c1d9?text=Reforzada',
        imagenesUso: [
          'https://placehold.co/600x400/293241/98c1d9?text=Huerto',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Riego+profesional',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Mantenimiento'
        ]
      },
      {
        id: 'hog-3',
        nombre: 'Plana Enrrollable',
        descripcion: 'Diseño plano que se enrolla compactamente cuando no se usa. Ocupa mínimo espacio de almacenamiento. Se expande al llenarse de agua.',
        especificaciones: {
          'Diámetro interior': '19 mm expandida',
          'Longitudes': '15m, 30m',
          'Temperatura': '0°C a 45°C',
          'Material': 'PVC laminado plano',
          'Garantía': '2 años'
        },
        imagen: 'https://placehold.co/400x300/293241/98c1d9?text=Plana',
        imagenesUso: [
          'https://placehold.co/600x400/293241/98c1d9?text=Almacenamiento',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Balcon',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Espacio+reducido'
        ]
      }
    ]
  },

  cintas: {
    slug: 'cintas',
    nombre: 'Cintas',
    descripcion: 'Cintas de PVC, tela y vinilo para sellado, aislación eléctrica, embalaje y fijación. Resistentes a la intemperie y a productos químicos.',
    icono: 'fa-tape',
    items: [
      {
        id: 'cin-1',
        nombre: 'Cinta Aisladora 19mm',
        descripcion: 'Cinta de PVC autoadhesiva para aislación eléctrica de bajo y medio voltaje. Ignífuga, elástica y resistente a la humedad.',
        especificaciones: {
          'Ancho': '19 mm',
          'Longitud': '20m por rollo',
          'Temperatura': '-10°C a 80°C',
          'Adhesivo': 'Caucho natural',
          'Colores': 'Negro, rojo, verde, amarillo'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Aisladora+19mm',
        imagenesUso: [
          'https://placehold.co/600x400/293241/e0fbfc?text=Aislacion+electrica',
          'https://placehold.co/600x400/3d5a80/98c1d9?text=Cableado',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Instalaciones'
        ]
      },
      {
        id: 'cin-2',
        nombre: 'Cinta Multiuso 25mm',
        descripcion: 'Cinta polivalente para sellado, embalaje y reparaciones temporales. Alta resistencia al desgarro y buena adherencia sobre superficies irregulares.',
        especificaciones: {
          'Ancho': '25 mm',
          'Longitud': '50m por rollo',
          'Temperatura': '-5°C a 60°C',
          'Adhesivo': 'Acrílico de alto rendimiento',
          'Colores': 'Transparente, negro, gris'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Multiuso+25mm',
        imagenesUso: [
          'https://placehold.co/600x400/293241/e0fbfc?text=Embalaje',
          'https://placehold.co/600x400/3d5a80/98c1d9?text=Sellado',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Reparacion'
        ]
      },
      {
        id: 'cin-3',
        nombre: 'Cinta Industrial 48mm',
        descripcion: 'Cinta reforzada de alta resistencia para aplicaciones industriales. Doble capa con refuerzo de fibra de vidrio. Resistente a solventes y aceites.',
        especificaciones: {
          'Ancho': '48 mm',
          'Longitud': '25m por rollo',
          'Temperatura': '-20°C a 90°C',
          'Adhesivo': 'Caucho sintético reforzado',
          'Colores': 'Negro, gris industrial'
        },
        imagen: 'https://placehold.co/400x300/293241/e0fbfc?text=Industrial+48mm',
        imagenesUso: [
          'https://placehold.co/600x400/293241/e0fbfc?text=Industria',
          'https://placehold.co/600x400/3d5a80/98c1d9?text=Sellado+alta+temp',
          'https://placehold.co/600x400/1a2130/e0fbfc?text=Resistencia+quimica'
        ]
      }
    ]
  },

  norres: {
    slug: 'norres',
    nombre: 'Línea NORRES',
    descripcion: 'Mangueras técnicas de alta tecnología importadas directamente de Alemania (NORRES Schlauchtechnik). Representante exclusivo en Argentina desde 2006. Certificadas FDA y ATEX.',
    icono: 'fa-award',
    items: [
      {
        id: 'nor-1',
        nombre: 'AIRDUC® PUR 351',
        descripcion: 'Manguera de poliuretano para transporte de aire y gases. Extremadamente flexible y resistente a la abrasión. Ideal para aspiración de polvo y virutas metálicas.',
        especificaciones: {
          'Material': 'Poliuretano (PUR)',
          'Temperatura': '-40°C a 90°C',
          'Espiral': 'Acero galvanizado',
          'Certificación': 'RoHS',
          'Flexibilidad': 'Muy alta (radio mín. 1x DN)'
        },
        imagen: 'https://placehold.co/400x300/1a2130/ee6c4d?text=AIRDUC+351',
        imagenesUso: [
          'https://placehold.co/600x400/1a2130/ee6c4d?text=Aspiracion+virutas',
          'https://placehold.co/600x400/293241/f48a6a?text=CNC+maquinaria',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Carpinteria+ind.'
        ]
      },
      {
        id: 'nor-2',
        nombre: 'FOOD IN PVC 375',
        descripcion: 'Manguera de PVC cristal para la industria alimentaria. Certificada FDA para contacto con alimentos. Transparente para control visual del fluido.',
        especificaciones: {
          'Material': 'PVC cristal alimentario',
          'Temperatura': '-10°C a 60°C',
          'Certificación': 'FDA 21 CFR, EU 10/2011',
          'Color': 'Transparente',
          'Usos': 'Lácteos, bebidas, alimentos'
        },
        imagen: 'https://placehold.co/400x300/1a2130/ee6c4d?text=FOOD+IN+375',
        imagenesUso: [
          'https://placehold.co/600x400/1a2130/ee6c4d?text=Industria+lactea',
          'https://placehold.co/600x400/293241/f48a6a?text=Embotellado',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Bebidas'
        ]
      },
      {
        id: 'nor-3',
        nombre: 'FLAMEX® PUR 388 AS',
        descripcion: 'Manguera antiestática y retardante a la llama para zonas ATEX. Para transporte de polvos explosivos o inflamables en entornos con riesgo de ignición.',
        especificaciones: {
          'Material': 'Poliuretano antiestático',
          'Temperatura': '-40°C a 125°C',
          'Certificación': 'ATEX Cat. 2, EN 13463',
          'Resistencia eléctrica': '< 10⁶ Ω',
          'Usos': 'Polvos explosivos, solventes'
        },
        imagen: 'https://placehold.co/400x300/1a2130/ee6c4d?text=FLAMEX+388+AS',
        imagenesUso: [
          'https://placehold.co/600x400/1a2130/ee6c4d?text=Zona+ATEX',
          'https://placehold.co/600x400/293241/f48a6a?text=Polvos+explosivos',
          'https://placehold.co/600x400/3d5a80/e0fbfc?text=Petroquimica'
        ]
      }
    ]
  }
};

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Mi Landing Page',
    description: 'Bienvenido a nuestra landing page',
    homeBase: '' // en el home los anchors van directo: #hero, #about...
  });
});

// Ruta de categoría de productos
app.get('/productos/:categoria', (req, res) => {
  const slug = req.params.categoria;
  const categoria = PRODUCTOS[slug];

  if (!categoria) {
    return res.status(404).render('pages/index', {
      title: 'Categoría no encontrada — PLASTIMET',
      description: 'La categoría de productos solicitada no existe.'
    });
  }

  // Lista de categorías para el sidebar (nombre y slug de todas)
  const categorias = Object.values(PRODUCTOS).map((cat) => ({
    slug: cat.slug,
    nombre: cat.nombre,
    icono: cat.icono
  }));

  res.render('pages/categoria', {
    title: `${categoria.nombre} — PLASTIMET`,
    description: categoria.descripcion,
    categoria,
    categorias,
    homeBase: '/' // en páginas internas los anchors prefijan con /: /#hero, /#about...
  });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
