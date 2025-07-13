import { Request, Response } from 'express';
import { GoogleGeminiService } from '../services/GoogleGeminiService';
import { ProdutosDTO } from '../model/ProdutosDTO';
import { Produto } from '../model/Produto';

export class ExtractImageController{
  private genAi: GoogleGeminiService;

  constructor() {
    this.genAi = new GoogleGeminiService("gemini-2.5-flash");
  }

  async extractImage(req: Request<any>, res: Response<any>){
    try {
      const imageBase64: string = req['body']['imageBase64'];
      const imageType: string = req['body']['imageType'];
      this.genAi.setBase64(imageBase64);
      this.genAi.setChat(`
        Analise essa imagem. Extraia somente informações do produto e me devolva um JSON sem formatação, sem markdown ou htmls e parseado, 
        sem qualquer tipo de texto fora, para que não dê erro de parse no código, com a descrição do preço e produto. 
        Devolva apenas um JSON puro com as informações. Devolva dentro de um array, para caso haja mais de um produto. 
        E retire qualquer acento nas palavras no campo do json. O json deve sempre ter os campos produto e preco sendo os
        demais opcionais
      `);
      this.genAi.setType(imageType);
      await this.genAi.getResponseImage();
      let produtos: Array<Produto> = new Array<Produto>();
      if(Array.isArray(this.genAi.toJSON())){
        produtos = this.genAi.toJSON().map((prod: Produto) => {
          return new Produto(prod.produto, prod.preco);
        });
      }
      const produtosDTO: ProdutosDTO = new ProdutosDTO(produtos);
      res.status(200).json(produtosDTO);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}