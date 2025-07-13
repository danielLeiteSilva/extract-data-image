import { Produto } from "./Produto";

export class ProdutosDTO{
  public produtos: Array<Produto>
  constructor(produtos: Array<Produto>) {
    this.produtos = produtos;
  }

  toJSON() {
    return {
      produtos: this.produtos
    }
  }
}