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
