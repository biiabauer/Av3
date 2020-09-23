from config import *

class Livro(db.Model):
    # atributos do livro
    nome = db.Column(db.String(254), primary_key=True)
    autor = db.Column(db.String(254))
    ano = db.Column(db.String(254))

    # método para expressar o livro em forma de texto
    def __str__(self):
        return f'''
                - Cadeira({self.id}) 
                - nome: {self.nome} 
                - cor: {self.cor} 
                - fabricante: {self.fabricante}
                - descrição: {self.descricao}
                - material: {self.material}
                '''
    # expressao da classe no formato json
    def json(self):
        return {
            "nome": self.nome,
            "autor": self.autor,
            "ano": self.ano,
        }

# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

    # teste da classe Pessoa
    l1 = Livro (nome = "A noiva fantasma", autor = "Yangsze Choo", ano = "2015")
    l2 = Livro (nome = "Névoa", autor = "Kathyn James", ano = "2014")
    l3 = Livro (nome = "Gelo", autor = "Kathyn James", ano = "2014")
    l4 = Livro (nome = "Brida", autor = "Paulo Coelho", ano = "1990" )
    l5 = Livro (nome = "Anjos e Demônios", autor = "Dan Brown", ano = "2003")
    
    db.session.add(l1)
    db.session.add(l2)
    db.session.add(l3)
    db.session.add(l4)
    db.session.add(l5)
    db.session.commit()
    
    print(l1.json())
    print(l2.json())
    print(l3.json())
    print(l4.json())
    print(l5.json())