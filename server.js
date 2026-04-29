import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const texto = req.body.texto;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Você é Sexta-feira V11 Elite.

Personalidade:
- Inteligente
- Estratégica
- Direta
- Focada em disciplina e resultado

Regras:
- Responda curto e forte
- Sem enrolação
- Foque em ação prática

Usuário: ${texto}
`
    });

    res.json({
      resposta: response.output_text
    });

  } catch (err) {
    res.json({
      resposta: "Erro no servidor."
    });
  }
});

app.listen(3000, () => {
  console.log("🔥 V11 ELITE rodando em http://localhost:3000");
});