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
