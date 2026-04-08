# CONTEXTO_PROYECTO.md - Memoria Persistente

Este documento consolida la información clave del proyecto "App Naturalización Panamá" para asegurar la continuidad y facilitar el trabajo en futuras sesiones.

## 1. Objetivo del Proyecto

Crear una aplicación web para ayudar a los usuarios a prepararse para el examen de naturalización panameña, ofreciendo herramientas de estudio interactivas y seguimiento de progreso.

## 2. Stack Tecnológico

*   **Frontend:** HTML, CSS (Tailwind CSS), JavaScript puro.
*   **Contenido:** Datos de preguntas, respuestas y explicaciones incrustados directamente en el JavaScript del `index.html`. Videos de Wistia, podcasts de Spotify, sonidos genéricos (SoundHelix).
*   **Persistencia de datos:** `localStorage` del navegador para almacenar el progreso del usuario (XP, rachas, dominio de preguntas, medios completados).
*   **Despliegue/Acceso:** Repositorio de GitHub `naturalizacion-panama-app`. URL pública: `https://navastur.github.io/naturalizacion-panama-app/`.

## 3. Decisiones de Arquitectura

*   **Aplicación de una sola página (SPA):** La navegación entre secciones se maneja con JavaScript (`switchScreen`), sin recargar la página.
*   **Renderizado del contenido:** El contenido (preguntas, opciones, explicaciones, etc.) se inyecta dinámicamente en el DOM con JavaScript.
*   **Sistema de gamificación:** Implementación de XP, niveles, rangos y rachas para motivar al usuario.
*   **Modales:** Uso de modales para explicaciones de respuestas incorrectas, hitos de XP, subidas de nivel y notificaciones de racha.

## 4. Lógica de Aplicación

*   **Sistema de Semáforo para dominio de preguntas:**
    *   **Rojo:** Pregunta nueva o fallada (0 aciertos consecutivos).
    *   **Amarillo:** 1-2 aciertos consecutivos. Si se falla, vuelve a Rojo.
    *   **Verde:** 3 aciertos consecutivos (pregunta "dominada"). Otorga +10 XP de bono la primera vez.
*   **Puntos de Experiencia (XP):**
    *   +2 XP por respuesta correcta.
    *   +10 XP (bono) por dominar una pregunta.
    *   +25 XP por completar un video.
    *   +15 XP por escuchar un podcast completo (marcado manual).
    *   Los niveles se calculan en base a 500 XP por nivel.
*   **Rachas de estudio (Streaks):**
    *   Se incrementa diariamente si el usuario inicia sesión en días consecutivos.
    *   Se resetea a 1 si la racha se rompe.
    *   Un modal felicita al usuario al mantener la racha.
*   **Medios Completados:** Se registra la ID de videos y podcasts en `userData.completedMedia` para evitar XP duplicado y mostrar el estado de completado.

## 5. Progreso y Estado Actual

*   **Tareas completadas:**
    *   Implementación de la lógica de XP, niveles y rangos.
    *   Implementación del sistema de semáforo para el dominio de preguntas.
    *   Visualización de la barra de progreso de XP y colores de puntos de nivel en el modal de hitos.
    *   Implementación del seguimiento de rachas diarias y su modal de notificación.
    *   Eliminación del marcador `[v1.0]` de la homepage.
    *   Integración de sonidos para progreso de XP y subida de nivel.
    *   Corrección del error `scrollIntoView` en la consola (línea comentada en `index.html`).
    *   Añadidos `console.log` para depurar `completedMedia` en `updateDashboard` y el callback de `video.bind('end')`.
    *   Añadidos IDs únicos a los iconos de "check" en los elementos de la lista de videos y podcasts (ocultos por defecto).
    *   Integración de `updateMediaCompletionStatus()` en `updateDashboard()`.
*   **Problemas pendientes y depuración:**
    *   **El array `userData.completedMedia` no está acumulando correctamente los IDs de videos/podcasts:** Aún se necesita depuración con la salida de la consola del usuario.
*   **Tareas pendientes de implementación:**
    *   **Implementación del botón "Mapa de Provincias":** Se ha solicitado añadir un botón en la homepage para el mapa de provincias de Panamá. Contenido pendiente de definición por el usuario.

## 6. Log de Cambios

*   **2026-04-08:**
    *   Sustitución de token de GitHub por uno nuevo con permisos válidos.
    *   Cambio de visibilidad del repositorio `navastur/naturalizacion-panama-app` a **público**.
    *   Activación y despliegue exitoso en **GitHub Pages** desde la rama `main`.
    *   Reestructuración del repositorio: archivos de la app movidos a la raíz de la rama `main` para despliegue automático.
    *   Sincronización total de cambios locales (`index.html`, `mvp_app.html`, `logic_prototype.js`) con el repositorio remoto.
*   **2026-04-07 (Sesión actual):**
    *   Creación inicial del archivo `CONTEXTO_PROYECTO.md`.
    *   Actualización de la lógica de `showMilestone` para barra de XP proporcional y puntos de nivel amarillos.
    *   Ajuste de espaciado en el modal de hitos (`space-y-4`).
    *   Añadidos IDs únicos a los divs de los iconos "check" en las listas de videos y podcasts (ocultos por defecto).
    *   Implementación de la función `updateMediaCompletionStatus()` y su llamada en `updateDashboard()`.
    *   Implementación de la lógica de rachas (`checkStreak()`) con `lastLoginDate` y un nuevo modal (`streak-modal`).
    *   Eliminación de `[v1.0]` de la homepage.
    *   Adición de elementos `<audio>` para sonidos de progreso y subida de nivel (`progress-sound`, `levelup-sound`).
    *   Integración de la reproducción de sonidos en `showMilestone` y `showLevelUp`.
    *   Comentada la línea `scrollIntoView` en `playVideo` para resolver el error de consola.
    *   Añadidos `console.log` para depurar `completedMedia` en `updateDashboard` y el callback de `video.bind('end')`.
    *   Diagnóstico de recursos del sistema: Disco y Memoria RAM se encuentran en niveles normales, sugiriendo que la lentitud no se debe a falta de recursos básicos.
    *   Configuración de rama de seguimiento para Git (`git branch --set-upstream-to=origin/master master`).
    *   Intentos fallidos de `git push` debido a lentitud extrema del sistema.

## 7. Reglas Específicas

*   El asistente mantendrá este archivo `CONTEXTO_PROYECTO.md` actualizado de forma concisa con cada tarea importante completada y decisión relevante, incluyendo un registro de cambios.
*   El asistente siempre leerá este archivo al inicio de cada sesión para recuperar el contexto del proyecto.
*   El usuario es responsable de proporcionar la salida de la consola de depuración cuando sea solicitada.
*   El usuario debe confirmar cómo se está ejecutando la aplicación (servidor local, archivo directo, GitHub Pages) para diagnosticar problemas de replicación de cambios.
*   Los cambios en el código se subirán directamente al repositorio de GitHub (`naturalizacion-panama-app`) para que el usuario pueda verlos en tiempo real.

## 8. Notas Adicionales

*   Las URLs de los audios (`progress-sound`, `levelup-sound`) son temporales de SoundHelix. Se recomienda reemplazarlas con audios finales.
*   El error de Wistia (500 Internal Server Error) es externo y debe ser monitoreado; puede afectar la detección de finalización de videos.