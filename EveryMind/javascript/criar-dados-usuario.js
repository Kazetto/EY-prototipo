src = "https://www.gstatic.com/firebasejs/8.6.1/firebase-auth.js"

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




  document.getElementById("salvar-dados").addEventListener("click", function () {
    // Recupere o UID do localStorage
    const uid = localStorage.getItem('uid');

    if (!uid) {
      // Se o UID não estiver disponível, redirecione o usuário para a página de login ou trate o erro
      console.error("UID não encontrado. O usuário não está autenticado.");
      return;
    }
    // Coleta os dados do formulário
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;

    const empresa = document.getElementById("empresa").value;
    const cargo = document.getElementById("cargo").value;
    const dataInicio = document.getElementById("data-inicio").value;
    const dataFim = document.getElementById("data-fim").value;

    const genero = document.getElementById("genero").value;

    const deficiencia = document.getElementById("deficiencia").value;

    let tipoDeficiencia = "";
    if (deficiencia === "sim") {
      tipoDeficiencia = document.getElementById("tipo-deficiencia").value;
    }

    const instituicoes = document.querySelectorAll(".instituicao");
    const graus = document.querySelectorAll(".grau");
    const datasFormatura = document.querySelectorAll(".data-formatura");

    const educacao = [];
    for (let i = 0; i < instituicoes.length; i++) {
      educacao.push({
        instituicao: instituicoes[i].value,
        grau: graus[i].value,
        dataFormatura: datasFormatura[i].value
      });
    }

    const habilidades = document.querySelectorAll(".habilidades");
    const habilidadesArray = [];
    habilidades.forEach((habilidade) => {
      habilidadesArray.push(habilidade.value);
    });

    const idiomas = document.querySelectorAll(".idiomas");
    const idiomasArray = [];
    idiomas.forEach((idioma) => {
      idiomasArray.push(idioma.value);
    });

    const certificacoes = document.querySelectorAll(".certificacoes");
    const treinamentos = document.querySelectorAll(".treinamento");
    const certificacoesArray = [];
    for (let i = 0; i < certificacoes.length; i++) {
      certificacoesArray.push({
        certificacao: certificacoes[i].value,
        treinamento: treinamentos[i].value
      });
    };

    // Referência ao nó onde os formulários serão armazenados
    const userFormsRef = firebase.database().ref('candidatos/' + uid);

    // Dados do formulário
    const formData = {
      informacoesPessoais: {
        nome: nome,
        endereco: endereco,
        telefone: telefone
      },
      experienciaProfissional: {
        empresa: empresa,
        cargo: cargo,
        dataInicio: dataInicio,
        dataFim: dataFim
      },
      genero: genero,
      deficiencia: deficiencia,
      tipoDeficiencia: tipoDeficiencia,
      educacao: educacao,
      habilidadesTecnicas: habilidadesArray,
      idiomas: idiomasArray,
      certificacoesETreinamento: certificacoesArray
    };

    // Envie os dados do formulário para o Firebase
    userFormsRef.set(formData)
    .then(() => {
      alert(uid)
      console.log("Formulário salvo com sucesso!");
      // Redirecione o usuário para a próxima página
      window.location.href = "../pages/menu.html?uid="+ uid;
    })
    .catch((error) => {
      console.error("Erro ao salvar o formulário:", error);
    });
  });
});