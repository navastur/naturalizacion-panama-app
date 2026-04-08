# Estructura de la Aplicación - Naturalización Panamá

Esta propuesta define la arquitectura de la aplicación y la experiencia del usuario (UX) para la pantalla de inicio.

## 1. Pantalla de Inicio (Dashboard)
El objetivo es ofrecer acceso rápido a las funciones más críticas:

- **Simulacro de Examen:** 20 preguntas aleatorias con tiempo real (45 min) y calificación inmediata.
- **Examen de Refuerzo Inteligente:** Un examen generado dinámicamente por la IA de la app que se enfoca exclusivamente en las preguntas y temas (ej: "Sistema de Justicia") donde el usuario tiene más estados en **Rojo** o **Amarillo**.
- **Estudio por Módulos:**
  - Historia (Unión a Colombia, Independencia, Canal).
  - Geografía (Provincias, Comarcas, Relieve).
  - Educación Cívica (Constitución, Órganos del Estado).
  - Cultura y Tradiciones (Símbolos, Folklore).
- **Tarjetas de Memoria (Flashcards):** Repaso rápido de fechas, nombres y autores de los símbolos patrios.
- **Vídeos de Estudio:** Vídeos explicativos divididos por bloques temáticos (Historia, Geografía, Cívica y Cultura) para un aprendizaje visual y auditivo.
- **Mini-podcasts:** Lecciones en formato audio diseñadas para ser escuchadas durante otras actividades (conduciendo, ejercicio). Organizadas por temáticas del examen.
- **Tu Progreso:** Gráfica con el porcentaje de aciertos, últimos resultados y temas que necesitas reforzar.
- **Guía de Trámites:** Información sobre requisitos legales, documentos, costos y ubicación de las oficinas.

## 2. Lógica de Navegación (IA)
- **Barra Inferior (Bottom Navigation):**
  - Inicio (Dashboard).
  - Banco de Preguntas (Lista completa con respuestas).
  - Estadísticas (Análisis detallado).
  - Ajustes (Modo oscuro, notificaciones de estudio).

## 3. Elementos de Gamificación (Inspiración Duolingo)
- **Racha de Estudio (Streaks):** Contador visual (icono de fuego 🔥) que muestra cuántos días seguidos ha estudiado el usuario para fomentar la retención.
- **Sistema de Niveles y XP:** Los usuarios ganan puntos de experiencia (XP) por completar módulos, simulacros y ver vídeos. Ver detalles en `xp_system.md`.
- **Logros:** "Historiador", "Geógrafo", "Ciudadano Ejemplar".
- **Ranking Semanal:** (Opcional) Comparativa con otros usuarios.

## 4. Lógica de Aprendizaje: Sistema de Semáforo
Para asegurar la retención a largo plazo, la aplicación implementa un sistema de validación por repetición:
- **Estado Rojo (Iniciado):** Pregunta nueva o fallada recientemente.
- **Estado Amarillo (En Progreso):** Pregunta acertada 1 o 2 veces consecutivas.
- **Estado Verde (Dominada):** Pregunta acertada **3 veces seguidas**. 
- Una pregunta solo se considera "Dominada" y suma al progreso total del módulo cuando alcanza el estado verde. Si el usuario falla una pregunta en estado amarillo, esta vuelve automáticamente a estado rojo.
