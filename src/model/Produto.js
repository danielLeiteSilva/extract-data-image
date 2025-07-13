"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
class Produto {
    constructor(produto, preco) {
        this.produto = produto;
        this.preco = preco;
    }
    toJSON() {
        return {
            produto: this.produto,
            preco: this.preco
        };
    }
}
exports.Produto = Produto;
