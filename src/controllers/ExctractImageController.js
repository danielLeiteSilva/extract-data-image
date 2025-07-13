"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractImageController = void 0;
const GoogleGeminiService_1 = require("../services/GoogleGeminiService");
const ProdutosDTO_1 = require("../model/ProdutosDTO");
const Produto_1 = require("../model/Produto");
class ExtractImageController {
    constructor() {
        this.genAi = new GoogleGeminiService_1.GoogleGeminiService("gemini-2.5-flash");
    }
    extractImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageBase64 = req['body']['image'];
                this.genAi.setBase64(imageBase64);
                this.genAi.setChat(`
        Analise essa imagem. Extraia somente informações do produto e me devolva um JSON sem formatação, sem markdown ou htmls e parseado, 
        sem qualquer tipo de texto fora, para que não dê erro de parse no código, com a descrição do preço e produto. 
        Devolva apenas um JSON puro com as informações. Devolva dentro de um array, para caso haja mais de um produto. 
        E retire qualquer acento nas palavras no campo do json. O json deve sempre ter os campos produto e preco sendo os
        demais opcionais
      `);
                this.genAi.setType("image/jpeg");
                yield this.genAi.getResponseImage();
                let produtos = new Array();
                if (Array.isArray(this.genAi.toJSON())) {
                    produtos = this.genAi.toJSON().map((prod) => {
                        return new Produto_1.Produto(prod.produto, prod.preco);
                    });
                }
                const produtosDTO = new ProdutosDTO_1.ProdutosDTO(produtos);
                res.status(200).json(produtosDTO);
            }
            catch (error) {
                res.status(400).json({
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        });
    }
}
exports.ExtractImageController = ExtractImageController;
