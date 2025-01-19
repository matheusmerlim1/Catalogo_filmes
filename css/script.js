// script.js
const url = "https://rafaelescalfoni.github.io/desenv_web/filmes.json";

// Função para carregar os dados do JSON
async function carregarFilmes() {
    try {
        const resposta = await fetch(url);
        const filmes = await resposta.json();
        console.log(filmes); // Teste dos dados retornados
        renderizarFilmes(filmes);
    } catch (erro) {
        console.error("Erro ao carregar os filmes:", erro);
    }
}

// Função para renderizar os filmes
function renderizarFilmes(filmes) {
    const catalogo = document.getElementById("catalogo");

    filmes.forEach((filme) => {
        // Criar o card
        const card = document.createElement("div");
        card.classList.add("card");

        // Faixa etária
        let faixaCor = "";
        if (filme.classificacao <= 14) faixaCor = "verde";
        else if (filme.classificacao < 18) faixaCor = "amarelo";
        else faixaCor = "vermelho";

        card.innerHTML = `
            <div class="card-header">
                <h2>${filme.titulo}</h2>
                <span class="faixa-etaria ${faixaCor}">${filme.classificacao}</span>
            </div>
            <div class="card-body">
                <p><strong>Gêneros:</strong> ${filme.generos.join(", ")}</p>
                <p><strong>Elenco:</strong> ${filme.elenco.join(", ")}</p>
                <p>${filme.resumo}</p>
            </div>
            <div class="card-footer">
                <strong>Títulos semelhantes:</strong>
                <ul>
                    ${filme.titulosSemelhantes
                        .map((id) => `<li>${filmes[id - 1]?.titulo || "Desconhecido"}</li>`)
                        .join("")}
                </ul>
            </div>
        `;

        catalogo.appendChild(card);
    });
}

// Carregar os filmes ao iniciar a página
carregarFilmes();
