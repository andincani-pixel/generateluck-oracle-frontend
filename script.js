// script.js

// URL del tuo server backend.
// IMPORTANTE: Per il test locale, usiamo localhost sulla porta 8080.
// Quando deployeremo su Google Cloud Run, DOVRA' essere aggiornato con l'URL finale del servizio.
const API_URL = 'https://generateluck-oracle-824326930559.us-central1.run.app/generate-fortune';

// Elementi del DOM
const generateButton = document.getElementById('generate-button');
const oracleMessage = document.getElementById('oracle-message');
const loadingSpinner = document.getElementById('loading-spinner');
const fortuneCard = document.getElementById('fortune-card');

// --- Funzione per gestire l'interazione con il Backend ---
async function fetchFortune() {
    // 1. Disabilita il pulsante e mostra lo spinner
    generateButton.disabled = true;
    generateButton.textContent = "Attendere...";
    loadingSpinner.classList.remove('hidden');
    oracleMessage.textContent = 'L\'Oracolo sta riflettendo...';
    fortuneCard.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.5)'; // Aggiunge un bagliore

    try {
        // 2. Chiama l'endpoint del server Node.js
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 3. Gestione della risposta
        const data = await response.json();

        if (response.ok) {
            // Successo: mostra la fortuna
            oracleMessage.textContent = data.fortune;
        } else {
            // Errore: gestisci i limiti RPD/RPM o altri errori
            oracleMessage.textContent = data.message || 'Errore sconosciuto. Riprova.';
        }
    } catch (error) {
        // Errore di connessione (es. il server Node.js non è attivo)
        console.error('Connection Error:', error);
        oracleMessage.textContent = 'Errore di connessione. Assicurati che il tuo server (server.js) sia avviato.';
    } finally {
        // 4. Riabilita il pulsante e nascondi lo spinner
        loadingSpinner.classList.add('hidden');
        generateButton.textContent = "Svela la Fortuna";
        generateButton.disabled = false;
        fortuneCard.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.2)'; // Rimuovi il bagliore forte
    }
}

// --- Listener Eventi ---

generateButton.addEventListener('click', fetchFortune);
