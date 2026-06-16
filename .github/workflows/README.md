# GitHub Actions CI

Workflow simples que usa o environment `nutrifit` do GitHub.

## Configuração

Secrets já configuradas no environment `nutrifit`:
- `VITE_GROQ_API_KEY` ✅
- `VITE_GROQ_MODEL` ✅

## O que faz

- Instala dependências
- Faz build usando secrets do environment
- Roda testes
- Gera coverage report

