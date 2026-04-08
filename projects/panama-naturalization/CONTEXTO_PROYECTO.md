# Contexto del Proyecto: Panama Naturalization App

## Estado Actual
- **Repositorio**: https://github.com/navastur/naturalizacion-panama-app
- **URL de Despliegue**: https://navastur.github.io/naturalizacion-panama-app/
- **Estructura**:
  - `index.html`, `mvp_app.html`, `logic_prototype.js` en la raíz para compatibilidad con GitHub Pages.
  - `projects/panama-naturalization/`: Carpeta principal del proyecto.
  - `projects/panama-naturalization/sources/`: PDFs y documentos de texto originales.
  - `projects/panama-naturalization/CONTEXTO_PROYECTO.md`: Este archivo.

## Decisiones Recientes
1. **Limpieza de Raíz**: Se movieron archivos de soporte a `sources/` para mantener el repositorio ordenado.
2. **Corrección de Submódulo**: Se eliminó una carpeta `.git` interna en `projects/panama-naturalization/` que causaba fallos de checkout en GitHub Actions.
3. **Corrección de Sintaxis**: Se movieron etiquetas `<audio>` fuera del bloque `<script>` para evitar errores de ejecución en el navegador.

## Próximos Pasos
1. Confirmar funcionalidad total tras la estabilización del despliegue.
2. Investigar persistencia de `userData.completedMedia`.
