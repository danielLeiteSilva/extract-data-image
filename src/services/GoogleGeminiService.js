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
exports.GoogleGeminiService = void 0;
const genai_1 = require("@google/genai");
class GoogleGeminiService extends genai_1.GoogleGenAI {
    constructor(model) {
        super({
            apiKey: process.env.API_KEY || "AIzaSyBDoa4PWkMnyFIlheZr6rgFszkfTgznaCY"
        });
        this.model = model;
        this.type = '';
        this.message = '';
        this.base64 = '';
        this.googleContentResponse = new genai_1.GenerateContentResponse();
        this.model = process.env.MODEL || model;
    }
    setBase64(base64) {
        this.base64 = base64;
    }
    getMessageByImage() {
        return [
            {
                inlineData: {
                    mimeType: `${this.type}`,
                    data: this.base64,
                },
            },
            { text: this.message },
        ];
    }
    setChat(message) {
        this.message = message;
    }
    setType(type) {
        this.type = type;
    }
    getResponseImage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.googleContentResponse = yield this.models.generateContent({
                model: this.model,
                contents: this.getMessageByImage(),
            });
        });
    }
    toJSON() {
        return JSON.parse(this.googleContentResponse.text || '{}');
    }
}
exports.GoogleGeminiService = GoogleGeminiService;
