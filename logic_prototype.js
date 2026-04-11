/**
 * Panama Naturalization App - Core Logic Prototype (v1.0)
 * Includes: XP System, Traffic Light Logic, and Smart Refresher Algorithm.
 */

class PanamaAppEngine {
    constructor() {
        this.userStats = {
            xp: 0,
            level: 1,
            streak: 7,
            lastLogin: new Date().toISOString()
        };

        // Simulated Question Database (id, category, text)
        this.questions = [
            { id: 1, category: "Historia", text: "Separación de Colombia" },
            { id: 2, category: "Historia", text: "Independencia de España" },
            { id: 3, category: "Geografía", text: "Provincias de Panamá" },
            { id: 4, category: "Cívica", text: "Órganos del Estado" },
            { id: 5, category: "Cívica", text: "Poder Judicial" }
        ];

        // User State for each question (0=Red, 1-2=Yellow, 3=Green)
        this.mastery = {
            1: 2, // Yellow (2 hits)
            2: 3, // Green (Dominada)
            3: 0, // Red (New/Failed)
            4: 1, // Yellow (1 hit)
            5: 0  // Red (Failed)
        };

        this.xpTable = {
            correct: 2,
            mastery_bonus: 10,
            smart_exam_bonus: 20
        };
    }

    /**
     * Logic: Traffic Light System
     * Updates mastery state based on result (true=correct, false=incorrect)
     */
    answerQuestion(questionId, isCorrect) {
        let state = this.mastery[questionId] || 0;
        let xpGained = 0;

        if (isCorrect) {
            state++;
            xpGained += this.xpTable.correct;
            
            if (state === 3) {
                xpGained += this.xpTable.mastery_bonus;
                console.log(`✨ ¡PREGUNTA DOMINADA! (+${this.xpTable.mastery_bonus} XP Extra)`);
            }
        } else {
            state = 0; // Back to Red if failed
            console.log("❌ Error. La pregunta vuelve a estado ROJO.");
        }

        // Cap mastery at 3
        this.mastery[questionId] = Math.min(state, 3);
        this.updateXP(xpGained);
        
        return { 
            newState: this.mastery[questionId], 
            xpGained: xpGained,
            color: this.getColor(this.mastery[questionId])
        };
    }

    getColor(state) {
        if (state === 0) return "Rojo 🔴";
        if (state < 3) return "Amarillo 🟡";
        return "Verde 🟢 (Dominada)";
    }

    updateXP(amount) {
        this.userStats.xp += amount;
        // Simple Level Up logic: 500 XP per level
        this.userStats.level = Math.floor(this.userStats.xp / 500) + 1;
    }

    /**
     * Logic: Smart Refresher Algorithm
     * Identifies weak categories and generates a custom exam.
     */
    generateSmartExam() {
        console.log("\n--- GENERANDO EXAMEN DE REFUERZO INTELIGENTE ---");
        
        // 1. Identify failing categories (Red/Yellow states)
        const weakQuestions = this.questions.filter(q => this.mastery[q.id] < 3);
        
        // 2. Sort or Filter (Simple version: take all non-green)
        const examSet = weakQuestions.map(q => ({
            ...q,
            currentState: this.getColor(this.mastery[q.id])
        }));

        return examSet;
    }

    getDashboard() {
        return {
            Level: this.userStats.level,
            TotalXP: this.userStats.xp,
            Streak: `${this.userStats.streak} días 🔥`,
            Progress: this.calculateProgress()
        };
    }

    calculateProgress() {
        const total = Object.keys(this.mastery).length;
        const green = Object.values(this.mastery).filter(s => s === 3).length;
        return `${Math.round((green / total) * 100)}% (Solo Dominadas)`;
    }
}

// --- DEMO RUN ---
const app = new PanamaAppEngine();

console.log("ESTADO INICIAL:", app.getDashboard());

// Simulate answering Question 1 (was Yellow 2)
console.log("\nUsuario responde PREGUNTA 1 Correctamente...");
let result = app.answerQuestion(1, true);
console.log(`Resultado: ${result.color} | XP Ganada: ${result.xpGained}`);

// Simulate failing Question 4 (was Yellow 1)
console.log("\nUsuario falla PREGUNTA 4...");
result = app.answerQuestion(4, false);
console.log(`Resultado: ${result.color}`);

// Run Smart Algorithm
const smartExam = app.generateSmartExam();
console.log("Preguntas seleccionadas para refuerzo:", smartExam);

console.log("\nESTADO FINAL:", app.getDashboard());
// Update forced 2026-04-08

// --- ZOOM AND PAN LOGIC FOR SVG MAP ---
let currentScale = 1;
let currentX = 0;
let currentY = 0;

function updateMapTransform() {
    const svgGroup = document.getElementById("features");
    if (svgGroup) {
        // The original matrix is transform="matrix(1, 0, 0, 1, 0, 10)"
        // We will apply our scale and translate on top of it or replace it.
        // Easiest is to wrap <g id="features"> in another group or just set transform directly
        svgGroup.setAttribute("transform", `translate(${currentX}, ${currentY}) scale(${currentScale}) matrix(1, 0, 0, 1, 0, 10)`);
    }
}

function zoomMap(factor) {
    const newScale = currentScale * factor;
    // Limit scale between 1x and 4x
    if (newScale >= 1 && newScale <= 4) {
        currentScale = newScale;
        updateMapTransform();
    } else if (newScale < 1) {
        currentScale = 1;
        currentX = 0;
        currentY = 0;
        updateMapTransform();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const zoomInBtn = document.getElementById("zoom-in-btn");
    const zoomOutBtn = document.getElementById("zoom-out-btn");
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => zoomMap(1.2));
    }
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => zoomMap(1 / 1.2));
    }

    // Touch events for panning
    const svgElement = document.querySelector("#map-wrapper svg");
    if (svgElement) {
        let isDragging = false;
        let startX, startY;

        svgElement.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1 && currentScale > 1) {
                isDragging = true;
                startX = e.touches[0].clientX - currentX;
                startY = e.touches[0].clientY - currentY;
            }
        });

        svgElement.addEventListener("touchmove", (e) => {
            if (isDragging && e.touches.length === 1) {
                e.preventDefault(); // Prevent scrolling
                currentX = e.touches[0].clientX - startX;
                currentY = e.touches[0].clientY - startY;
                updateMapTransform();
            }
        }, { passive: false });

        svgElement.addEventListener("touchend", () => {
            isDragging = false;
        });
        
        // Mouse events for panning
        svgElement.addEventListener("mousedown", (e) => {
            if (currentScale > 1) {
                isDragging = true;
                startX = e.clientX - currentX;
                startY = e.clientY - currentY;
            }
        });

        svgElement.addEventListener("mousemove", (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
                updateMapTransform();
            }
        });

        svgElement.addEventListener("mouseup", () => {
            isDragging = false;
        });
        
        svgElement.addEventListener("mouseleave", () => {
            isDragging = false;
        });
    }
});

/**
 * --- SISTEMA DE NOTIFICACIONES (CAPACITOR) ---
 * Lógica unificada para Push y Notificaciones Locales (Recordatorios)
 */
const PanamaNotifications = {
    async init() {
        // Verificar si Capacitor está disponible (entorno nativo)
        if (typeof Capacitor === 'undefined' || Capacitor.getPlatform() === 'web') {
            console.log("Notificaciones: Entorno web detectado, modo nativo desactivado.");
            return;
        }

        const PushNotifications = Capacitor.Plugins.PushNotifications;
        const LocalNotifications = Capacitor.Plugins.LocalNotifications;

        console.log(`Iniciando sistema de notificaciones en ${Capacitor.getPlatform()}`);

        // 1. Solicitar Permisos (Manejo Android 13+ e iOS)
        let permStatus = await PushNotifications.checkPermissions();
        
        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
            console.warn("Permisos de notificación denegados por el usuario.");
            return;
        }

        // 2. Registro para Push Notifications (FCM/APNs)
        try {
            await PushNotifications.register();
        } catch (e) {
            console.error("Error al registrar para Push:", e);
        }

        // 3. Listeners de Registro
        PushNotifications.addListener('registration', (token) => {
            console.log('Registration Token (Cópialo para pruebas):', token.value);
            // Aquí enviarías el token a tu base de datos
        });

        PushNotifications.addListener('registrationError', (error) => {
            console.error('Error en el registro de token:', error);
        });

        // 4. Listeners de Recepción (Foreground)
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Notificación recibida en primer plano:', notification);
            // Disparar modal interno para que el usuario lo vea aunque la app esté abierta
            this.showInAppModal(notification.title, notification.body);
        });

        // 5. Configurar Recordatorios (Local)
        this.updateDailyReminder();
        this.scheduleExamReminders();
    },

    /**
     * Programa una notificación local recurrente según la preferencia del usuario
     */
    async updateDailyReminder() {
        if (typeof Capacitor === 'undefined' || Capacitor.getPlatform() === 'web') return;
        const LocalNotifications = Capacitor.Plugins.LocalNotifications;

        // Se asume que 'userData' es global y accesible (desde index.html)
        if (typeof userData === 'undefined' || !userData.notifsEnabled || !userData.studyTime) {
            console.log("Notificaciones desactivadas o falta hora de estudio.");
            await LocalNotifications.cancel({ notifications: [{ id: 101 }] });
            return;
        }

        try {
            const [hours, minutes] = userData.studyTime.split(':').map(Number);
            
            // Primero limpiamos cualquier recordatorio previo con el mismo ID
            await LocalNotifications.cancel({ notifications: [{ id: 101 }] });

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: "Hora de estudiar 🇵🇦",
                        body: "Es la hora de estudiar para tu examen de naturalización. Responde algunas preguntas y sigue progresando para obtener la nacionalidad de Panamá.",
                        id: 101,
                        schedule: {
                            on: {
                                hour: hours,
                                minute: minutes
                            },
                            repeats: true,
                            allowWhileIdle: true
                        },
                        sound: null,
                        attachments: null,
                        actionTypeId: "",
                        extra: null
                    }
                ]
            });
            console.log(`Recordatorio diario programado para las ${userData.studyTime}`);
        } catch (e) {
            console.error("Error al programar notificación local:", e);
        }
    },

    /**
     * Lógica Premium Upsell: Recordatorios basados en la fecha del examen (Solo usuarios FREE)
     */
    async scheduleExamReminders() {
        if (typeof Capacitor === 'undefined' || Capacitor.getPlatform() === 'web') return;
        const LocalNotifications = Capacitor.Plugins.LocalNotifications;

        const milestoneIds = [260, 245, 230, 225, 220, 215, 210];
        
        // Limpiar recordatorios existentes antes de reprogramar
        await LocalNotifications.cancel({ notifications: milestoneIds.map(id => ({ id })) });

        if (typeof userData === 'undefined' || userData.isPremium || !userData.examDate || !userData.notifsEnabled) {
            return;
        }

        const milestones = [60, 45, 30, 25, 20, 15, 10];
        const examDate = new Date(userData.examDate);
        const now = new Date();
        const notifications = [];

        milestones.forEach(days => {
            const reminderDate = new Date(examDate.getTime());
            reminderDate.setDate(examDate.getDate() - days);
            
            // Programar a las 10:00 AM para mayor visibilidad
            reminderDate.setHours(10, 0, 0, 0);

            if (reminderDate > now) {
                notifications.push({
                    title: "Examen de Naturalización 🇵🇦",
                    body: `Ya sólo quedan ${days} días para tu examen de naturalización de Panamá. No te arriesgues y suscríbete para desbloquear todas las preguntas.`,
                    id: 200 + days,
                    schedule: { at: reminderDate, allowWhileIdle: true }
                });
            }
        });

        if (notifications.length > 0) {
            await LocalNotifications.schedule({ notifications });
            console.log(`${notifications.length} recordatorios de examen (Upsell Free) programados.`);
        }
    },

    /**
     * Modal interno personalizado para notificaciones en primer plano
     */
    showInAppModal(title, body) {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'notif-in-app-modal';
        modalDiv.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 99999; display: flex;
            align-items: center; justify-content: center; padding: 20px;
            backdrop-filter: blur(4px);
        `;
        
        modalDiv.innerHTML = `
            <div style="background: white; border-radius: 24px; padding: 30px; width: 100%; max-width: 340px; text-align: center; border-top: 6px solid #2563eb; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);">
                <div style="width: 64px; height: 64px; background: #dbeafe; color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <i class="fa-solid fa-bell-concierge fa-2xl"></i>
                </div>
                <h2 style="font-size: 18px; font-weight: 900; color: #111827; margin-bottom: 12px; line-height: 1.2;">${title}</h2>
                <p style="font-size: 13px; color: #4b5563; margin-bottom: 30px; line-height: 1.6;">${body}</p>
                <button id="close-notif-btn" style="width: 100%; background: #2563eb; color: white; font-weight: 800; padding: 16px; border-radius: 14px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; border: none; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.4);">Entendido</button>
            </div>
        `;
        
        document.body.appendChild(modalDiv);
        document.getElementById('close-notif-btn').onclick = () => {
            document.body.removeChild(modalDiv);
        };
    }
};

// Ejecutar inicialización al cargar el DOM si estamos en entorno nativo
document.addEventListener('DOMContentLoaded', () => {
    // Retraso de 2 segundos para asegurar que Capacitor está listo
    setTimeout(() => {
        if (typeof Capacitor !== 'undefined' && Capacitor.getPlatform() !== 'web') {
            PanamaNotifications.init();
        }
    }, 2000);
});


/**
 * Reactividad: Aseguramos que las notificaciones se actualicen cuando el usuario cambia
 * sus ajustes en tiempo real sin reiniciar la app.
 */
setTimeout(() => {
    if (typeof setStudyTime === 'function') {
        const originalSetStudyTime = setStudyTime;
        window.setStudyTime = function(val) {
            originalSetStudyTime(val);
            if (typeof PanamaNotifications !== 'undefined') PanamaNotifications.updateDailyReminder();
        };
    }

    if (typeof toggleNotifications === 'function') {
        const originalToggleNotifications = toggleNotifications;
        window.toggleNotifications = function() {
            originalToggleNotifications();
            if (typeof PanamaNotifications !== 'undefined') {
                PanamaNotifications.updateDailyReminder();
                PanamaNotifications.scheduleExamReminders();
            }
        };
    }

    if (typeof setExamDate === 'function') {
        const originalSetExamDate = setExamDate;
        window.setExamDate = function(val) {
            originalSetExamDate(val);
            if (typeof PanamaNotifications !== 'undefined') PanamaNotifications.scheduleExamReminders();
        };
    }

    if (typeof toggleFreeMode === 'function') {
        const originalToggleFreeMode = toggleFreeMode;
        window.toggleFreeMode = function() {
            originalToggleFreeMode();
            if (typeof PanamaNotifications !== 'undefined') PanamaNotifications.scheduleExamReminders();
        };
    }
}, 3000);
