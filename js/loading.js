// Pantalla de carga
class LoadingScreen {
    constructor() {
        this.loadingScreen = null;
        this.progressBar = null;
        this.progressText = null;
        this.logo = null;
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.startLoading();
    }

    createLoadingScreen() {
        // Crear el contenedor principal
        this.loadingScreen = document.createElement('div');
        this.loadingScreen.className = 'loading-screen';
        this.loadingScreen.innerHTML = `
            <div class="loading-container">
                <div class="loading-logo">
                    <span class="logo-text">Portfolio</span>
                    <p>Emilio Mochón</p>
                </div>
                <div class="loading-progress">
                    <div class="spinner-container">
                        <div class="spinner"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
                <div class="loading-message">Cargando...</div>
            </div>
        `;

        // Agregar estilos CSS
        this.addStyles();
        
        // Agregar al body
        document.body.appendChild(this.loadingScreen);
        
        // Obtener referencias a los elementos
        this.progressBar = this.loadingScreen.querySelector('.spinner');
        this.progressText = this.loadingScreen.querySelector('.progress-text');
        this.logo = this.loadingScreen.querySelector('.loading-logo');
    }

    addStyles() {
        const styles = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #212421;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.8s ease-out;
            }

            .loading-screen.fade-out {
                opacity: 0;
            }

            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 3rem;
                max-width: 400px;
                text-align: center;
            }

            .loading-logo {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 2rem;
                flex-direction: column;
            }

            .loading-logo p{
                font-size: 2.5rem;
                font-weight: 400;
                color:var(--primary-color);
                letter-spacing: -0.5px;
                font-family: 'Poppins', sans-serif;
            }

            .loading-logo .logo-dot {
                width: 12px;
                height: 12px;
                background-color: #ea8f10;
                border-radius: 50%;
                animation: pulse 2s ease-in-out infinite;
            }

            .loading-logo .logo-text {
                font-size: 2rem;
                font-weight: 400;
                color: #ffffff;
                letter-spacing: -0.5px;
                font-family: 'Poppins', sans-serif;
            }

            .loading-progress {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }

            .spinner-container {
                position: relative;
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(255, 255, 255, 0.1);
                border-top: 3px solid #ea8f10;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                position: relative;
            }

            .spinner::after {
                content: '';
                position: absolute;
                top: -3px;
                left: -3px;
                right: -3px;
                bottom: -3px;
                border: 3px solid transparent;
                border-top: 3px solid rgba(234, 143, 16, 0.3);
                border-radius: 50%;
                animation: spin 1.5s linear infinite reverse;
            }

            .progress-text {
                font-size: 1.2rem;
                font-weight: 400;
                color: #ffffff;
                font-family: 'Poppins', sans-serif;
                margin-top: 1rem;
            }

            .loading-message {
                font-size: 1rem;
                color: #b0b0b0;
                font-family: 'Poppins', sans-serif;
                margin-top: 1rem;
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.2);
                    opacity: 0.7;
                }
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            @media (max-width: 768px) {
                .loading-container {
                    gap: 2rem;
                    padding: 0 2rem;
                }

                .loading-logo .logo-text {
                    font-size: 1.5rem;
                }

                .progress-text {
                    font-size: 1rem;
                }

                .loading-message {
                    font-size: 0.9rem;
                }

                .spinner-container {
                    width: 60px;
                    height: 60px;
                }

                .spinner {
                    width: 45px;
                    height: 45px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    startLoading() {
        let progress = 0;
        const messages = [
            'Inicializando...',
            'Cargando recursos...',
            'Preparando contenido...',
            'Finalizando...'
        ];
        let messageIndex = 0;

        const updateProgress = () => {
            if (progress < 100) {
                progress += Math.random() * 15 + 5; // Incremento aleatorio entre 5-20
                if (progress > 100) progress = 100;

                // Actualizar texto de progreso
                this.progressText.textContent = `${Math.round(progress)}%`;

                // Cambiar mensaje cada 25%
                const newMessageIndex = Math.floor(progress / 25);
                if (newMessageIndex !== messageIndex && newMessageIndex < messages.length) {
                    messageIndex = newMessageIndex;
                    this.loadingScreen.querySelector('.loading-message').textContent = messages[messageIndex];
                }

                // Continuar la animación
                setTimeout(updateProgress, 100 + Math.random() * 200);
            } else {
                // Carga completada
                this.completeLoading();
            }
        };

        updateProgress();
    }

    completeLoading() {
        // Esperar un momento antes de ocultar
        setTimeout(() => {
            this.loadingScreen.classList.add('fade-out');
            
            // Remover la pantalla de carga después de la animación
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
                
                // Trigger evento de carga completada
                document.dispatchEvent(new CustomEvent('loadingComplete'));
            }, 800);
        }, 500);
    }
}

// Inicializar la pantalla de carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Simular tiempo de carga mínimo
    setTimeout(() => {
        new LoadingScreen();
    }, 100);
});

// Función para mostrar la pantalla de carga manualmente
function showLoadingScreen() {
    new LoadingScreen();
}

// Función para ocultar la pantalla de carga manualmente
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 800);
    }
} 