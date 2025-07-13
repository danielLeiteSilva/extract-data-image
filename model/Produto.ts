export class Produto{
  public produto: string;
  public preco: number;
  constructor(produto: string, preco: number){
    this.produto = produto;
    this.preco = preco;
  }
  toJSON() {
    return {
      produto: this.produto,
      preco: this.preco
    }
  }
}