document.addEventListener('DOMContentLoaded', function () {
    typeWriter();
    renderizarProjetosAcademicos();
    renderizarProjetosPessoais();
    configurarModal();
});

/* ----------- Typewriter (Hello World, I'm) ----------- */
function typeWriter() {
    const text = "Hello World, I'm";
    const element = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    let index = 0;

    function escrever() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            cursor.style.left = `${element.offsetWidth}px`;
            setTimeout(escrever, 250);
        }
    }

    escrever();
}

const projetosAcademicos = [
    {
        nome: "Capy Scrum",
        descricao: `Desenvolvido o site de um curso interativo sobre a metodologia Scrum, cobrindo seus princípios, práticas e papel dos membros da equipe. 
        O curso inclui materiais teóricos, atividades práticas e avaliações para garantir a compreensão dos participantes.
        Projeto desenvolvido em grupo para a ABP do primeiro semestre do curso Desenvolvimento de Software Multiplataforma na Fatec. 
        <a href="https://github.com/Capydev-jac/Capydev---1DSM" class="link-projeto" target="_blank" rel="noopener noreferrer">Confira o código</a>`,
        imagem: "./src/img/capscrum1.PNG",
        tecnologias: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
        ]
    },
];

const projetosPessoais = [
    {
        nome: "Logo Ali",
        descricao: `Logo Ali é um blog criado para funcionar como um diário de viagem, no qual compartilhei as experiências da minha primeira jornada. 
        Desenvolvi este projeto com o objetivo de aprimorar minhas habilidades e, ao mesmo tempo, registrar e lembrar cada momento dessa experiência única.
        <a href="https://github.com/GabrielFrois/logo-ali" class="link-projeto" target="_blank" rel="noopener noreferrer">Confira o código</a>`,
        imagem: "./src/img/logoali.PNG",
        tecnologias: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
        ]
    }
];

function renderizarProjetosAcademicos() {
    const container = document.getElementById("projetos-academicos-container");

    projetosAcademicos.forEach((projeto, index) => {
        const projetoDiv = document.createElement("div");
        projetoDiv.className = "projeto";

        // Título centralizado acima
        const titulo = document.createElement("p");
        titulo.className = "nome-projeto";
        titulo.innerText = projeto.nome;
        projetoDiv.appendChild(titulo);

        // Container que alterna imagem/texto
        const contentDiv = document.createElement("div");
        contentDiv.className = "projeto-content";

        const imagem = document.createElement("div");
        imagem.className = "projeto-imagem";
        imagem.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.nome}">
            <div class="tools-icons">
                ${projeto.tecnologias.map(tech => `<img src="${tech}" alt="Tech">`).join("")}
            </div>
        `;

        const texto = document.createElement("div");
        texto.className = "projeto-texto";
        texto.innerHTML = projeto.descricao.replace(/\n/g, '<br>');

        // Alterna layout com base na paridade do índice
        if (index % 2 === 0) {
            contentDiv.appendChild(texto);
            contentDiv.appendChild(imagem);
        } else {
            contentDiv.appendChild(imagem);
            contentDiv.appendChild(texto);
        }

        projetoDiv.appendChild(contentDiv);
        container.appendChild(projetoDiv);
    });

    configurarEventosImagens(); // Aplica evento de modal
}

function renderizarProjetosPessoais() {
    const container = document.getElementById("projetos-pessoais-container");

    projetosPessoais.forEach((projeto, index) => {
        const projetoDiv = document.createElement("div");
        projetoDiv.className = "projeto";

        // Título centralizado acima
        const titulo = document.createElement("p");
        titulo.className = "nome-projeto";
        titulo.innerText = projeto.nome;
        projetoDiv.appendChild(titulo);

        // Container que vai alternar imagem/texto
        const contentDiv = document.createElement("div");
        contentDiv.className = "projeto-content";

        const imagem = document.createElement("div");
        imagem.className = "projeto-imagem";
        imagem.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.nome}">
            <div class="tools-icons">
                ${projeto.tecnologias.map(tech => `<img src="${tech}" alt="Tech">`).join("")}
            </div>
        `;

        const texto = document.createElement("div");
        texto.className = "projeto-texto";
        texto.innerHTML = projeto.descricao.replace(/\n/g, '<br>');

        // Alterna layout com base na paridade do índice
        if (index % 2 === 0) {
            contentDiv.appendChild(texto);
            contentDiv.appendChild(imagem);
        } else {
            contentDiv.appendChild(imagem);
            contentDiv.appendChild(texto);
        }

        projetoDiv.appendChild(contentDiv);
        container.appendChild(projetoDiv);
    });

    configurarEventosImagens(); // Aplica evento de modal
}

/* ----------- Modal de Imagem ----------- */
function configurarModal() {
    const modal = document.getElementById("imagemModal");
    const fecharBtn = document.querySelector('.fechar');

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            fecharModal();
        }
    });

    fecharBtn.addEventListener('click', fecharModal);
}

function configurarEventosImagens() {
    const imagens = document.querySelectorAll('.projeto-imagem img');
    imagens.forEach(imagem => {
        imagem.addEventListener('click', function () {
            abrirModal(imagem);
        });
    });
}

function abrirModal(imgElement) {
    const modal = document.getElementById("imagemModal");
    const modalImg = document.getElementById("imgModal");

    modal.classList.add("ativo");
    modalImg.src = imgElement.src;
}

function fecharModal() {
    const modal = document.getElementById("imagemModal");
    modal.classList.remove("ativo");
}

document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === "#home") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const destino = document.querySelector(href);
        if (destino) {
            const yOffset = -55; // ajuste conforme a altura do seu header fixo
            const y = destino.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

