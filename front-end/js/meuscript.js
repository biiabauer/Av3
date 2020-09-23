$(function () {
    // quando o documento estiver pronto/carregado
  
    // função para exibir pessoas na tabela
    function exibir_livros() {
      $.ajax({
        url: "http://localhost:5000/listar_livros",
        method: "GET",
        dataType: "json", // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function () {
          alert("erro ao ler dados, verifique o backend");
        },
      });
      function listar(livros) {
        // esvaziar o corpo da tabela
        var linhas = "";
        // $('#corpoTabelaLivros').empty();
        // tornar a tabela visível
        mostrar_conteudo("tabelaLivros");
        // percorrer a lista de livros retornadas;
        for (var livro of livros) {
          //i vale a posição no vetor
          lin = `<tr>
                          <td>${livro.nome}</td>
                          <td>${livro.autor}</td>
                          <td>${livro.ano}</td>
                      </tr>`;
          linhas += lin;
        }
        $("#corpoTabelaLivros").html(linhas);
      }
    }
  
    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
      // esconde todos os conteúdos
      $("#tabelaLivros").addClass("invisible");
      $("#conteudoInicial").addClass("invisible");
      // torna o conteúdo escolhido visível
      $(`#${identificador}`).removeClass("invisible");
    }
  
    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarLivros", function () {
      exibir_livros();
    });
  
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function () {
      mostrar_conteudo("conteudoInicial");
    });
  
    // código para mapear click do botão incluir livro
    $(document).on("click", "#btIncluirLivro", function () {
      //pegar dados da tela
      nome = $("#campoNome").val();
      autor = $("#campoAutor").val();
      ano = $("#campoAno").val();
      // preparar dados no formato json
      var dados = JSON.stringify({
        nome: nome,
        autor: autor,
        ano: ano,
      });
      // fazer requisição para o back-end
      $.ajax({
        url: "http://localhost:5000/incluir_livro",
        type: "POST",
        dataType: "json", // os dados são recebidos no formato json
        contentType: "application/json", // tipo dos dados enviados
        data: dados, // estes são os dados enviados
        success: livroIncluida, // chama a função listar para processar o resultado
        error: erroAoIncluir,
      });
      function livroIncluida(retorno) {
        if (retorno.resultado == "ok") {
          // a operação deu certo?
          // informar resultado de sucesso
          alert("Livro incluído com sucesso!");
          // limpar os campos
          $("#campoNome").val();
          $("#campoAutor").val();
          $("#campoAno").val();
        } else {
          // informar mensagem de erro
          alert(`${retorno.resultado}: ${retorno.detalhes}`);
        }
      }
      function erroAoIncluir(retorno) {
        // informar mensagem de erro
        alert(`ERRO:  ${retorno.resultado}  : ${retorno.detalhes}`);
      }
    });
  
    // código a ser executado quando a janela de inclusão de livros for fechada
    $("#modalIncluirLivro").on("hide.bs.modal", function (e) {
      // se a página de listagem não estiver invisível
      if (!$("#tabelaLivros").hasClass("invisible")) {
        // atualizar a página de listagem
        exibir_livros();
      }
    });
  
    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");
  });
