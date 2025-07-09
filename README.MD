# BiteSpeed Chatbot Flow Builder

A modern, intuitive drag-and-drop chatbot flow builder built with React, TypeScript, and Tailwind CSS. Create complex conversational flows with visual node connections and real-time editing capabilities.

# Live Demo

**Hosted Application**: https://bite-speed-chatbot-flow-builder.vercel.app/

## ✨ Features

# Core Functionality
- **Drag & Drop Interface**: Intuitive node placement with smooth drag interactions
- **Visual Flow Connections**: Connect nodes with beautiful bezier curves and arrow indicators
- **Multiple Node Types**: 
  - Start nodes (conversation entry points)
  - Message nodes (bot responses)
  - Input nodes (user input collection)
  - Condition nodes (flow branching logic)
  - Action nodes (external actions/API calls)
- **Real-time Editing**: Live settings panel for immediate node configuration
- **Flow Management**: Save, load, and export flow configurations

# User Experience
- **Professional Interface**: Clean, modern design with intuitive navigation
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Visual Feedback**: Hover states, selection indicators, and smooth animations
- **Grid Canvas**: Organized workspace with snap-to-grid functionality
- **Context Menus**: Right-click actions and keyboard shortcuts

### Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **Component Architecture**: Modular, reusable React components
- **State Management**: Efficient local state with React hooks
- **Data Persistence**: Local storage for flow saving/loading
- **Export Functionality**: JSON export for flow data portability

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint with TypeScript rules

## Project Structure

```
src/
├── components/           # React components
│   ├── FlowBuilder.tsx  # Main flow builder container
│   ├── NodeComponent.tsx # Individual node rendering
│   ├── Sidebar.tsx      # Component palette
│   ├── SettingsPanel.tsx # Node configuration panel
│   └── ConnectionLine.tsx # Visual connections
├── types/               # TypeScript type definitions
├── utils/               # Helper functions and utilities
├── App.tsx             # Root application component
└── main.tsx            # Application entry point
```

# Getting Started

# Prerequisites
- Node.js (version 16 or higher)
- npm package manager

# Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bitespeed-chatbot-flow-builder.git
   cd bitespeed-chatbot-flow-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

# Build for Production

```bash
npm run build
npm run preview
```

# Usage Guide

# Creating a Flow
1. **Add Nodes**: Drag components from the sidebar to the canvas
2. **Connect Nodes**: Click and drag from the blue connection handles
3. **Configure Nodes**: Click any node to open the settings panel
4. **Save Progress**: Use the Save button to store your flow locally

#  Node Types
- **Start Node**: Entry point for conversations (green)
- **Message Node**: Bot responses and messages (blue)
- **Input Node**: Collect user input with validation (orange)
- **Condition Node**: Branch flows based on logic (purple)
- **Action Node**: Trigger external actions (red)


# Performance

- **Bundle Size**: Optimized with Vite for minimal bundle size
- **Runtime Performance**: Efficient React rendering with proper memoization
- **Memory Usage**: Optimized state management for large flows
- **Load Time**: Fast initial load with code splitting

# Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity
- Add proper type definitions
- Include comprehensive comments
