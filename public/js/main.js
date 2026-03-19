/**
 * main.js - JavaScript del cliente
 * Efecto typewriter para el hero, galería fan/abanico y contadores para Sobre Nosotros
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // Detectar preferencia de reduced-motion
  // ========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // Sección Contacto - Animaciones con Intersection Observer
  // ========================================
  const contactSection = document.getElementById('contact');
  
  if (contactSection && !prefersReducedMotion) {
    const contactPanel = contactSection.querySelector('.contact__form-panel');
    const contactFields = contactSection.querySelectorAll('.contact__field');
    const contactSubmit = contactSection.querySelector('.contact__submit');
    
    // Elementos a animar
    const animateElements = [
      contactPanel,
      ...contactSection.querySelectorAll('.contact__title, .contact__subtitle, .contact__form'),
      ...contactFields,
      contactSubmit
    ].filter(el => el);
    
    // Resetear animaciones inicialmente
    animateElements.forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = '0';
    });
    
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Activar línea de escaneo
          contactPanel.classList.add('contact__form-panel--animating');
          
          // Activar animaciones cuando la sección es visible
          contactPanel.style.animation = 'contactPanelIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          contactPanel.style.animationDelay = '0s';
          
          const title = contactSection.querySelector('.contact__title');
          const subtitle = contactSection.querySelector('.contact__subtitle');
          const form = contactSection.querySelector('.contact__form');
          
          if (title) {
            title.style.animation = 'fieldReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            title.style.animationDelay = '0.2s';
          }
          if (subtitle) {
            subtitle.style.animation = 'fieldReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            subtitle.style.animationDelay = '0.3s';
          }
          if (form) {
            form.style.animation = 'fieldReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            form.style.animationDelay = '0.4s';
          }
          
          // Campos con stagger
          contactFields.forEach((field, index) => {
            field.style.animation = 'fieldSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            field.style.animationDelay = `${0.5 + (index * 0.1)}s`;
          });
          
          // Botón con delay extra y animación especial de "convertirse"
          if (contactSubmit) {
            contactSubmit.style.animation = 'buttonTransformIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            contactSubmit.style.animationDelay = `${0.5 + (contactFields.length * 0.1)}s`;
          }
          
          // Unobserve después de activar
          contactObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    
    contactObserver.observe(contactSection);
  }

  // ========================================
  // Header - Scroll effect
  // ========================================
  const mainHeader = document.getElementById('mainHeader');
  
  if (mainHeader) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add('header--scrolled');
      } else {
        mainHeader.classList.remove('header--scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (navToggle && navList) {
    // Abre o cierra el overlay
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      const willOpen = !isOpen;
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navList.classList.toggle('nav__list--open', willOpen);
      navList.setAttribute('aria-hidden', String(!willOpen));
      // Bloquea el scroll del body mientras el menú está abierto
      document.body.style.overflow = willOpen ? 'hidden' : '';
    });

    // Cierra al hacer clic en cualquier link del overlay
    document.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('nav__list--open');
        navList.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Cierra con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('nav__list--open');
        navList.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  // ========================================
  // Typewriter Effect - Prefijo fijo + ciclo de palabras
  // ========================================
  const typewriterEl = document.getElementById('typewriter');
  const cursorEl = document.getElementById('cursor');
  const subtitleEl = document.getElementById('subtitle');
  const ctaButton = document.getElementById('heroCta');

  const prefixText = 'Calidad que fluye en ';
  const words = ['caños PVC', 'mangueras reforzadas', 'proyectos exigentes'];
  let wordIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;
  let deleteSpeed = 40;
  let pauseTime = 2500;

  if (typewriterEl) {
    if (prefersReducedMotion) {
      // Sin animaciones: mostrar texto estático directamente
      typewriterEl.style.opacity = '1';
      typewriterEl.innerHTML = `<span class="hero__title-prefix">${prefixText}</span><br><span class="hero__title-word">${words[0]}</span>`;
      if (subtitleEl) subtitleEl.classList.add('hero__subtitle--visible');
      if (ctaButton) ctaButton.classList.add('hero__cta--visible');
    } else {
      // Mostrar prefijo con fade in - palabra en nuevo renglón con cursor como hermano
      typewriterEl.innerHTML = `<span class="hero__title-prefix">${prefixText}</span><br><span class="hero__title-word"></span><span class="hero__cursor" id="cursor">|</span>`;
      typewriterEl.style.opacity = '1';

      const wordEl = typewriterEl.querySelector('.hero__title-word');

      if (subtitleEl) subtitleEl.classList.add('hero__subtitle--visible');
      if (ctaButton) ctaButton.classList.add('hero__cta--visible');

      function type() {
        const currentWord = words[wordIndex];
        const currentLength = wordEl.dataset.charCount || 0;

        if (!isDeleting) {
          wordEl.textContent = currentWord.substring(0, parseInt(currentLength) + 1);
          wordEl.dataset.charCount = parseInt(currentLength) + 1;

          if (wordEl.textContent.length >= currentWord.length) {
            isDeleting = true;
            typeSpeed = pauseTime;
          } else {
            typeSpeed = 80;
          }
        } else {
          wordEl.textContent = currentWord.substring(0, parseInt(currentLength) - 1);
          wordEl.dataset.charCount = parseInt(currentLength) - 1;

          if (wordEl.textContent.length <= 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            wordEl.dataset.charCount = 0;
            typeSpeed = 300;
          } else {
            typeSpeed = deleteSpeed;
          }
        }

        setTimeout(type, typeSpeed);
      }

      setTimeout(type, 800);
    }
  }

  // ========================================
  // Scroll parallax - Fade out + float up
  // ========================================
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');

  if (hero && heroContent) {
    let ticking = false;

    function onScroll() {
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      const ratio = Math.min(scrollY / heroHeight, 1);

      // Usar translate3d para forzar compositing en GPU y evitar jank
      heroContent.style.opacity = Math.max(0, 1 - ratio * 1.5);
      heroContent.style.transform = `translate3d(0, ${-scrollY * 0.35}px, 0)`;
      // Sin blur: filter:blur() en cada frame es demasiado costoso en GPU mobile

      if (scrollIndicator) {
        scrollIndicator.style.opacity = Math.max(0, 1 - ratio * 3.3);
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    });
  }

  // ========================================
  // Sección Sobre Nosotros - Galería Fan/Abanico y Contadores
  // ========================================
  const aboutSection = document.getElementById('about');

  if (aboutSection) {
    const aboutGallery = aboutSection.querySelector('.about__gallery');

    if (aboutGallery) {
      let fanTicking = false;

      function updateFanProgress() {
        const galleryRect = aboutGallery.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const galleryCenter = galleryRect.top + galleryRect.height / 2;
        const startPoint = windowHeight;
        const endPoint = windowHeight * 0.4;

        const raw = (startPoint - galleryCenter) / (startPoint - endPoint);
        const progress = Math.max(0, Math.min(1, raw));

        aboutGallery.style.setProperty('--fan-progress', progress);
        fanTicking = false;
      }

      window.addEventListener('scroll', () => {
        if (!fanTicking) {
          requestAnimationFrame(updateFanProgress);
          fanTicking = true;
        }
      });

      updateFanProgress();
    }

    // Contadores de estadísticas (sin parallax, solo fade + counter)
    const aboutStats = aboutSection.querySelectorAll('.about__stat');

    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'), 10);
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    }

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('about--visible');

          const counters = aboutSection.querySelectorAll('.about__stat-number[data-target]');
          counters.forEach((counter) => {
            animateCounter(counter);
          });

          aboutObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    aboutObserver.observe(aboutSection);
  }

  // ========================================
  // Flip Cards - Animación al hacer scroll
  // ========================================
  const productsSection = document.getElementById('products');

  if (productsSection) {
    const productCards = productsSection.querySelectorAll('.products__card');

    const productsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          productCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('products__card--animate');
          });
          productsObserver.unobserve(entry.target);

          // Hint flip: la primera card se da vuelta parcialmente para indicar
          // al usuario que las cards son interactivas
          const firstCard = productCards[0];
          if (firstCard) {
            // Esperar a que termine fadeSlideUp (0.6s) + un pequeño respiro visual
            setTimeout(function() {
              firstCard.classList.add('products__card--hint-flip');
              setTimeout(function() {
                firstCard.classList.remove('products__card--hint-flip');
              }, 1200);
            }, 1100);
          }
        }
      });
    }, {
      threshold: 0.2
    });

    productsObserver.observe(productsSection);
  }

  // ========================================
  // Sección Contacto - Mapa Globe.gl
  // ========================================
  const contactGlobeEl = document.getElementById('contact__globe');

  if (contactGlobeEl && typeof Globe !== 'undefined') {
    // Punto central: San Luis (planta principal)
    const sanLuis = { lat: -33.2961, lng: -66.3247 };

    // Destinos en Argentina (10 ciudades - norte, centro, sur)
    const argentinaCities = [
      // Norte
      { lat: -24.7859, lng: -65.4117, name: 'Salta', country: 'Argentina' },
      { lat: -27.4606, lng: -58.9839, name: 'Resistencia', country: 'Argentina' },
      // Centro
      { lat: -32.9442, lng: -60.6505, name: 'Rosario', country: 'Argentina' },
      // Oeste
      { lat: -32.8895, lng: -68.8458, name: 'Mendoza', country: 'Argentina' },
      // Litoral
      { lat: -38.0055, lng: -57.5426, name: 'Mar del Plata', country: 'Argentina' },
      // Sur
      { lat: -38.9516, lng: -68.0591, name: 'Neuquén', country: 'Argentina' },
      { lat: -41.1335, lng: -71.3103, name: 'Bariloche', country: 'Argentina' },
      { lat: -45.8646, lng: -67.4964, name: 'Comodoro Rivadavia', country: 'Argentina' },
      { lat: -54.8019, lng: -68.3030, name: 'Ushuaia', country: 'Argentina' },
      { lat: -42.7692, lng: -65.0385, name: 'Puerto Madryn', country: 'Argentina' }
    ];

    // Destinos en países vecinos (LATAM)
    const latamCountries = [
      { lat: -33.4489, lng: -70.6693, name: 'Santiago', country: 'Chile' },
      { lat: -34.9011, lng: -56.1645, name: 'Montevideo', country: 'Uruguay' },
      { lat: -25.2637, lng: -57.5759, name: 'Asunción', country: 'Paraguay' },
      { lat: -17.8146, lng: -63.1561, name: 'Santa Cruz', country: 'Bolivia' },
      // Brasil
      { lat: -23.5505, lng: -46.6333, name: 'São Paulo', country: 'Brasil' }
    ];

    // Combinar todos los puntos
    const allPoints = [
      { lat: sanLuis.lat, lng: sanLuis.lng, name: 'Planta Principal', city: 'San Luis', isHQ: true },
      ...argentinaCities.map(c => ({ lat: c.lat, lng: c.lng, name: c.name, city: `${c.name}, ${c.country}`, isHQ: false })),
      ...latamCountries.map(c => ({ lat: c.lat, lng: c.lng, name: c.name, city: `${c.name}, ${c.country}`, isHQ: false }))
    ];

    // Crear datos de arcos (desde San Luis hacia TODOS los destinos - siempre visibles)
    const arcsData = [...argentinaCities, ...latamCountries].map(dest => ({
      startLat: sanLuis.lat,
      startLng: sanLuis.lng,
      endLat: dest.lat,
      endLng: dest.lng,
      name: dest.name,
      country: dest.country
    }));

    // Función para obtener color según tipo de destino
    const getPointColor = (point) => {
      if (point.isHQ) return '#ee6c4d'; // Peach para San Luis (HQ)
      if (point.isArgentina) return '#e0fbfc'; // Cyan para ciudades Argentina
      return '#f0c8a0'; // Sand/dorado para países LATAM
    };

    const getPointRadius = (point) => {
      if (point.isHQ) return 0.5; // Más grande para San Luis
      return 0.25;
    };

    // Marcar qué puntos son Argentina y cuáles son países
    allPoints.forEach(p => {
      p.isArgentina = p.city.includes('Argentina');
    });

    // Inicializar Globe.gl
    const globe = Globe()
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .backgroundColor('#000011')
      (contactGlobeEl);

    // Agregar puntos
    globe.pointsData(allPoints)
      .pointAltitude(0.02)
      .pointRadius(getPointRadius)
      .pointColor(getPointColor)
      .pointLabel(d => `
        <div style="background: #293241; color: #e0fbfc; padding: 8px 12px; border-radius: 6px; font-family: 'Source Sans Pro', sans-serif; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
          <strong style="color: ${d.isHQ ? '#ee6c4d' : (d.isArgentina ? '#e0fbfc' : '#f0c8a0')};">${d.isHQ ? '🏭 PLASTIMET' : '📍'}</strong><br>
          ${d.name}<br>
          <span style="color: #98c1d9;">${d.isHQ ? 'San Luis, Argentina' : d.city}</span>
        </div>
      `);

    // Arcos activos: estilo "envío express" con color naranja
    globe.arcsData(arcsData)
      .arcColor(() => '#ee6c4d')
      .arcStroke(0.25)
      .arcDashLength(0.25)
      .arcDashGap(0.15)
      .arcDashAnimateTime(2500);

    // Click en puntos
    globe.onPointClick(point => {
      console.log('Clickeaste:', point.name);
    });

    // Configurar controles - SIN controles del usuario
    globe.controls().autoRotate = false;
    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;
    globe.controls().enableRotate = false;

    // Animación de flotación - movimiento constante sobre Argentina
    const floatAnimation = () => {
      const positions = [
        // Centro
        { lat: -33.0, lng: -64.0, altitude: 1.3 },
        // Norte
        { lat: -28.0, lng: -62.0, altitude: 1.8 },
        // Oeste
        { lat: -34.0, lng: -69.0, altitude: 1.5 },
        // Este
        { lat: -34.0, lng: -58.0, altitude: 1.6 },
        // Sur
        { lat: -40.0, lng: -68.0, altitude: 2.0 },
        // Zoom out
        { lat: -33.0, lng: -64.0, altitude: 2.5 },
        // Zoom in
        { lat: -33.3, lng: -66.3, altitude: 1.0 },
        // Centro otro
        { lat: -35.0, lng: -65.0, altitude: 1.4 }
      ];
      
      let idx = 0;
      const transitionDuration = 1500;
      const pauseDuration = 1500;
      
      // Función para mover a la siguiente posición
      const moveToNext = () => {
        idx = (idx + 1) % positions.length;
        globe.pointOfView(positions[idx], transitionDuration);
      };
      
      // Iniciar primera animación
      globe.pointOfView(positions[idx], transitionDuration);
      
      // Continuar con intervalo
      setInterval(() => {
        moveToNext();
      }, transitionDuration + pauseDuration);
    };

    // Arrancar animación
    floatAnimation();

    // Función para ajustar el globe al contenedor
    const resizeGlobe = () => {
      if (contactGlobeEl) {
        const wrapper = contactGlobeEl.closest('.contact__map-col') || contactGlobeEl.parentElement;
        globe.width(wrapper.clientWidth);
        globe.height(wrapper.clientHeight);
      }
    };

    // Ajustar al contenedor después de un delay
    setTimeout(resizeGlobe, 200);
    setTimeout(resizeGlobe, 500);

    // Recalcular en resize
    window.addEventListener('resize', () => {
      resizeGlobe();
    });
  }

  // ========================================
  // Sección Contacto - Validación de formulario
  // ========================================
  const contactForm = document.getElementById('contact__form');
  const contactSubmit = document.getElementById('contact__submit');
  const contactToast = document.getElementById('contact__toast');

  if (contactForm) {
    // Validar email con regex
    const isValidEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    // Validar teléfono (mínimo 8 dígitos)
    const isValidPhone = (phone) => {
      const digits = phone.replace(/\D/g, '');
      return digits.length >= 8;
    };

    // Validar un campo
    const validateField = (field) => {
      const fieldName = field.name;
      const value = field.value.trim();
      const fieldContainer = field.closest('.contact__field');
      let isValid = true;
      let errorMessage = '';

      // Validar según el tipo de campo
      if (field.hasAttribute('required')) {
        if (!value) {
          isValid = false;
          errorMessage = 'Este campo es requerido';
        }
      }

      if (isValid && value) {
        if (fieldName === 'email' && !isValidEmail(value)) {
          isValid = false;
          errorMessage = 'Email inválido';
        }

        if (fieldName === 'phone' && value && !isValidPhone(value)) {
          isValid = false;
          errorMessage = 'El teléfono debe tener al menos 8 dígitos';
        }

        if (fieldName === 'message' && value.length < 10) {
          isValid = false;
          errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        }

        if (fieldName === 'name' && value.length < 2) {
          isValid = false;
          errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }
      }

      // Aplicar clase de error
      if (!isValid) {
        fieldContainer.classList.add('contact__field--error');
      } else {
        fieldContainer.classList.remove('contact__field--error');
      }

      return isValid;
    };

    // Validar en tiempo real al perder el foco
    contactForm.querySelectorAll('.contact__input, .contact__select, .contact__textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.contact__field').classList.contains('contact__field--error')) {
          validateField(field);
        }
      });
    });

    // Manejar submit
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validar todos los campos
      let isFormValid = true;
      const fields = contactForm.querySelectorAll('.contact__input, .contact__select, .contact__textarea');

      fields.forEach(field => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        return;
      }

      // Efecto ripple en el botón
      const createRipple = (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
        `;
        
        ripple.classList.add('ripple');
        
        // Remover ripple anterior si existe
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
          existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        // Remover después de la animación
        setTimeout(() => ripple.remove(), 600);
      };

      // Aplicar ripple
      createRipple({ currentTarget: contactSubmit, clientX: event.clientX, clientY: event.clientY });

      // Deshabilitar botón y mostrar estado de envío
      contactSubmit.disabled = true;
      const originalText = contactSubmit.innerHTML;
      contactSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      // Simular delay de 1.5 segundos
      setTimeout(() => {
        // Mostrar toast de éxito
        contactToast.classList.add('contact__toast--visible');

        // Limpiar formulario
        contactForm.reset();

        // Restaurar botón
        contactSubmit.disabled = false;
        contactSubmit.innerHTML = originalText;

        // Ocultar toast después de 4 segundos
        setTimeout(() => {
          contactToast.classList.remove('contact__toast--visible');
        }, 4000);
      }, 1500);
    });
  }
});
