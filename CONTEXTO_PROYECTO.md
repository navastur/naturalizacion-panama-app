# CONTEXTO_PROYECTO.md - Memoria Persistente

Este documento consolida la información clave del proyecto "App Naturalización Panamá" para asegurar la continuidad y facilitar el trabajo en futuras sesiones.

## 1. Objetivo del Proyecto

Crear una aplicación web para ayudar a los usuarios a prepararse para el examen de naturalización panameña, ofreciendo herramientas de estudio interactivas y seguimiento de progreso.

## 2. Stack Tecnológico

*   **Frontend:** HTML, CSS (Tailwind CSS), JavaScript puro.
*   **Contenido:** Datos de preguntas, respuestas y explicaciones incrustados directamente en el JavaScript del `index.html`. Videos de Wistia, *   **Contenido:** Datos de preguntas, respuestas y explicaciones incrustados directamente en el JavaScript del `index.html`. Videos de Wistia, podcasts de Spotify (antiguos, ahora migrados a nativo), sonidos genéricos (SoundHelix).
*   **Podcasts Nativos Implementados (assets/video/):**
    *   `historia_podcast.mp3`
    *   `politica1_podcast.mp3`
    *   `politica2_podcast.mp3`
    *   `simbolos_patrios_podcast.mp3`
*   **Actualizaciones del Reproductor de Podcasts:**
    *   El reproductor principal ahora carga un podcast por defecto.
    *   Se eliminaron todas las referencias a reproductores de Spotify.
    *   Se ajustó el espaciado y el formato de los textos en el reproductor principal.
*   **Persistencia de datos:** `localStorage` del navegador para almacenar el progreso del usuario (XP, rachas, dominio de preguntas, medios completados).
*   **Despliegue/Acceso:** Repositorio de GitHub `naturalizacion-panama-app`. URL pública: `https://navastur.github.io/naturalizacion-panama-app/`.
*   **Móvil (Local):** Entorno Capacitor para Android e iOS (no incluido en el repo).

## 3. Decisiones de Arquitectura

*   **Aplicación de una sola página (SPA):** La navegación entre secciones se maneja con JavaScript (`switchScreen`), sin recargar la página.
*   **Renderizado del contenido:** El contenido (preguntas, opciones, explicaciones, etc.) se inyecta dinámicamente en el DOM con JavaScript.
*   **Sistema de gamificación:** Implementación de XP, niveles, rangos y rachas para motivar al usuario.
*   **Modales:** Uso de modales para explicaciones de respuestas incorrectas, hitos de XP, subidas de nivel y notificaciones de racha.
*   **Notificaciones:** Sistema híbrido de notificaciones locales y push mediante Capacitor.

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
    *   Implementación del seguimiento de rachas diarias y su modal de notificación.
    *   **Integración del Mapa Interactivo de Provincias (SVG):** Lógica de Drag & Drop, Zoom y Paneo.
    *   **Sistema de Notificaciones (Nativo):** Lógica integrada en `logic_prototype.js` para Capacitor.
        *   Obtención de Registration Token.
        *   Modal personalizado para notificaciones en primer plano.
        *   Recordatorios diarios basados en la hora de estudio.
        *   **Lógica de Upsell Free:** Notificaciones automáticas cuando faltan 60, 45, 30, 25, 20, 15 y 10 días para el examen (solo usuarios Free).
    *   **Onboarding y Personalización:** Pantalla de bienvenida para nuevos usuarios que captura Nombre, Fecha de Examen y Hora de Estudio.

*   **Problemas pendientes y depuración:**
    *   **El array `userData.completedMedia` no está acumulando correctamente los IDs de videos/podcasts:** Aún se necesita depuración con la salida de la consola del usuario.
    *   **Persistencia de la escala del mapa:** Es necesario investigar la causa raíz de la escala inicial incorrecta.

## 6. Log de Cambios

*   **2026-04-13:**
    *   **Vídeos Locales:** Se cambió el approach para el vídeo de Geografía, pasando de streaming (Bunny.net) a un recurso local (`assets/videos/geografia.mp4`). Se implementó un reproductor nativo de HTML5 con soporte para la limitación de 3 minutos y tracking de XP.
    *   **Corrección de XP y Seguimiento:** Se actualizaron los IDs en el array global `videoIds` y se implementó el evento `ended` de Bunny.net para otorgar correctamente los 25 XP al finalizar los vídeos.
    *   **Actualización del Himno Nacional:** Se sustituyó el reproductor de YouTube por el de Bunny.net (`mediadelivery.net`) en la sección del himno.
    *   **Cambio de Reproductor de Vídeo (Geografía):** Se sustituyó el reproductor de Wistia por el de Bunny.net (`mediadelivery.net`) para el vídeo de Geografía.
    *   **Eliminación de Plyr:** Se removieron todas las referencias y la carga de la librería Plyr.io de `index.html`.
    *   **Adaptación de Lógica Free:** Se implementó la restricción de 3 minutos (180 segundos) para el nuevo reproductor de Bunny.net mediante la API de `postMessage`.
    *   **Actualización de `playVideo`:** Se modificó la función `playVideo` para soportar el proveedor `bunny` y gestionar la pausa automática en usuarios gratuitos.

*   **2026-04-11:**
    *   **Onboarding de Usuario:** Implementación de una pantalla de bienvenida (`screen-onboarding`) para nuevos usuarios.
        *   Solicita Nombre, Fecha de Examen y Hora de Estudio para personalizar la experiencia.
        *   El nombre se vincula dinámicamente al saludo de la Home ("¡Hola, [Nombre]!").
        *   La barra de navegación se oculta durante este proceso inicial.
        *   Se activan las notificaciones por defecto al completar el proceso.
    *   **Notificaciones Push y Locales:** Se integró el objeto `PanamaNotifications` en `logic_prototype.js`.
    *   **Manejo de Permisos:** Lógica unificada para Android 13+ e iOS.
    *   **Recordatorios Diarios:** Programación dinámica basada en `userData.studyTime`.
    *   **Estrategia de Conversión (Free):** Implementación de recordatorios de examen a los 60, 45, 30, 25, 20, 15 y 10 días para incitar a la suscripción Premium.
    *   **Reactividad:** Se parchearon las funciones globales (`setStudyTime`, `setExamDate`, `toggleNotifications`, `toggleFreeMode`) para que las notificaciones se actualicen instantáneamente al cambiar los ajustes.
    *   **Corrección de Errores:** Se definió la función `saveData()` que faltaba y estaba causando errores en el Onboarding.

*   **2026-04-09:**
    *   **Lógica Free vs Premium:** Implementación de límites de contenido (Examen: 10 q, Temario: 30 p, Videos/Podcast: 1, 4, 5 habilitados, otros bloqueados).
    *   **Modal Premium:** Rediseño completo con planes de suscripción (Mensual, 3 meses con 15% OFF, Ilimitado).
    *   **Simulacro de Examen:** Remodelación con barra de progreso y lógica de aprobación (71%).
    *   **Contenido:** Adición de 30 nuevas preguntas de Verdadero o Falso.

*   **2026-04-08 (Sesión Anterior):**
    *   Configuración de Token de GitHub persistente.
    *   Integración de Mapa SVG y lógica de Drag & Drop.

## 7. Reglas Específicas

*   El asistente mantendrá este archivo `CONTEXTO_PROYECTO.md` actualizado de forma concisa con cada tarea importante completada y decisión relevante, incluyendo un registro de cambios.
*   El asistente siempre leerá este archivo al inicio de cada sesión para recuperar el contexto del proyecto.
*   Los cambios en el código se subirán directamente al repositorio de GitHub.
*   **Actualización Automática:** El asistente es responsable de actualizar este archivo de forma proactiva al final de cada hito o tarea significativa sin esperar una solicitud explícita del usuario.

## 8. Instrucciones para el Asistente

*   El asistente es responsable de determinar qué información es importante y relevante para memorizar y guardar en este documento, asegurando que se mantenga una memoria persistente del proyecto para futuras sesiones.
*   Utilizar `$GITHUB_TOKEN` para todas las operaciones de Git.

## 9. Notas Adicionales

*   Configuración `AndroidManifest.xml` para notificaciones requiere permisos de `VIBRATE`, `POST_NOTIFICATIONS`, `RECEIVE_BOOT_COMPLETED` y `SCHEDULE_EXACT_ALARM`.
*   El error de Wistia (500 Internal Server Error) es externo y debe ser monitoreado.