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
                const novoPlayer = {
                    senha: passIn,
                    dinheiro: 100, 
                    inventario: [],
                    armasCompradas: [],
                    vidaCorpo: {
                        // CORREÇÃO: Atual sempre menor ou igual ao Max
                        cabeca: { atual: 10, max: 12 },
                        torso: { atual: 20, max: 25 },
                        bracoDir: { atual: 10, max: 15 },
                        bracoEsq: { atual: 10, max: 15 },
                        pernaDir: { atual: 10, max: 15 },
                        pernaEsq: { atual: 10, max: 15 }
                    },
                    statusMentais: { 
                        // ADICIONADO: 'min' já na criação para evitar bugs
                        sanidade: { atual: 20, max: 20, min: 0 }, 
                        stress: { atual: 0, max: 20, min: 0 }, 
                        consciencia: { atual: 15, max: 15, min: -25 } 
                    }
                };

                localStorage.setItem(userIn, JSON.stringify(novoPlayer));
                alert("Personagem criado! Agora entre com sua senha.");
            }
        }
    });
}

// ESTA PARTE ABAIXO DEVE FICAR NO SEU ARQUIVO "DASHBOARD.JS" 
// OU NO TOPO DO SCRIPT DE CARREGAMENTO DA FICHA
const checkUser = sessionStorage.getItem("usuarioLogado");
if (checkUser) {
    let dados = JSON.parse(localStorage.getItem(checkUser));
    if (dados) {
        let modificado = false;

        if (!dados.statusMentais) { 
            dados.statusMentais = { 
                sanidade: { atual: 20, max: 20, min: 0 }, 
                stress: { atual: 0, max: 20, min: 0 }, 
                consciencia: { atual: 15, max: 15, min: -25 } 
            }; 
            modificado = true; 
        } else if (dados.statusMentais.sanidade.min === undefined) {
            // Garante que saves antigos que não tinham 'min' agora tenham
            dados.statusMentais.sanidade.min = 0;
            dados.statusMentais.stress.min = 0;
            dados.statusMentais.consciencia.min = -25;
            modificado = true;
        }

        if (modificado) {
            localStorage.setItem(checkUser, JSON.stringify(dados));
        }
    }
}
