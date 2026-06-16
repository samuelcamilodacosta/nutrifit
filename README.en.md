# NutriFit

> **Independent nutrition platform with calorie calculator, nutritional table, and AI assistant**

A modern web application designed to help users manage their nutrition with precision. Calculate your daily caloric needs, explore food nutritional data, and get personalized meal recommendations powered by AI.

## ✨ Features

- **Calorie Calculator** — BMR, TDEE, and daily caloric targets
- **Nutrition Table** — Browse foods and compose meals with real-time nutritional tracking
- **NutriFit AI** — Intelligent nutrition assistant powered by Groq Cloud LLM

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Groq API key (get one free at [console.groq.com](https://console.groq.com/keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nutrifit.git
cd nutrifit
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Groq API key to `.env`:
```env
VITE_GROQ_API_KEY=your_key_here
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at **http://localhost:5174**

## 🧪 Testing

NutriFit comes with comprehensive unit tests achieving **91.75% code coverage** with 128 passing tests.

### Run Tests

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm test -- --watch

# Generate coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

For detailed test documentation, see [TESTS.md](./TESTS.md)

### Coverage Report

```
Statements: 91.75% ✅
Branches:   70.37% ✅
Functions:  90.00% ✅
Lines:      93.33% ✅
```

## 🏗️ Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
nutrifit/
├── src/
│   ├── components/
│   │   └── NutriFitChat.jsx        # AI chat component
│   ├── pages/
│   │   └── NutriFit.jsx            # Main application page
│   ├── lib/
│   │   ├── nutrifitNutrition.js    # Calculation logic
│   │   └── nutrifitAi.js           # AI integration
│   ├── data/
│   │   └── nutrifitFoods.js        # Food database
│   ├── utils/
│   │   └── helpers.js              # Helper functions
│   ├── App.jsx                     # Root component
│   ├── AppContext.js               # Context provider
│   ├── translations.js             # i18n translations
│   └── main.jsx                    # Entry point
├── vitest.config.js                # Test configuration
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Testing**: Vitest + React Testing Library
- **AI/LLM**: Groq Cloud API
- **Language**: JavaScript (ES Modules)

## 📚 Key Modules

### Nutritional Calculations (`src/lib/nutrifitNutrition.js`)
- `calculateBMR()` - Basal Metabolic Rate (Harris-Benedict equation)
- `calculateTDEE()` - Total Daily Energy Expenditure
- `scaleNutrients()` - Scale macronutrient values by portion weight
- `sumMealNutrients()` - Aggregate nutritional values for meals
- `buildCustomFood()` - Create custom food entries

### AI Integration (`src/lib/nutrifitAi.js`)
- `getNutriFitAiResponse()` - Query Groq AI for nutritional advice
- `formatAssistantMessage()` - Parse and format AI responses with markdown

### Internationalization (`src/translations.js`)
- Full support for Portuguese (PT) and English (EN)
- Dynamic language switching
- Consistent terminology across UI

## 🌐 Language Support

NutriFit supports both Portuguese and English. Users can switch languages on-the-fly from the settings menu. The app also supports dark and light themes.

### Supported Languages
- 🇧🇷 Portuguese (Português)
- 🇺🇸 English

## 📊 Features in Detail

### Calorie Calculator
- Input personal metrics (age, weight, height, sex)
- Select activity level (sedentary to very active)
- Choose goal (lose weight, maintain, gain muscle)
- Get instant calculations for BMR, TDEE, and daily target
- Ask AI for personalized meal recommendations

### Nutrition Table
- Browse database of 50+ common foods
- Filter by food category
- Create custom food entries with macronutrient values
- Add foods to meal with specific portion sizes
- View real-time totals for meals
- Auto-calculated calories from macronutrients

### AI Assistant
- Ask questions about nutrition and food
- Get meal plans tailored to your profile
- Receive diet tips and food swaps
- Multi-language support (PT/EN)
- Educational content (not medical advice)

## 🔐 Privacy & Security

- ✅ No user data is stored on servers
- ✅ Calculations are performed locally in your browser
- ✅ API key is only used for AI requests
- ✅ No cookies or tracking

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Found a bug? Have an idea? Please open an issue on GitHub:
- [Report a Bug](https://github.com/yourusername/nutrifit/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/yourusername/nutrifit/issues/new?template=feature_request.md)

## 📖 Documentation

- **User Guide**: See [docs/USER_GUIDE.md](docs/USER_GUIDE.md)
- **API Reference**: See [docs/API.md](docs/API.md)
- **Test Documentation**: See [TESTS.md](TESTS.md)

## 🚀 Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] Meal planning calendar
- [ ] Barcode scanning for foods
- [ ] Social sharing of meal plans
- [ ] Integration with fitness trackers
- [ ] Progressive Web App (PWA)

### Current Version
- v1.0.0 - Initial release with core features

## 💡 Tips & Tricks

### Calorie Calculator Tips
- For best results, measure your weight weekly at the same time
- Activity levels are approximations; adjust based on actual results
- Remember: TDEE = BMR × Activity Factor

### Nutrition Table Tips
- Create custom foods for quick access to your favorites
- Use meal compositions to plan weekly menus
- Track portions carefully for accurate calorie counts

### AI Assistant Tips
- Ask specific questions for better recommendations
- Share your goals for personalized advice
- Remember: AI suggestions are educational, not medical

## ❓ FAQ

**Q: Is NutriFit free?**
A: Yes! NutriFit is completely free. You only need a free Groq API key for AI features.

**Q: Can I use NutriFit offline?**
A: Calculations work offline. AI features require an internet connection and active API key.

**Q: Is my data private?**
A: Yes. All calculations happen in your browser. No personal data is sent to our servers (only to Groq for AI requests).

**Q: Can I export my meal plans?**
A: Currently not, but it's on our roadmap. You can take screenshots for now.

**Q: What's the difference between BMR and TDEE?**
A: BMR (Basal Metabolic Rate) is calories burned at rest. TDEE (Total Daily Energy Expenditure) includes activity.

## 🙏 Acknowledgments

- [Groq Cloud](https://groq.com) - LLM API powering the AI assistant
- [React](https://react.dev) - JavaScript library for building UIs
- [Vite](https://vitejs.dev) - Next generation frontend tooling
- [Vitest](https://vitest.dev) - Unit testing framework

## 📞 Support

Need help? 
- 📧 Email: support@nutrifit.local
- 💬 Discord: [Join our community](https://discord.gg/nutrifit)
- 🐦 Twitter: [@NutriFitApp](https://twitter.com/nutrifitapp)

---

**Made with ❤️ for nutrition enthusiasts**

Last updated: June 2026
