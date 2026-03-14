> *"Juro solenemente não fazer nada de bom."*

Portfólio pessoal interativo inspirado no **Mapa do Maroto** de Harry Potter. Em vez de navegação tradicional, o usuário lança **feitiços** para revelar seções secretas do mapa — criando uma experiência imersiva e temática.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer" alt="Framer Motion" />
</p>

---

## ✨ Conceito

O portfólio funciona como um mapa mágico: começa **fechado** e só revela seu conteúdo quando o visitante digita feitiços em um campo encantado. Cada feitiço abre uma "passagem secreta" diferente do mapa.

| Feitiço               | Seção Revelada     | Descrição                        |
| ---------------------- | ------------------ | -------------------------------- |
| `Aparecium`            | **Sobre Mim**      | Bio, stats e resumo profissional |
| `Revelio`              | **Projetos**       | Repositórios do GitHub           |
| `Specialis Revelio`    | **Habilidades**    | Grimório de skills com níveis    |
| `Contacto`             | **Contato**        | Formulário + redes sociais       |
| `Malfeito Feito`       | *(fecha o mapa)*   | Volta ao estado inicial          |

> Também é possível navegar pelas seções pelo **menu superior** (desktop).

---

## 🧰 Tecnologias

| Categoria        | Tecnologia                                                  |
| ---------------- | ----------------------------------------------------------- |
| Framework        | [Next.js 15](https://nextjs.org/) (App Router)             |
| UI               | [React 19](https://react.dev/)                             |
| Linguagem        | [TypeScript 5](https://www.typescriptlang.org/)            |
| Estilos          | [Tailwind CSS 4](https://tailwindcss.com/)                 |
| Animações        | [Framer Motion 11](https://www.framer.com/motion/)         |
| Partículas       | [tsParticles](https://particles.js.org/) (Slim)            |
| Ícones           | [React Icons](https://react-icons.github.io/react-icons/)  |
| Tipografia       | Google Fonts — *Cinzel* (títulos) + *Crimson Text* (corpo) |

---

## 📁 Estrutura do Projeto

```
mapa-do-maroto/
├── app/
│   ├── globals.css          # Design tokens & tema Marauder's Map
│   ├── layout.tsx           # Layout raiz (metadata + idioma pt-BR)
│   ├── page.tsx             # Página principal — lógica de feitiços e navegação
│   └── favicon.ico
├── components/
│   ├── animations/
│   │   ├── Footprints.tsx   # Pegadas animadas (efeito do Aparecium)
│   │   └── MagicParticles.tsx # Partículas douradas ambientais
│   ├── layout/
│   │   └── Layout.tsx       # Shell visual — vinheta, textura, moldura e ornamentos
│   ├── magic-input/
│   │   └── MagicInput.tsx   # Campo de feitiços com autocomplete e animações
│   ├── onboarding/
│   │   └── MapTutorial.tsx  # Tutorial interativo (primeira visita)
│   └── sections/
│       ├── AboutSection.tsx     # Seção "Sobre Mim" com contadores animados
│       ├── ClosedMap.tsx        # Estado inicial — mapa fechado
│       ├── ContactSection.tsx   # Formulário de contato + redes sociais
│       ├── ProjectsSection.tsx  # Grid de projetos via GitHub API
│       ├── SkillsSection.tsx    # Skills com barras de progresso
│       └── UnknownSpell.tsx     # Feedback para feitiços inválidos
├── public/                  # Assets estáticos
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) **18+**
- npm (incluso com o Node)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/santwsvi/mapa-do-maroto.git
cd mapa-do-maroto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **[http://localhost:3000](http://localhost:3000)** e lance seu primeiro feitiço. 🪄

### Build de produção

```bash
npm run build
npm start
```

---

## 🎨 Design System

O projeto usa um sistema de **design tokens** com paleta inspirada em pergaminho antigo:

- **Fundos** — tons quentes dessaturados (`hue ~28°`, saturação < 30%)
- **Ouro** — acento primário para títulos, CTAs e destaques
- **Cobre** — acento secundário para variação cromática
- **Ink** — hierarquia de texto em creme neutro (AAA WCAG)
- **Espaçamento** — escala de 8pt
- **Tipografia** — *Cinzel* (display) + *Crimson Text* (corpo), `line-height: 1.72` otimizado para dark mode

---

## 🔮 Features

- 🪄 **Sistema de feitiços** — navegação por encantamentos com autocomplete
- 👣 **Pegadas animadas** — efeito de passos no mapa ao conjurar *Aparecium*
- ✨ **Partículas mágicas** — poeira dourada ambiente com tsParticles
- 📜 **Tutorial onboarding** — guia interativo na primeira visita (com persistência em `localStorage`)
- 💥 **Feedback de feitiço inválido** — animação de explosão com sugestões
- 📱 **Responsivo** — menu adaptativo (nav desktop + botão de ajuda mobile)
- 🌐 **Integração GitHub API** — projetos carregados dinamicamente com fallback

---

## 📄 Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

MIT License

Copyright (c) 2026 Felipe Giannetti Fontenelle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


---

## 👤 Autor

**Victor Gabriel Santos Rocha** — Engenheiro de Software

- GitHub: [@santwsvi](https://github.com/santwsvi)
- LinkedIn: [/in/victorgsrocha](https://linkedin.com/in/victorgsrocha)
- E-mail: victorgsantosrocha@gmail.com
