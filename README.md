# Aarón Revelo Jiménez — Portfolio

Portfolio personal: atención al cliente, soporte IT y desarrollo web en Madrid.
Incluye tres casos de proyecto (La Nota Barber, Medellín Studio y ADVERON) y el CV en PDF.

## Estructura

```
index.html                 Home (perfil, proyectos, experiencia, competencias, formación, ADVERON, contacto)
proyectos/*.html           Casos de estudio
assets/css/site.css        Estilos compartidos (mobile-first, sin dependencias)
assets/js/site.js          Menú móvil, sección activa y aparición al hacer scroll
assets/img/                Capturas reales de los proyectos y foto (WebP + JPG)
assets/og.jpg              Imagen para compartir en redes (1200×630)
CV_Aaron_Revelo_Jimenez.pdf
robots.txt, sitemap.xml
```

Web estática: HTML, CSS y JavaScript sin build. Tipografías Inter Tight e Instrument Serif (Google Fonts).

## Ver en local

```
python -m http.server 5173
```

y abre http://127.0.0.1:5173/

## Despliegue

Vercel (y GitHub Pages) publican la rama `main` automáticamente al hacer `git push`.
Si cambia el dominio, actualiza la URL en los `canonical`, `og:*`, el JSON-LD, `robots.txt` y `sitemap.xml`.
