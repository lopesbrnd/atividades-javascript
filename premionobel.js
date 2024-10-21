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

             dados.prizes.forEach(premio => {
                 const categoriaDiv = document.createElement('div');
                 categoriaDiv.classList.add('categoria');
                 const categoriaFormatada = premio.category.charAt(0).toUpperCase() + premio.category.slice(1);
                 categoriaDiv.innerHTML = `<h2>${categoriaFormatada}</h2>`;
                 premio.laureates.forEach(laureado => {
                     categoriaDiv.innerHTML += `<p><strong>Laureado:</strong> ${laureado.firstname} ${laureado.surname} <br><br><strong>Motivação:</strong> ${laureado.motivation || 'Motivação não disponível'}</p>`;
                 });

                 resultadosDiv.appendChild(categoriaDiv);
             });
         })
         .catch(erro => {
             console.error('Erro ao buscar dados:', erro);
             resultadosDiv.innerHTML = `<p>Erro ao buscar dados. Tente novamente mais tarde.</p>`;
         });
 });