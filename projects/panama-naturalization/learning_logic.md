# Lógica de Aprendizaje: Sistema de Semáforo

Este documento detalla la regla de dominio de contenido por repetición para la app de Naturalización.

## 1. Definición de Estados
Cada una de las preguntas del banco (30+ preguntas) tendrá asociado un estado individual para cada usuario:

- **Rojo (Iniciado/Fallido):**
  - Estado por defecto al ver una pregunta por primera vez.
  - Se activa si el usuario falla la pregunta en cualquier momento.
  - El usuario gana **0 XP** en este estado.

- **Amarillo (En Aprendizaje):**
  - Se alcanza tras el **1er o 2º acierto consecutivo**.
  - Si el usuario falla antes del 3er acierto, la pregunta vuelve a **Rojo**.
  - Gana **2 XP** por acierto individual.

- **Verde (Dominada):**
  - Se alcanza tras el **3er acierto consecutivo**.
  - Una vez en este estado, la pregunta cuenta para el progreso real del módulo y de la aplicación (ej: 100% completado).
  - Al alcanzar este estado por primera vez, se otorga un **Bono de 10 XP**.

## 2. Algoritmo de Refuerzo Inteligente
La aplicación rastrea el rendimiento del usuario por categorías de estudio (ej: "Historia", "Geografía", "Poder Judicial"):

- **Detección de Debilidades:** El algoritmo identifica las categorías con el menor porcentaje de preguntas en **Verde**. 
- **Generación Automática de Exámenes:** El sistema creará un examen personalizado de 10-15 preguntas priorizando aquellas en estado **Rojo** y **Amarillo** de las categorías más débiles.
- **Activación:** Se recomienda al usuario realizar un examen de refuerzo cada vez que el sistema detecte que una categoría tiene más del 40% de sus preguntas en estado **Rojo**.

## 3. Aplicación en la App
- **Módulos de Estudio:** Solo muestran el porcentaje de preguntas en **Verde**.
- **Sesión de Repaso Inteligente:** La IA de la app priorizará mostrar preguntas en **Rojo** y **Amarillo** para ayudar al usuario a llevarlas a **Verde**.
- **Simulacro de Examen:** Utilizará mayoritariamente preguntas en Verde y Amarillo para validar el conocimiento bajo presión.
