import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

export class GoogleGeminiService extends GoogleGenAI{
  private type: string = '';
  private message: string = '';
  private base64: string = '';
  private googleContentResponse: GenerateContentResponse = new GenerateContentResponse();

  constructor(readonly model: string) {
    super({
      apiKey: process.env.API_KEY
    });
    this.model = process.env.MODEL || model;
  }
  public setBase64(base64: string): void {
    this.base64 = base64;
  }
  private getMessageByImage(){
    return [
      {
        inlineData: {
          mimeType: `${this.type}`,
          data: this.base64,
        },
      },
      { text: this.message },
    ]
  }
  public setChat(message: string): void {
    this.message = message;
  }
  public setType(type: string): void{
    this.type = type;
  }
  public async getResponseImage(): Promise<void> {
      this.googleContentResponse = await this.models.generateContent({
        model: this.model,
        contents: this.getMessageByImage(),
      });
  }
  public toJSON(): any {
    return JSON.parse(this.googleContentResponse.text || '{}');
  }
}


