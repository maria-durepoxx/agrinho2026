// Aguarda o carregamento total do DOM antes de executar os scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MANIPULAÇÃO DO TEMA (MODO ESCURO)
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Verifica se o usuário já tinha uma preferência salva localmente
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        atualizarTextoBotaoTema(savedTheme);
    }

    themeToggleBtn.addEventListener("click", () => {
        // Captura o tema atual atribuído à tag HTML
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let newTheme = "light";

        if (currentTheme !== "dark") {
            newTheme = "dark";
        }

        // Aplica o novo tema e salva no LocalStorage
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        atualizarTextoBotaoTema(newTheme);
    });

    function atualizarTextoBotaoTema(tema) {
        themeToggleBtn.textContent = tema === "dark" ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    }


    // ==========================================
    // 2. MENSAGENS DINÂMICAS E INTERAÇÕES
    // ==========================================
    const ctaBtn = document.getElementById("cta-btn");
    const messageArea = document.getElementById("dynamic-message-area");
    const dynamicText = document.getElementById("dynamic-text");

    // Banco de fatos dinâmicos sobre sustentabilidade agropecuária
    const fatosSustentaveis = [
        "💡 Sabia que a rotação de culturas pode aumentar a produtividade do solo em até 20% sem aditivos químicos?",
        "🌱 O plantio direto evita a erosão do solo e retém muito mais água na terra.",
        "🚜 A tecnologia de precisão reduz o uso de defensivos agrícolas em até 30% através da aplicação localizada.",
        "💧 Sistemas modernos de irrigação por gotejamento economizam mais de 40% da água utilizada na lavoura."
    ];

    ctaBtn.addEventListener("click", () => {
        // Seleciona um fato aleatório da lista
        const indiceAleatorio = Math.floor(Math.random() * fatosSustentaveis.length);
        dynamicText.textContent = fatosSustentaveis[indiceAleatorio];

        // Remove a classe oculta e exibe a área com uma transição suave
        messageArea.classList.remove("hidden");
        
        // Faz a página rolar suavemente até a nova mensagem exibida
        messageArea.scrollIntoView({ behavior: "smooth" });
    });


    // ==========================================
    // 3. VALIDAÇÃO SIMPLES DO FORMULÁRIO
    // ==========================================
    const form = document.getElementById("newsletter-form");
    const inputName = document.getElementById("username");
    const inputEmail = document.getElementById("useremail");
    
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const successBox = document.getElementById("form-success");

    form.addEventListener("submit", (event) => {
        // Impede o envio padrão do formulário (recarregamento da página)
        event.preventDefault();
        
        let isValid = true;

        // Validação do campo nome (Mínimo de 3 caracteres)
        if (inputName.value.trim().length < 3) {
            nameError.style.display = "block";
            inputName.style.borderColor = "#e74c3c";
            isValid = false;
        } else {
            nameError.style.display = "none";
            inputName.style.borderColor = "var(--accent-color)";
        }

        // Validação simples de formato de e-mail usando Expressão Regular (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail.value.trim())) {
            emailError.style.display = "block";
            inputEmail.style.borderColor = "#e74c3c";
            isValid = false;
        } else {
            emailError.style.display = "none";
            inputEmail.style.borderColor = "var(--accent-color)";
        }

        // Se passar por todas as validações de comportamento
        if (isValid) {
            // Exibe a mensagem de sucesso e esconde o formulário
            successBox.classList.remove("hidden");
            form.reset(); // Limpa os campos de digitação
            
            // Reseta as bordas dos inputs para os estados originais
            inputName.style.borderColor = "var(--text-muted)";
            inputEmail.style.borderColor = "var(--text-muted)";

            // Remove a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                successBox.classList.add("hidden");
            }, 5000);
        }
    });
});
