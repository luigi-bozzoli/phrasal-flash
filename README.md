# 📚 Phrasal Flash

A flashcard web app to study and review English phrasal verbs, built with React and TypeScript.

🔗 **[Live Demo](https://luigi-bozzoli.github.io/phrasal-flash/)**

---

## What It Does

Phrasal Flash helps users learn English phrasal verbs through two complementary views:

- **Flashcard mode** — flip cards to reveal the meaning of a phrasal verb, one at a time
- **List / dictionary mode** — browse all phrasal verbs in a searchable list, similar to a dictionary

No backend, no authentication — just a fast, focused learning tool.

---

## Tech Stack

| Technology | Role |
|---|---|
| React | UI component architecture |
| TypeScript | Static typing and safer component contracts |
| JSON files | Local data source for phrasal verbs |
| GitHub Pages | Static site deployment |

### Architecture decisions

- **TypeScript over plain JavaScript** — enforces strict typing on the phrasal verb data model, catching mismatches between the JSON source and the UI at compile time rather than at runtime.
- **JSON as a data source** — keeping the dataset as static JSON files avoids the need for a backend while still making it easy to extend the vocabulary list.
- **Pure frontend** — since the data is read-only and doesn't require personalization, a purely client-side approach is the right fit. There is no unnecessary complexity from server-side logic or external APIs.

---

## Features

- 🃏 **Flip cards** — interactive flashcards with a flip animation to reveal definitions
- 🔍 **Search bar** — filter phrasal verbs in real time from the list view
- 📖 **Dictionary-style list** — browse all entries at a glance
- 📱 **Responsive design** — works on desktop and mobile

---

## Project Structure

```
public/
└── phrasal_verbs/        # JSON files containing phrasal verb entries (one per letter)

src/
├── components/           # Reusable UI components (SearchBar, ...)
├── data/                 # TypeScript interfaces and type definitions
├── views/
│   ├── FlashCardView.tsx # Flashcard mode
│   └── ListView.tsx      # Dictionary / list mode
└── App.tsx               # Root component and routing logic
```

---

## Data Source

The phrasal verb dataset is based on the open-source dataset **[generated-english-phrasal-verbs](https://github.com/WithEnglishWeCan/generated-english-phrasal-verbs/blob/master/phrasal.verbs.build.json)** by WithEnglishWeCan.

The original single JSON file was processed before use:
- Split into separate files organized by first letter of the verb
- Entries with missing or incomplete data were removed
- A few additional phrasal verbs were added manually

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/luigi-bozzoli/phrasal-flash.git
cd phrasal-flash

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

The app is deployed as a static site via **GitHub Pages**. Any push to the main branch triggers a new deployment.

---

## License

This project is licensed under the **[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)**.

You are free to use, share, adapt, and build upon this project for any purpose, including commercially, as long as you give appropriate credit to the original author and project.

The phrasal verb dataset is derived from [generated-english-phrasal-verbs](https://github.com/WithEnglishWeCan/generated-english-phrasal-verbs) by WithEnglishWeCan, which is licensed under the **MIT License**.

---

## Author

**Luigi Bozzoli**
- GitHub: [@luigi-bozzoli](https://github.com/luigi-bozzoli)
