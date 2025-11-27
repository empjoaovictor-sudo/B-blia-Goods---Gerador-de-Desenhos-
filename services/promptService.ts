
// Componentes para criar cenas bíblicas históricas e reconhecíveis
// Foco: Narrativa visual clara sem texto.

const HISTORICAL_SCENES = [
  // Velho Testamento
  "A Arca de Noé navegando sobre as águas com uma girafa e um elefante olhando para fora",
  "O bebê Moisés dormindo tranquilamente num cesto de vime flutuando no rio Nilo",
  "Daniel sentado calmamente na cova dos leões, com leões fofos dormindo ao redor",
  "Jonas sendo engolido por uma grande baleia amigável no mar",
  "O pequeno Davi segurando uma pedra e uma funda, de pé corajosamente",
  "Davi tocando sua harpa sentado em uma pedra cercado por ovelhas",
  "Sansão empurrando duas colunas grandes com força",
  "Elias sentado perto de um riacho sendo alimentado por um corvo que traz pão",
  "A Rainha Ester tocando a ponta do cetro de ouro do rei",
  "José do Egito vestindo sua túnica de muitas cores e listras",
  "Adão e Eva no Jardim do Éden perto de uma árvore cheia de frutas",
  "A sarça ardente pegando fogo mas sem se queimar, com Moisés tirando as sandálias",
  "As muralhas de Jericó caindo enquanto pessoas tocam trombetas",
  "Abraão olhando para o céu cheio de estrelas à noite",
  "Jacó dormindo com a cabeça numa pedra sonhando com uma escada que vai até o céu",
  "Rute recolhendo espigas de trigo no campo de Boaz",
  "Samuel ainda menino ouvindo a voz de Deus no templo à noite",
  "Balaão montado em sua jumenta que parou no meio do caminho",
  "Salomão orando no templo pedindo sabedoria a Deus",
  
  // Novo Testamento
  "O bebê Jesus na manjedoura cercado por animais do estábulo",
  "Os Três Reis Magos montados em camelos seguindo uma grande estrela",
  "Jesus menino conversando com os doutores no templo",
  "João Batista batizando no rio Jordão com uma pomba descendo",
  "Pedro pescando em um barco cheio de peixes na rede",
  "Jesus multiplicando cinco pães e dois peixinhos num cesto",
  "Zaqueu, um homem pequeno, em cima de uma árvore sicômoro olhando para baixo",
  "O Bom Samaritano enfaixando o machucado de um homem na estrada",
  "O Bom Pastor carregando uma ovelha perdida nos ombros",
  "Marta e Maria, uma cozinhando e a outra sentada ouvindo Jesus",
  "Jesus acalmando a tempestade no barco com os discípulos assustados",
  "Paulo escrevendo cartas com uma pena e pergaminho numa mesa",
  "A mulher samaritana tirando água do poço com um jarro",
  "Jesus entrando em Jerusalém montado em um jumentinho com ramos de palmeira no chão",
  "Maria Madalena encontrando o túmulo vazio no jardim",
  "Estêvão olhando para o céu vendo a glória de Deus",
  "Pedro andando sobre as águas em direção a Jesus"
];

const DECORATIVE_ATMOSPHERE = [
  "cercado por nuvens fofinhas",
  "com estrelinhas brilhando ao redor",
  "com uma moldura de flores delicadas",
  "sob um sol sorridente e raios de luz",
  "com coraçõezinhos flutuando no ar",
  "com borboletas voando em volta",
  "com notas musicais suaves no ar",
  "com brilhos (sparkles) mágicos ao redor",
  "com pombinhas da paz voando no fundo",
  "com um arco-íris no fundo"
];

// Helper to shuffle array
const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomPrompt = (history: string[]): string => {
  // Construct a combinatorial prompt
  const scene = getRandomItem(HISTORICAL_SCENES);
  const decoration = getRandomItem(DECORATIVE_ATMOSPHERE);
  
  // Construct the descriptive prompt
  // The key here is specificity for the image model
  
  return `Desenho para colorir estilo Bobbie Goods (kawaii, linhas pretas grossas, fundo branco).
  Cena Principal: ${scene}.
  Detalhes Decorativos: ${decoration}.
  Estilo: Ilustração infantil, traço limpo, minimalista, fofo, vetor line art.
  
  REGRAS RÍGIDAS (NEGATIVE PROMPT):
  - NÃO ESCREVA TEXTO.
  - NÃO ESCREVA NOMES.
  - NÃO COLOQUE LETRAS.
  - NÃO COLOQUE ASSINATURAS.
  - O desenho deve ser mudo (sem balões de fala, sem palavras).
  - Apenas a ilustração da cena bíblica.`;
};
