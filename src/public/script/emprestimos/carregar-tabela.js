// Função para buscar informações da tabela de empréstimos
function carregarEmprestimos() {
    fetch('http://localhost:3011/emprestimo')  // Endpoint do backend
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

            data.forEach(emprestimo => {
                const dataDevolucao = emprestimo.dataDevolucao;
                const dataEmprestimo = emprestimo.dataEmprestimo

                dataDevolucaoDate = new Date(dataDevolucao);
                dataEmprestimoDate = new Date(dataEmprestimo)

                const diaDevolucao = dataDevolucaoDate.getUTCDate(); // Dia (UTC)
                const mesDevolucao = dataDevolucaoDate.getUTCMonth() + 1; // Mês (UTC, começa em 0)
                const anoDevolucao = dataDevolucaoDate.getUTCFullYear(); // Ano (UTC)

                const diaEmprestimo = dataEmprestimoDate.getUTCDate(); // Dia (UTC)
                const mesEmprestimo = dataEmprestimoDate.getUTCMonth() + 1; // Mês (UTC, começa em 0)
                const anoEmprestimo = dataEmprestimoDate.getUTCFullYear(); // Ano (UTC)

                // Formatar em dd/mm/yyyy
                var dataFormatadaDevolucao = `${diaDevolucao.toString().padStart(2, '0')}/${mesDevolucao.toString().padStart(2, '0')}/${anoDevolucao}`;
                var dataFormatadaEmprestimo = `${diaEmprestimo.toString().padStart(2, '0')}/${mesEmprestimo.toString().padStart(2, '0')}/${anoEmprestimo}`;

                if(dataFormatadaDevolucao == '01/01/1970'){
                    dataFormatadaDevolucao = 'Não definido';
                }
                if(dataFormatadaEmprestimo == '01/01/1970'){
                    dataFormatadaEmprestimo = 'Não definido';   
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${emprestimo.id}</td>
                    <td>${emprestimo.item.nome}</td>
                    <td>${emprestimo.pessoa.nome}</td>
                    <td>${emprestimo.item.itemEPI.validade}</td>
                    <td>${emprestimo.usuario.username}</td>
                    <td>${dataFormatadaEmprestimo}</td>
                    <td>${dataFormatadaDevolucao}</td>
                    <td>
                      <div class="d-flex justify-content-start">
            <button class="btn btn-success me-2" onclick="modalEdicao('${emprestimo.id}', '${emprestimo.item.id}', '${emprestimo.pessoa.id}', '${emprestimo.dataEmprestimo}', '${emprestimo.dataDevolucao}')">Editar</button>
            <button class="btn btn-danger" onclick="modalExclusaoEmprestimo('${emprestimo.id}')">Excluir</button>
        </div> </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar os empréstimos:', error));
}

// Chama a função fetchEmprestimos ao carregar a página
window.onload = function () {
    carregarEmprestimos();
};
