# Romantic Journey – Customization

This single-page experience lives at **`/journey`**. Share that URL as the surprise.

## Customize content

- **Secret password (Do You Remember?)**  
  Edit `SECRET_PASSWORD` in `src/pages/journey/components/PasswordGate.tsx` (e.g. a nickname).

- **Quiz questions**  
  Edit `src/pages/journey/data/quiz.ts` (questions, options, `correctIndex`).

- **Timeline milestones**  
  Edit `src/pages/journey/data/timeline.ts` (titles, dates, images, descriptions).

- **Final surprise message**  
  Edit the modal text in `src/pages/journey/components/FinalChapterSection.tsx`.

- **Easter egg messages**  
  Edit `SECRET_MESSAGES` in `src/pages/journey/components/EasterEggs.tsx`.

## Background music

Add an audio file to the **public** folder, e.g.:

- `public/journey-music.mp3`

The music toggle will use it. If the file is missing, the toggle still works (no sound).

## Konami code

**↑ ↑ ↓ ↓ ← → ← → B A** unlocks a hidden “secret level” page.

## Tech

- React + Vite, Tailwind CSS, Framer Motion, canvas-confetti.
