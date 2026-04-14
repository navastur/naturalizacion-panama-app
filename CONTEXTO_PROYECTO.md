# CONTEXTO_PROYECTO.md - Memoria Persistente

Este documento consolida la información clave del proyecto "App Naturalización Panamá" para asegurar la continuidad y facilitar el trabajo en futuras sesiones.

## 1. Objetivo del Proyecto

Crear una aplicación web para ayudar a los usuarios a prepararse para el examen de naturalización panameña, ofreciendo herramientas de estudio interactivas y seguimiento de progreso.

## 2. Stack Tecnológico

*   **Frontend:** HTML, CSS (Tailwind CSS), JavaScript puro.
*   **Contenido:** Datos de preguntas, respuestas y explicaciones incrustados directamente en el JavaScript del `index.html`. 
*   **Multimedia:** Todos los videos y podcasts se encuentran localmente en `assets/videos/` y `assets/podcasts/` para ser reproducidos con reproductores nativos de HTML5. Se eliminaron dependencias de Bunny.net, Wistia y Spotify.
*   **Persistencia de datos:** `localStorage` del navegador para almacenar el progreso del usuario (XP, rachas, dominio de preguntas, medios completados).
*   **Despliegue/Acceso:** Repositorio de GitHub `naturalizacion-panama-app`. URL pública: `https://navastur.github.io/naturalizacion-panama-app/`.
*   **Móvil (Local):** Entorno Capacitor para Android e iOS (no incluido en el repo).

## 3. Decisiones de Arquitectura

*   **Aplicación de una sola página (SPA):** La navegación entre secciones se maneja con JavaScript (`switchScreen`), sin recargar la página.
*   **Jerarquía del DOM:** El contenedor principal `.app-container` envuelve todas las pantallas y la barra de navegación para asegurar el confinamiento visual en 450px.
*   **Sistema de gamificación:** Implementación de XP, niveles, rangos y rachas para motivar al usuario.
*   **Reproductor de Podcasts:** Basado en `<audio>` nativo con controles personalizados (slider de progreso, botones de salto temporal).

## 4. Lógica de Aplicación

*   **Puntos de Experiencia (XP):**
    *   +2 XP por respuesta correcta.
    *   +10 XP (bono) por dominar una pregunta.
    *   +25 XP por completar un video.
    *   +15 XP por escuchar un podcast completo (**automatizado mediante `onended`**).
*   **Restricciones de Versión Gratuita:**
    *   Límite de reproducción de audio a 5 minutos (300 segundos).
    *   Acceso limitado a los primeros 3 podcasts (Geografía, Historia, Política I).

## 5. Progreso y Estado Actual

*   **Tareas completadas:**
    *   Consolidación de podcasts en la carpeta local `assets/podcasts/`.
    *   Implementación de barra de progreso interactiva (slider) para audio.
    *   Automatización de la asignación de XP al terminar podcasts.
    *   Sincronización de UI para reproductores de medios.
    *   Reestructuración del DOM para corregir la alineación de la barra de navegación.

*   **Problemas pendientes y depuración:**
    *   **Reproducción en iOS:** Los podcasts no inician en dispositivos iOS. Se sospecha de restricciones de Safari que requieren que `.play()` esté vinculado a una interacción táctil explícita y de mayor duración o problemas de carga de metadatos.
    *   **Ajuste Fino de la Barra de Navegación:** Aunque se ha corregido la jerarquía, persisten detalles visuales de alineación en ciertos dispositivos móviles.

## 6. Log de Cambios

*   **2026-04-14 (Sesión de Estabilización de Podcasts):**
    *   Movimiento de archivos .mp3 a `assets/podcasts/`.
    *   Eliminación de referencias y reproductores de Spotify.
    *   Implementación de slider interactivo en el reproductor de audio.
    *   Automatización de XP (+15) y marcado de completado al finalizar el podcast.
    *   Corrección estructural de `.nav-bar` como hijo directo de `.app-container`.
    *   Precarga del podcast de Geografía al inicio de la app.

*   **2026-04-11 (Onboarding y Notificaciones):**
    *   Implementación de pantalla de bienvenida y captura de datos del usuario.
    *   Integración de sistema de notificaciones locales mediante Capacitor.

## 7. Reglas Específicas

*   El asistente mantendrá este archivo `CONTEXTO_PROYECTO.md` actualizado de forma concisa con cada tarea importante completada.
*   El asistente siempre leerá este archivo al inicio de cada sesión para recuperar el contexto.
*   **Actualización Automática:** El asistente es responsable de actualizar este archivo de forma proactiva al final de cada hito.

## 8. Notas Adicionales

*   Utilizar `$GITHUB_TOKEN` para todas las operaciones de Git.
*   Configuración `AndroidManifest.xml` requiere permisos específicos para alarmas exactas y notificaciones.
