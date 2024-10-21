// Preencher o select com anos de 1901 até o ano atual
const anoSelect = document.getElementById('ano');
const anoAtual = new Date().getFullYear();
for (let ano = 1901; ano <= anoAtual; ano++) {
    const opcao = document.createElement('option');
    opcao.value = ano;
    opcao.textContent = ano;
    anoSelect.appendChild(opcao);
}

document.getElementById('buscarButton').addEventListener('click', () => {
    const anoSelecionado = anoSelect.value;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    fetch(`https://api.nobelprize.org/v1/prize.json?year=${anoSelecionado}`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.prizes.length === 0) {
                resultadosDiv.innerHTML = `<p>Não há laureados para o ano de ${anoSelecionado}.</p>`;
                return;
            }

            // Cria uma tabela para exibir os resultados
            const tabela = document.createElement('table');
            const cabecalho = document.createElement('thead');
            cabecalho.innerHTML = `<tr><th>Categoria</th><th>Laureado</th><th>Motivação</th></tr>`;
            tabela.appendChild(cabecalho);

            const corpoTabela = document.createElement('tbody');

            dados.prizes.forEach(premio => {
                const categoriaFormatada = premio.category.charAt(0).toUpperCase() + premio.category.slice(1);
                premio.laureates.forEach(laureado => {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `
                        <td>${categoriaFormatada}</td>
                        <td>${laureado.firstname} ${laureado.surname}</td>
                        <td>${laureado.motivation || 'Motivação não disponível'}</td>
                    `;
                    corpoTabela.appendChild(linha);
                });
            });

            tabela.appendChild(corpoTabela);
            resultadosDiv.appendChild(tabela);
        })
        .catch(erro => {
            console.error('Erro ao buscar dados:', erro);
            resultadosDiv.innerHTML = `<p>Erro ao buscar dados. Tente novamente mais tarde.</p>`;
        });
});
