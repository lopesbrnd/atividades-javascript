document.getElementById('buscarButton').addEventListener('click', () => {
    const anoSelecionado = document.getElementById('ano').value;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    if (!anoSelecionado) {
        resultadosDiv.innerHTML = '<p>Por favor, digite um ano válido.</p>';
        return;
    }

    fetch(`https://brasilapi.com.br/api/feriados/v1/${anoSelecionado}`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.length === 0) {
                resultadosDiv.innerHTML = `<p>Não há feriados para o ano de ${anoSelecionado}.</p>`;
                return;
            }

            const feriadosPorMes = {};

            // Inicializa os meses
            const meses = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril',
                'Maio', 'Junho', 'Julho', 'Agosto',
                'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];

            dados.forEach(feriado => {
                const dataFeriado = new Date(feriado.date + 'T00:00:00'); // Garante que a data seja tratada como local
                const mes = meses[dataFeriado.getMonth()];
                const dia = dataFeriado.getDate();

                if (!feriadosPorMes[mes]) {
                    feriadosPorMes[mes] = [];
                }
                feriadosPorMes[mes].push(`${dia} - ${feriado.name}`);
            });

            const totalFeriados = dados.length;
            resultadosDiv.innerHTML = `<p>Total de feriados: ${totalFeriados}</p>`;

            // Exibe os meses em ordem
            meses.forEach(mes => {
                if (feriadosPorMes[mes]) {
                    const listaFeriados = feriadosPorMes[mes];
                    resultadosDiv.innerHTML += `<div class="mes"><h2>${mes} (${listaFeriados.length})</h2><p>${listaFeriados.join('<br>')}</p></div>`;
                }
            });
        })
        .catch(erro => {
            console.error('Erro ao buscar dados:', erro);
            resultadosDiv.innerHTML = `<p>Erro ao buscar dados. Tente novamente mais tarde.</p>`;
        });
});
