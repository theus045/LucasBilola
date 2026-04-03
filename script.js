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
                    dinheiro: 1500, // Ajustado para dar poder de compra inicial no RPG
                    inventario: [],
                    armasCompradas: [],
                    vidaCorpo: {
                        cabeca: { atual: 10, max: 10 },
                        torso: { atual: 20, max: 20 },
                        bracoDir: { atual: 10, max: 10 },
                        bracoEsq: { atual: 10, max: 10 },
                        pernaDir: { atual: 10, max: 10 },
                        pernaEsq: { atual: 10, max: 10 }
                    },
                    statusMentais: { 
                        sanidade: { atual: 20, max: 40 }, 
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

// CORREÇÃO: Verificação robusta de integridade de dados antigos
const userLogado = sessionStorage.getItem("usuarioLogado");

if (userLogado) {
    let dados = JSON.parse(localStorage.getItem(userLogado));

    if (dados) {
        let modificado = false;
        if (dados.dinheiro === undefined) { dados.dinheiro = 0; modificado = true; }
        if (!dados.inventario) { dados.inventario = []; modificado = true; }
        if (!dados.armasCompradas) { dados.armasCompradas = []; modificado = true; }
        if (!dados.vidaCorpo) { 
            dados.vidaCorpo = { cabeca:{atual:10, max:10}, torso:{atual:20, max:20}, bracoDir:{atual:10, max:10}, bracoEsq:{atual:10, max:10}, pernaDir:{atual:10, max:10}, pernaEsq:{atual:10, max:10} }; 
            modificado = true; 
        }
        if (!dados.statusMentais) { 
            dados.statusMentais = { sanidade:{atual:20, max:40}, stress:{atual:0, max:20}, consciencia:{atual:15, max:15} }; 
            modificado = true; 
        }
        
        if (modificado) {
            localStorage.setItem(userLogado, JSON.stringify(dados));
        }
    }
}
