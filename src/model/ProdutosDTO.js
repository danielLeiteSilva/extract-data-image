"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosDTO = void 0;
class ProdutosDTO {
    constructor(produtos) {
        this.produtos = produtos;
    }
    toJSON() {
        return {
            produtos: this.produtos
        };
    }
}
exports.ProdutosDTO = ProdutosDTO;
