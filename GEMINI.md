# Project Context: ESN Event Planner (PoC)

This directory contains the planning and initial documentation for the **ESN Event Planner**, a Proof of Concept (PoC) application designed for Erasmus Student Network (ESN) chapters to visually plan and manage monthly events.

## Directory Overview

The project is currently in its initial planning and specification phase. It focuses on a lightweight, frontend-only demo that allows users to create events on a calendar, assign members via drag-and-drop, and export the final plan as an image.

## Key Files

- **PRD.md**: The Product Requirements Document. It outlines the project summary, user profiles, MVP features (Calendar UI, Drag & Drop, PNG Export), and visual identity guidelines.
- **GEMINI.md**: (This file) Serves as the primary instructional context for AI interactions. It contains specific technical mandates, design system details, and initial state requirements for development.

## Project Type: Non-Code (Planning Phase)

While the project is currently documentation-focused, it is intended to be implemented as a **React.js** application.

## Development Mandates (From PRD & Strategy)

If you are asked to implement or modify code for this project, adhere to the following:

### 1. Technical Stack
- **Framework**: React.js (Functional components and Hooks).
- **Styling**: Tailwind CSS.
- **Icons**: `lucide-react`.
- **Drag & Drop**: Native HTML5 API or `@dnd-kit/core`.
- **Export**: `html2canvas`.
- **State Management**: Local React state (`useState`/`useReducer`) or `Zustand`. No backend.

### 2. Design System (ESN "Unity & Exchange")
Use these brand colors:
- **ESN Cyan**: `#00aeef` (Primary buttons, headers).
- **ESN Magenta**: `#ec008c` (Avatars, highlights).
- **ESN Green**: `#7ac143` (Avatars, success).
- **ESN Orange**: `#f47c36` (Avatars, warnings).
- **Background**: `#f8f9fa`.

### 3. Core Features
- **Monthly Calendar**: A simple grid view (e.g., 30 days).
- **Event Creation**: Minimal modal/prompt for "Event Name" and "Time".
- **Drag & Drop**: Draggable members from a sidebar to event cards in the calendar.
- **Image Export**: A "Takvimi İndir" button using `html2canvas`.

### 4. Initial Mock Data
```javascript
const initialMembers = [
  { id: "1", name: "Ömer", color: "#ec008c" },
  { id: "2", name: "Ayşe", color: "#7ac143" },
  { id: "3", name: "Ali", color: "#f47c36" }
];

const initialEvents = [
  {
    id: "e1",
    title: "Welcome Party",
    date: 5,
    time: "21:00",
    assigned_members: ["1", "2"]
  }
];
```

## Usage

The contents of this directory should be used to guide the creation of the PoC. When starting the implementation:
1. Initialize a React project with Tailwind CSS.
2. Use the specifications in `PRD.md` for UI/UX.
3. Follow the instructions in `GEMINI.md` for technical consistency.
