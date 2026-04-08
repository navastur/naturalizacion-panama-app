# Contexto del Proyecto: Panama Naturalization App

## Estado Actual (Actualizado: 2026-04-08)
- **Repositorio**: https://github.com/navastur/naturalizacion-panama-app
- **URL de Despliegue**: https://navastur.github.io/naturalizacion-panama-app/
- **Estructura**:
  - `index.html`, `mvp_app.html`, `logic_prototype.js` en la raíz para compatibilidad con GitHub Pages.
  - `projects/panama-naturalization/`: Carpeta principal del proyecto.
  - `projects/panama-naturalization/sources/`: PDFs y documentos de texto originales.
  - `projects/panama-naturalization/CONTEXTO_PROYECTO.md`: Este archivo.

## Hitos Completados ✅
- [x] **Estabilización del Despliegue**: Se resolvió el error de submódulo y la duplicidad en la raíz. La app es funcional en GitHub Pages.
- [x] **Corrección de Sintaxis JS**: Se reparó el error de carga de funciones por etiquetas `<audio>` mal ubicadas.
- [x] **Seguimiento de Multimedia**: Luis confirmó que la visualización de videos se marca correctamente y el sistema de "check" funciona.

## Decisiones Recientes
1. **Limpieza de Raíz**: Se movieron archivos de soporte a `sources/` para mantener el repositorio ordenado.
2. **Corrección de Submódulo**: Se eliminó una carpeta `.git` interna en `projects/panama-naturalization/` que causaba fallos de checkout en GitHub Actions.
3. **Corrección de Sintaxis**: Se movieron etiquetas `<audio>` fuera del bloque `<script>` para evitar errores de ejecución en el navegador.

## Próximos Pasos
1. Investigar persistencia a largo plazo de `userData.completedMedia` en `localStorage` si se reportan fallos al recargar.
2. Añadir contenido al Mapa de Provincias según se defina.
