# NutriFit

> **Plataforma independente de nutrição com calculadora de calorias, tabela nutricional e assistente IA**

Aplicação web moderna para ajudar usuários a gerenciar sua nutrição com precisão. Calcule suas necessidades calóricas diárias, explore dados nutricionais de alimentos e receba recomendações de refeições personalizadas com IA.

[🇺🇸 English Version](./README.en.md)

## ✨ Funcionalidades

- **Calculadora de Calorias** — TMB, GET e meta calórica diária
- **Tabela Nutricional** — Consulte alimentos e monte refeições com rastreamento nutricional em tempo real
- **NutriFit IA** — Assistente nutricional inteligente com LLM Groq Cloud

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ e npm 8+
- Chave da API Groq (obtenha uma gratuitamente em [console.groq.com](https://console.groq.com/keys))

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nutrifit.git
cd nutrifit
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Adicione sua chave Groq no arquivo `.env`:
```env
VITE_GROQ_API_KEY=sua_chave_aqui
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em **http://localhost:5174**

## 🧪 Testes

NutriFit possui testes unitários abrangentes alcançando **91.75% de cobertura de código** com 128 testes passando.

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm test -- --watch

# Gerar relatório de cobertura
npm run test:coverage

# Interface interativa
npm run test:ui
```

Para documentação detalhada de testes, veja [TESTS.md](./TESTS.md)

### Relatório de Cobertura

```
Statements: 91.75% ✅
Branches:   70.37% ✅
Functions:  90.00% ✅
Lines:      93.33% ✅
```

## 🏗️ Build & Deploy

### Build de Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
```

### Visualizar Build de Produção
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
nutrifit/
├── src/
│   ├── components/
│   │   └── NutriFitChat.jsx        # Componente de chat IA
│   ├── pages/
│   │   └── NutriFit.jsx            # Página principal
│   ├── lib/
│   │   ├── nutrifitNutrition.js    # Lógica de cálculos
│   │   └── nutrifitAi.js           # Integração IA
│   ├── data/
│   │   └── nutrifitFoods.js        # Banco de dados de alimentos
│   ├── utils/
│   │   └── helpers.js              # Funções auxiliares
│   ├── App.jsx                     # Componente raiz
│   ├── AppContext.js               # Provedor de contexto
│   ├── translations.js             # Traduções i18n
│   └── main.jsx                    # Ponto de entrada
├── vitest.config.js                # Configuração de testes
├── vite.config.js                  # Configuração Vite
└── package.json                    # Dependências
```

## 🛠️ Stack Tecnológico

- **Framework Frontend**: React 19
- **Ferramenta de Build**: Vite 8
- **Testes**: Vitest + React Testing Library
- **IA/LLM**: API Groq Cloud
- **Linguagem**: JavaScript (ES Modules)

## 📚 Módulos Principais

### Cálculos Nutricionais (`src/lib/nutrifitNutrition.js`)
- `calculateBMR()` - Taxa Metabólica Basal
- `calculateTDEE()` - Gasto Energético Total Diário
- `scaleNutrients()` - Escale valores de macronutrientes por peso
- `sumMealNutrients()` - Agregue valores nutricionais de refeições
- `buildCustomFood()` - Crie alimentos customizados

### Integração IA (`src/lib/nutrifitAi.js`)
- `getNutriFitAiResponse()` - Consulte IA Groq para dicas nutricionais
- `formatAssistantMessage()` - Parse e formate respostas IA com markdown

### Internacionalização (`src/translations.js`)
- Suporte completo para Português (PT) e Inglês (EN)
- Mudança de idioma dinâmica
- Terminologia consistente em toda UI

## 🌐 Suporte a Idiomas

NutriFit suporta Português e Inglês. Usuários podem trocar idiomas em tempo real pelo menu de configurações. O app também suporta temas claro e escuro.

### Idiomas Suportados
- 🇧🇷 Português
- 🇺🇸 English

## 📊 Funcionalidades em Detalhes

### Calculadora de Calorias
- Insira métricas pessoais (idade, peso, altura, sexo)
- Selecione nível de atividade (sedentário a muito ativo)
- Escolha objetivo (perder peso, manter, ganhar massa)
- Obtenha cálculos instantâneos para TMB, GET e meta diária
- Peça à IA recomendações de refeições personalizadas

### Tabela Nutricional
- Navegue banco de dados com 50+ alimentos comuns
- Filtre por categoria de alimento
- Crie entradas de alimentos customizados com valores de macronutrientes
- Adicione alimentos à refeição com porções específicas
- Veja totais da refeição em tempo real
- Calorias auto-calculadas a partir de macronutrientes

### Assistente IA
- Faça perguntas sobre nutrição e alimentos
- Obtenha planos de refeições customizados
- Receba dicas de dieta e trocas alimentares
- Suporte multilíngue (PT/EN)
- Conteúdo educacional (não é aconselhamento médico)

## 🔐 Privacidade & Segurança

- ✅ Nenhum dado de usuário é armazenado em servidores
- ✅ Cálculos são executados localmente no seu navegador
- ✅ Chave de API é usada apenas para requisições de IA
- ✅ Sem cookies ou rastreamento

## 🤝 Contribuindo

Bem-vindo a contribuições! Como fazer:

1. Faça um fork do repositório
2. Crie uma branch de feature (`git checkout -b feature/MinhaFeature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Faça push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🐛 Relatório de Bugs & Solicitação de Features

Encontrou um bug? Tem uma ideia? Abra uma issue no GitHub:
- [Reportar Bug](https://github.com/seu-usuario/nutrifit/issues/new?template=bug_report.md)
- [Solicitar Feature](https://github.com/seu-usuario/nutrifit/issues/new?template=feature_request.md)

## 📖 Documentação

- **Guia do Usuário**: Veja [docs/GUIA_USUARIO.md](docs/GUIA_USUARIO.md)
- **Referência de API**: Veja [docs/API.md](docs/API.md)
- **Documentação de Testes**: Veja [TESTS.md](TESTS.md)

## 🚀 Roadmap

### Funcionalidades Futuras
- [ ] App mobile (React Native)
- [ ] Calendário de planejamento de refeições
- [ ] Leitura de código de barras para alimentos
- [ ] Compartilhamento social de planos de refeição
- [ ] Integração com rastreadores de fitness
- [ ] Progressive Web App (PWA)

### Versão Atual
- v1.0.0 - Lançamento inicial com funcionalidades principais

## 💡 Dicas & Truques

### Dicas da Calculadora de Calorias
- Para melhores resultados, meça seu peso semanalmente no mesmo horário
- Níveis de atividade são aproximações; ajuste com base em resultados reais
- Lembre-se: GET = TMB × Fator de Atividade

### Dicas da Tabela Nutricional
- Crie alimentos customizados para acesso rápido aos seus favoritos
- Use composições de refeições para planejar cardápios semanais
- Rastreie porções cuidadosamente para contas de calorias precisas

### Dicas do Assistente IA
- Faça perguntas específicas para melhores recomendações
- Compartilhe seus objetivos para dicas personalizadas
- Lembre-se: sugestões de IA são educacionais, não médicas

## ❓ FAQ

**P: NutriFit é grátis?**
R: Sim! NutriFit é completamente grátis. Você só precisa de uma chave gratuita de API Groq para funcionalidades de IA.

**P: Posso usar NutriFit offline?**
R: Cálculos funcionam offline. Funcionalidades de IA requerem conexão de internet e chave de API ativa.

**P: Meus dados são privados?**
R: Sim. Todos os cálculos ocorrem no seu navegador. Nenhum dado pessoal é enviado aos nossos servidores (apenas para Groq para requisições de IA).

**P: Posso exportar meus planos de refeição?**
R: Atualmente não, mas está no nosso roadmap. Você pode tirar screenshots por enquanto.

**P: Qual a diferença entre TMB e GET?**
R: TMB (Taxa Metabólica Basal) é calorias queimadas em repouso. GET (Gasto Energético Total) inclui atividade.

## 🙏 Agradecimentos

- [Groq Cloud](https://groq.com) - API LLM que alimenta o assistente IA
- [React](https://react.dev) - Biblioteca JavaScript para construir UIs
- [Vite](https://vitejs.dev) - Ferramentas frontend de próxima geração
- [Vitest](https://vitest.dev) - Framework de testes unitários

## 📞 Suporte

Precisa de ajuda?
- 📧 Email: suporte@nutrifit.local
- 💬 Discord: [Junte-se à nossa comunidade](https://discord.gg/nutrifit)
- 🐦 Twitter: [@NutriFitApp](https://twitter.com/nutrifitapp)

---

**Feito com ❤️ para entusiastas de nutrição**

Última atualização: Junho de 2026
