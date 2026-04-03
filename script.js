const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userIn = loginForm.username.value;
        const passIn = loginForm.password.value;

        const usuarioSalvo = localStorage.getItem(userIn);

        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);

            if (dados.senha === passIn) {
                sessionStorage.setItem("usuarioLogado", userIn);
                window.location.href = "dashboard.html";
            } else {
                if (message) {
                    message.innerText = "Senha incorreta!";
                    message.style.color = "red";
                }
            }
        } else {
            const confirmar = confirm("Usuário não encontrado. Criar novo personagem?");
            
            if (confirmar) {
                // CORREÇÃO: Estrutura de dados completa para evitar bugs no painel
                const novoPlayer = {
                    senha: passIn,
                    dinheiro: 0, // Ajustado para dar poder de compra inicial no RPG
                    inventario: [],
                    armasCompradas: [],
                    vidaCorpo: {
                        cabeca: { atual: 12, max: 10 },
                        torso: { atual: 25, max: 20 },
                        bracoDir: { atual: 15, max: 10 },
                        bracoEsq: { atual: 15, max: 10 },
                        pernaDir: { atual: 15, max: 10 },
                        pernaEsq: { atual: 15, max: 10 }
                    },
                    statusMentais: { 
                        sanidade: { atual: 20, max: 20 }, 
                        stress: { atual: 0, max: 20 }, 
                        consciencia: { atual: 15, max: 15 } 
                    }
                };

                localStorage.setItem(userIn, JSON.stringify(novoPlayer));
                alert("Personagem criado! Agora entre com sua senha.");
            }
        }
    });
}

// ISSO VAI NO SCRIPT DE INICIALIZAÇÃO (CARREGAMENTO)
if (userLogado) {
    let dados = JSON.parse(localStorage.getItem(userLogado));
    if (dados) {
        let modificado = false;
        // ... (outras verificações) ...

        if (!dados.statusMentais) { 
            dados.statusMentais = { 
                sanidade: { atual: 20, max: 20, min: 0 }, 
                stress: { atual: 0, max: 20, min: 0 }, 
                consciencia: { atual: 15, max: 15, min: -50 } 
            }; 
            modificado = true; 
        } else {
            // Garante que saves antigos suportem negativos
            if (dados.statusMentais.sanidade.min === undefined) {
                dados.statusMentais.sanidade.min = 0;
                dados.statusMentais.stress.min = 0;
                dados.statusMentais.consciencia.min = -25;
                modificado = true;
            }
        }
        if (modificado) localStorage.setItem(userLogado, JSON.stringify(dados));
    }
}
