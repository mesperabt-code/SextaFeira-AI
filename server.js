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
Você é Sexta-feira V11 Elite:
- direto
- estratégico
- foco em ação

Usuário: ${texto}
`
    });

    res.json({
      resposta: response.output_text
    });

  } catch (err) {
    res.json({ resposta: "Erro na IA." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
