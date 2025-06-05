document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados da API ao carregar a página
  fetchAlunos();
});

// Função para carregar todos os alunos da API
function fetchAlunos() {
  fetch('http://localhost:8080/api/aluno', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    addlinha(data); // Adiciona as linhas na tabela com os dados
  })
  .catch(error => {
    console.error('Erro ao buscar alunos:', error);
  });
}

// Função para adicionar linha na tabela
function addlinha(dadosAPI) {
  const tabela = document.getElementById('tabelaCorpo');
  tabela.innerHTML = ''; // Limpar tabela antes de adicionar novos dados
  dadosAPI.forEach(element => {   
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td class="px-4 py-2">${element.id}</td>
      <td class="px-4 py-2">${element.nome}</td>
      <td class="px-4 py-2">${element.email}</td>
      <td class="px-4 py-2">
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this, ${element.id})">remover</button>
        <button class="bg-blue-500 text-white px-2 py-1 rounded" onclick="editar(${element.id}, '${element.nome}', '${element.email}')">editar</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

// Função para cadastrar novos alunos
function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Faltam dados para cadastrar'
    });
    return;
  }

  if (idEditando) {
    // Atualizar aluno existente
    fetch(`http://localhost:8080/api/aluno/${idEditando}`, {
      method: 'PUT', // ou PATCH dependendo da API
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire('Atualizado!', 'Cadastro atualizado com sucesso.', 'success');
      idEditando = null;
      document.querySelector('form button[type="submit"]').textContent = "Adicionar";
      document.getElementById('nome').value = "";
      document.getElementById('email').value = "";
      fetchAlunos(); // Atualiza tabela
    })
    .catch(error => {
      console.error('Erro ao atualizar:', error);
      Swal.fire('Erro!', 'Erro ao atualizar cadastro.', 'error');
    });
  } else {
    // Cadastro novo (seu código atual)
    fetch('http://localhost:8080/api/aluno', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire('Sucesso!', 'Cadastro feito com sucesso', 'success');
      document.getElementById('nome').value = "";
      document.getElementById('email').value = "";
      fetchAlunos();
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
      Swal.fire('Erro!', 'Erro ao enviar dados', 'error');
    });
  }
}


let idEditando = null;

function editar(id, nome, email) {
  idEditando = id;
  document.getElementById('editarNome').value = nome;
  document.getElementById('editarEmail').value = email;

  // Mostrar modal
  document.getElementById('modalEditar').classList.remove('hidden');
}

// Função para fechar modal
function fecharModal() {
  document.getElementById('modalEditar').classList.add('hidden');
  idEditando = null;
}

// Função para salvar a edição
function salvarEdicao(event) {
  event.preventDefault();

  const nome = document.getElementById('editarNome').value.trim();
  const email = document.getElementById('editarEmail').value.trim();

  if (!nome || !email) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Preencha todos os campos'
    });
    return;
  }

  fetch(`http://localhost:8080/api/aluno/${idEditando}`, {
    method: 'PUT', // ou PATCH dependendo da API
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email })
  })
  .then(response => response.json())
  .then(data => {
    Swal.fire('Atualizado!', 'Cadastro atualizado com sucesso.', 'success');
    fecharModal();
    fetchAlunos(); // Atualiza tabela
  })
  .catch(error => {
    console.error('Erro ao atualizar:', error);
    Swal.fire('Erro!', 'Erro ao atualizar cadastro.', 'error');
  });
}


// Função para remover aluno da tabela e da API
function remover(botao, id) {
  Swal.fire({
    icon: 'question',
    title: 'Are you Sure?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      // Remover a linha da tabela
      const linhaRemover = botao.closest('tr');
      linhaRemover.remove();

      // Remover o aluno da API
      fetch(`http://localhost:8080/api/aluno/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          Swal.fire('Confirmado!', 'Aluno removido com sucesso.', 'success');
        } else {
          Swal.fire('Erro!', 'Erro ao remover aluno.', 'error');
        }
      })
      .catch(error => {
        console.error("Erro ao remover aluno:", error);
        Swal.fire('Erro!', 'Erro ao remover o aluno.', 'error');
      });
    } else {
      Swal.fire('Cancelado', '', 'info');
    }
  });
}
