from config import *
from modelo import Livro

@app.route("/")
def inicio():
    return 'Sistema de cadastro de livros. '+\
        '<a href="/listar_livros">Operação listar</a>'

@app.route("/listar_livros")
def listar_livros():
    # obter os livros do cadastro
    livros = db.session.query(Livro).all()
    # aplicar o método json que a classe Livro possui a cada elemento da lista
    livros_em_json = [ x.json() for x in livros ]
    # converter a lista do python para json
    resposta = jsonify(livros_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/incluir_livro", methods=['post'])
def incluir_livro():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da novo livro
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Livro(**dados) # criar a novo livro
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

app.run(debug=True)