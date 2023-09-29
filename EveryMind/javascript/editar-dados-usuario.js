document.addEventListener('DOMContentLoaded', function () {
  // Função para adicionar campos dinamicamente
  function adicionarCampo(container, template, removerClass) {
    const novoCampo = template.cloneNode(true);
    container.appendChild(novoCampo);

    const botoesRemover = novoCampo.getElementsByClassName(removerClass);
    for (let i = 0; i < botoesRemover.length; i++) {
      botoesRemover[i].addEventListener('click', function () {
        container.removeChild(novoCampo);
      });
    }
  }

  // Educação
  const adicionarEducacaoButton = document.getElementById('adicionar-educacao');
  const educacaoContainer = document.getElementById('educacao-container');
  const templateEducacao = document.querySelector('.educacao-item');

  adicionarEducacaoButton.addEventListener('click', function () {
    adicionarCampo(educacaoContainer, templateEducacao, 'remover-educacao');
  });

  // Habilidades Técnicas
  const adicionarHabilidadesButton = document.getElementById('adicionar-habilidades');
  const habilidadesContainer = document.getElementById('habilidades-container');
  const templateHabilidades = document.querySelector('.habilidades-item');

  adicionarHabilidadesButton.addEventListener('click', function () {
    adicionarCampo(habilidadesContainer, templateHabilidades, 'remover-habilidades');
  });

  // Idiomas
  const adicionarIdiomasButton = document.getElementById('adicionar-idiomas');
  const idiomasContainer = document.getElementById('idiomas-container');
  const templateIdiomas = document.querySelector('.idiomas-item');

  adicionarIdiomasButton.addEventListener('click', function () {
    adicionarCampo(idiomasContainer, templateIdiomas, 'remover-idiomas');
  });

  // Certificações e Treinamento
  const adicionarCertificacoesButton = document.getElementById('adicionar-certificacoes');
  const certificacoesContainer = document.getElementById('certificacoes-container');
  const templateCertificacoes = document.querySelector('.certificacoes-item');

  adicionarCertificacoesButton.addEventListener('click', function () {
    adicionarCampo(certificacoesContainer, templateCertificacoes, 'remover-certificacoes');
  });

  // Obtenha uma referência ao elemento select de deficiência
  const selectDeficiencia = document.getElementById("deficiencia");

  // Obtenha uma referência ao elemento div que contém os tipos de deficiência
  const divTiposDeficiencia = document.getElementById("tipos-deficiencia");

  // Adicione um ouvinte de eventos para detectar mudanças na seleção
  selectDeficiencia.addEventListener("change", function () {
    // Verifique se a opção "Sim" foi selecionada
    if (selectDeficiencia.value === "sim") {
      // Se "Sim" foi selecionado, mostre o div com os tipos de deficiência
      divTiposDeficiencia.style.display = "block";
    } else {
      // Caso contrário, esconda o div com os tipos de deficiência
      divTiposDeficiencia.style.display = "none";
    }
  });

  const userId = localStorage.getItem('uid');
  

  if (!userId) {
    // Se o UID não estiver disponível, redirecione o usuário ou trate o erro conforme necessário
    console.error("UID não encontrado. O usuário não está autenticado ou logado.");
    return;
  }

  // Referência ao banco de dados do Firebase
  const database = firebase.database();
  const userRef = database.ref('candidatos/' + userId);

  // Recupere os dados do usuário no banco de dados
  userRef.once('value')
    .then(function (snapshot) {
      const userData = snapshot.val();

      if (userData) {
        // Preencha os campos do formulário com os dados do usuário
        document.getElementById("nome").value = userData.informacoesPessoais.nome;
        document.getElementById("endereco").value = userData.informacoesPessoais.endereco;
        document.getElementById("telefone").value = userData.informacoesPessoais.telefone;

        document.getElementById("empresa").value = userData.experienciaProfissional.empresa;
        document.getElementById("cargo").value = userData.experienciaProfissional.cargo ;
        document.getElementById("data-inicio").value = userData.experienciaProfissional.dataInicio;
        document.getElementById("data-fim").value = userData.experienciaProfissional.dataFim;

        document.getElementById("genero").value = userData.genero;

        document.getElementById("deficiencia").value = userData.deficiencia;
        // Verifique se a opção "Sim" foi selecionada
        if (userData.deficiencia === "sim") {
          // Se "Sim" foi selecionado, mostre o div com os tipos de deficiência
          document.getElementById("tipos-deficiencia").style.display = "block";
          document.getElementById("tipo-deficiencia").value = userData.tipoDeficiencia;
        } else {
          // Caso contrário, esconda o div com os tipos de deficiência
          document.getElementById("tipos-deficiencia").style.display = "none";
        }

        // Preencha os campos de educação
        const educacaoContainer = document.getElementById("educacao-container");
        educacaoContainer.innerHTML = ""; // Limpa os campos existentes
        userData.educacao.forEach(function (educacao) {
          const templateEducacao = document.querySelector('.educacao-item');
          const novoCampo = templateEducacao.cloneNode(true);
          educacaoContainer.appendChild(novoCampo);

          novoCampo.querySelector(".instituicao").value = educacao.instituicao;
          novoCampo.querySelector(".grau").value = educacao.grau;
          novoCampo.querySelector(".data-formatura").value = educacao.dataFormatura;
        });

        // Preencha os campos de habilidades técnicas
        const habilidadesContainer = document.getElementById("habilidades-container");
        habilidadesContainer.innerHTML = ""; // Limpa os campos existentes
        userData.habilidadesTecnicas.forEach(function (habilidade) {
          const templateHabilidades = document.querySelector('.habilidades-item');
          const novoCampo = templateHabilidades.cloneNode(true);
          habilidadesContainer.appendChild(novoCampo);

          novoCampo.querySelector(".habilidades").value = habilidade;
        });

        // Preencha os campos de idiomas
        const idiomasContainer = document.getElementById("idiomas-container");
        idiomasContainer.innerHTML = ""; // Limpa os campos existentes
        userData.idiomas.forEach(function (idioma) {
          const templateIdiomas = document.querySelector('.idiomas-item');
          const novoCampo = templateIdiomas.cloneNode(true);
          idiomasContainer.appendChild(novoCampo);

          novoCampo.querySelector(".idiomas").value = idioma;
        });

        // Preencha os campos de certificações e treinamento
        const certificacoesContainer = document.getElementById("certificacoes-container");
        certificacoesContainer.innerHTML = ""; // Limpa os campos existentes
        userData.certificacoesETreinamento.forEach(function (certificacao) {
          const templateCertificacoes = document.querySelector('.certificacoes-item');
          const novoCampo = templateCertificacoes.cloneNode(true);
          certificacoesContainer.appendChild(novoCampo);

          novoCampo.querySelector(".certificacoes").value = certificacao.certificacao;
          novoCampo.querySelector(".treinamento").value = certificacao.treinamento;
        });
      } else {
        console.error("Dados do usuário não encontrados no banco de dados.");
      }
    })
    .catch(function (error) {
      console.error("Erro ao recuperar os dados do usuário:", error);
    });

  document.getElementById("editar-dados").addEventListener("click", function () {
    // Coleta os dados editados do formulário
    const novoNome = document.getElementById("nome").value;
    const novoEndereco = document.getElementById("endereco").value;
    const novoTelefone = document.getElementById("telefone").value;

    const novaEmpresa = document.getElementById("empresa").value;
    const novoCargo = document.getElementById("cargo").value;
    const novaDataInicio = document.getElementById("data-inicio").value;
    const novaDataFim = document.getElementById("data-fim").value;

    const novoGenero = document.getElementById("genero").value;

    const novaDeficiencia = document.getElementById("deficiencia").value;

    let novoTipoDeficiencia = "";
    if (novaDeficiencia === "sim") {
      novoTipoDeficiencia = document.getElementById("tipo-deficiencia").value;
    }

    const novasInstituicoes = document.querySelectorAll(".instituicao");
    const novosGraus = document.querySelectorAll(".grau");
    const novasDatasFormatura = document.querySelectorAll(".data-formatura");

    const novaEducacao = [];
    for (let i = 0; i < novasInstituicoes.length; i++) {
      novaEducacao.push({
        instituicao: novasInstituicoes[i].value,
        grau: novosGraus[i].value,
        dataFormatura: novasDatasFormatura[i].value
      });
    }

    const novasHabilidades = document.querySelectorAll(".habilidades");
    const novasHabilidadesArray = [];
    novasHabilidades.forEach((habilidade) => {
      novasHabilidadesArray.push(habilidade.value);
    });

    const novosIdiomas = document.querySelectorAll(".idiomas");
    const novosIdiomasArray = [];
    novosIdiomas.forEach((idioma) => {
      novosIdiomasArray.push(idioma.value);
    });

    const novasCertificacoes = document.querySelectorAll(".certificacoes");
    const novosTreinamentos = document.querySelectorAll(".treinamento");
    const novasCertificacoesArray = [];
    for (let i = 0; i < novasCertificacoes.length; i++) {
      novasCertificacoesArray.push({
        certificacao: novasCertificacoes[i].value,
        treinamento: novosTreinamentos[i].value
      });
    };

    const userRef = firebase.database().ref('candidatos/' + userId);

    // Dados do formulário atualizados
    const formData = {
      informacoesPessoais: {
        nome: novoNome,
        endereco: novoEndereco,
        telefone: novoTelefone
      },
      experienciaProfissional: {
        empresa: novaEmpresa,
        cargo: novoCargo,
        dataInicio: novaDataInicio,
        dataFim: novaDataFim
      },
      genero: novoGenero,
      deficiencia: novaDeficiencia,
      tipoDeficiencia: novoTipoDeficiencia,
      educacao: novaEducacao,
      habilidadesTecnicas: novasHabilidadesArray,
      idiomas: novosIdiomasArray,
      certificacoesETreinamento: novasCertificacoesArray
    };

    // Atualize os dados do usuário no Firebase
    userRef.update(formData)
      .then(() => {
        alert("Dados do usuário atualizados com sucesso!");
        window.location.href = "../pages/menu.html?=" + uid;
        // Redirecione o usuário para a próxima página ou faça outra ação após a edição
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados do usuário:", error);
      });
  });
});
