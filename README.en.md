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

## 📖 Documentation

- **User Guide**: See [docs/USER_GUIDE.md](docs/USER_GUIDE.md)
- **API Reference**: See [docs/API.md](docs/API.md)
- **Test Documentation**: See [TESTS.md](TESTS.md)
