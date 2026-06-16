# NutriFit

Plataforma de nutrição independente com calculadora de calorias, tabela nutricional e assistente IA.

## Funcionalidades

- **Calculadora de Calorias** — TMB, GET e meta diária
- **Tabela Nutricional** — consulta de alimentos e montagem de refeições
- **NutriFit IA** — assistente nutricional via Groq Cloud

## Como rodar

```bash
npm install
cp .env.example .env
# Adicione sua chave Groq em VITE_GROQ_API_KEY
npm run dev
```

O app roda em **http://localhost:5174** (porta diferente do pragma-software).

## Build

```bash
npm run build
npm run preview
```
