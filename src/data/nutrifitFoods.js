/* Valores por 100 g — referência simplificada (TACO/USDA) para demonstração */
export const nutrifitFoods = [
  /* Carboidratos */
  { id: 'arroz',        name: 'Arroz branco cozido',       category: 'carboidrato', kcal: 128, protein: 2.5, carbs: 28.0, fat: 0.2, fiber: 1.6 },
  { id: 'arroz-integral', name: 'Arroz integral cozido',  category: 'carboidrato', kcal: 124, protein: 2.6, carbs: 25.8, fat: 1.0, fiber: 2.7 },
  { id: 'feijao',       name: 'Feijão carioca cozido',     category: 'carboidrato', kcal: 77,  protein: 4.8, carbs: 13.6, fat: 0.5, fiber: 8.5 },
  { id: 'batata',       name: 'Batata inglesa cozida',    category: 'carboidrato', kcal: 52,  protein: 1.2, carbs: 11.9, fat: 0.1, fiber: 1.3 },
  { id: 'batata-doce',  name: 'Batata-doce cozida',       category: 'carboidrato', kcal: 77,  protein: 0.6, carbs: 18.4, fat: 0.1, fiber: 2.2 },
  { id: 'mandioca',     name: 'Mandioca cozida',          category: 'carboidrato', kcal: 125, protein: 0.6, carbs: 30.1, fat: 0.3, fiber: 1.8 },
  { id: 'macarrao',     name: 'Macarrão cozido',          category: 'carboidrato', kcal: 131, protein: 5.0, carbs: 25.0, fat: 0.9, fiber: 1.8 },
  { id: 'aveia',        name: 'Aveia em flocos',          category: 'carboidrato', kcal: 394, protein: 13.9, carbs: 66.6, fat: 8.5, fiber: 9.1 },
  { id: 'pao',          name: 'Pão integral',             category: 'carboidrato', kcal: 247, protein: 9.4, carbs: 41.3, fat: 4.2, fiber: 6.9 },
  { id: 'pao-frances',  name: 'Pão francês',              category: 'carboidrato', kcal: 300, protein: 8.0, carbs: 58.6, fat: 3.9, fiber: 2.3 },
  { id: 'quinoa',       name: 'Quinoa cozida',            category: 'carboidrato', kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8 },
  { id: 'lentilha',     name: 'Lentilha cozida',          category: 'carboidrato', kcal: 93,  protein: 6.3, carbs: 16.3, fat: 0.4, fiber: 7.9 },
  { id: 'grao-bico',    name: 'Grão-de-bico cozido',      category: 'carboidrato', kcal: 130, protein: 8.9, carbs: 18.6, fat: 2.4, fiber: 7.6 },
  { id: 'milho',        name: 'Milho cozido',             category: 'carboidrato', kcal: 98,  protein: 3.3, carbs: 18.7, fat: 1.5, fiber: 2.0 },

  /* Proteínas */
  { id: 'frango',       name: 'Peito de frango grelhado', category: 'proteina',    kcal: 159, protein: 32.0, carbs: 0,   fat: 3.6, fiber: 0 },
  { id: 'carne',        name: 'Carne bovina (patinho)',   category: 'proteina',    kcal: 219, protein: 32.0, carbs: 0,   fat: 9.0, fiber: 0 },
  { id: 'salmao',       name: 'Salmão grelhado',          category: 'proteina',    kcal: 208, protein: 20.0, carbs: 0,   fat: 13.0, fiber: 0 },
  { id: 'tilapia',      name: 'Tilápia grelhada',         category: 'proteina',    kcal: 128, protein: 26.0, carbs: 0,   fat: 2.7, fiber: 0 },
  { id: 'atum',         name: 'Atum em água',             category: 'proteina',    kcal: 116, protein: 25.5, carbs: 0,   fat: 0.8, fiber: 0 },
  { id: 'camarao',      name: 'Camarão cozido',           category: 'proteina',    kcal: 99,  protein: 20.9, carbs: 0.5, fat: 1.7, fiber: 0 },
  { id: 'ovo',          name: 'Ovo cozido',               category: 'proteina',    kcal: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fiber: 0 },
  { id: 'peru',         name: 'Peito de peru fatiado',    category: 'proteina',    kcal: 135, protein: 29.0, carbs: 0.5, fat: 1.5, fiber: 0 },

  /* Laticínios */
  { id: 'iogurte',      name: 'Iogurte natural',          category: 'lacteo',      kcal: 61,  protein: 3.5, carbs: 4.7,  fat: 3.3, fiber: 0 },
  { id: 'leite',        name: 'Leite integral',           category: 'lacteo',      kcal: 61,  protein: 3.2, carbs: 4.8,  fat: 3.2, fiber: 0 },
  { id: 'queijo-minas', name: 'Queijo minas frescal',     category: 'lacteo',      kcal: 264, protein: 17.4, carbs: 3.2,  fat: 20.2, fiber: 0 },
  { id: 'requeijao',    name: 'Requeijão cremoso',        category: 'lacteo',      kcal: 257, protein: 9.6, carbs: 2.5,  fat: 23.0, fiber: 0 },

  /* Frutas */
  { id: 'banana',       name: 'Banana',                   category: 'fruta',       kcal: 89,  protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6 },
  { id: 'maca',         name: 'Maçã',                     category: 'fruta',       kcal: 52,  protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4 },
  { id: 'laranja',      name: 'Laranja',                  category: 'fruta',       kcal: 47,  protein: 0.9, carbs: 11.7, fat: 0.1, fiber: 2.0 },
  { id: 'morango',      name: 'Morango',                  category: 'fruta',       kcal: 32,  protein: 0.7, carbs: 7.7,  fat: 0.3, fiber: 2.0 },
  { id: 'abacaxi',      name: 'Abacaxi',                  category: 'fruta',       kcal: 50,  protein: 0.5, carbs: 12.3, fat: 0.1, fiber: 1.4 },
  { id: 'manga',        name: 'Manga',                    category: 'fruta',       kcal: 60,  protein: 0.8, carbs: 14.9, fat: 0.4, fiber: 1.6 },
  { id: 'uva',          name: 'Uva',                      category: 'fruta',       kcal: 69,  protein: 0.7, carbs: 17.2, fat: 0.2, fiber: 0.9 },
  { id: 'melancia',     name: 'Melancia',                 category: 'fruta',       kcal: 30,  protein: 0.6, carbs: 7.5,  fat: 0.2, fiber: 0.4 },
  { id: 'goiaba',       name: 'Goiaba',                   category: 'fruta',       kcal: 54,  protein: 0.9, carbs: 12.9, fat: 0.5, fiber: 5.4 },
  { id: 'mamao',        name: 'Mamão',                    category: 'fruta',       kcal: 43,  protein: 0.5, carbs: 10.8, fat: 0.1, fiber: 1.7 },
  { id: 'pera',         name: 'Pera',                     category: 'fruta',       kcal: 57,  protein: 0.4, carbs: 15.2, fat: 0.2, fiber: 3.1 },
  { id: 'kiwi',         name: 'Kiwi',                     category: 'fruta',       kcal: 61,  protein: 1.1, carbs: 14.7, fat: 0.5, fiber: 3.0 },
  { id: 'tangerina',    name: 'Tangerina',                category: 'fruta',       kcal: 53,  protein: 0.8, carbs: 13.3, fat: 0.3, fiber: 1.8 },
  { id: 'abacate',      name: 'Abacate',                  category: 'fruta',       kcal: 160, protein: 2.0, carbs: 8.5,  fat: 14.7, fiber: 6.7 },
  { id: 'mamao-formosa', name: 'Mamão-formosa',           category: 'fruta',       kcal: 45,  protein: 0.5, carbs: 11.0, fat: 0.1, fiber: 1.9 },

  /* Legumes e verduras */
  { id: 'brocolis',     name: 'Brócolis cozido',          category: 'legume',      kcal: 25,  protein: 2.1, carbs: 4.4,  fat: 0.4, fiber: 3.3 },
  { id: 'tomate',       name: 'Tomate',                   category: 'legume',      kcal: 18,  protein: 0.9, carbs: 3.9,  fat: 0.2, fiber: 1.2 },
  { id: 'cenoura',      name: 'Cenoura crua',             category: 'legume',      kcal: 34,  protein: 0.8, carbs: 7.7,  fat: 0.2, fiber: 2.8 },
  { id: 'espinafre',    name: 'Espinafre cozido',         category: 'legume',      kcal: 26,  protein: 2.9, carbs: 3.6,  fat: 0.4, fiber: 2.4 },
  { id: 'couve-flor',   name: 'Couve-flor cozida',        category: 'legume',      kcal: 28,  protein: 1.9, carbs: 4.1,  fat: 0.4, fiber: 2.5 },
  { id: 'pepino',       name: 'Pepino',                   category: 'legume',      kcal: 15,  protein: 0.6, carbs: 3.6,  fat: 0.1, fiber: 0.5 },

  /* Gorduras e oleaginosas */
  { id: 'amendoim',     name: 'Amendoim torrado',         category: 'gordura',     kcal: 567, protein: 26.0, carbs: 16.0, fat: 49.0, fiber: 8.0 },
  { id: 'castanha',     name: 'Castanha-do-pará',         category: 'gordura',     kcal: 656, protein: 14.0, carbs: 12.0, fat: 67.0, fiber: 7.5 },
  { id: 'azeite',       name: 'Azeite de oliva',          category: 'gordura',     kcal: 884, protein: 0,   carbs: 0,    fat: 100.0, fiber: 0 },
];
