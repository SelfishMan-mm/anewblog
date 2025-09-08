# Copilot Instructions

This is a Next.js 15 personal portfolio site using App Router, TypeScript, Tailwind CSS, and Framer Motion animations.

## Architecture Overview

### Core Structure
- **App Router**: Pages in `app/` directory (`page.tsx`, `about/page.tsx`, `contact/page.tsx`, `timeline/page.tsx`)
- **Component-First**: Sectioned components in `components/sections/` (hero, skills, portfolio, contact, footer)
- **MagicUI Components**: Custom animated components in `components/magicui/` (box-reveal, particles, meteors, orbiting-circles)
- **Configuration-Driven**: Site metadata, navigation, and mock data in `config/` directory

### Key Architectural Patterns

#### Theme & Animation System
- **Fixed Dark Theme**: Only dark theme is supported (`contexts/theme-context.tsx`)
- **Animation Control**: Global animation toggle via `animationsEnabled` state
- **Accessibility**: Respects `prefers-reduced-motion` via `use-reduced-motion.ts` hook
- **Performance**: Animation control hooks (`use-animation-control.ts`) handle visibility-based triggers

#### Error Boundaries & Client Components
- **Granular Error Handling**: `ComponentErrorBoundary` wraps individual sections
- **Client Root Pattern**: `client-root.tsx` handles client-side navigation overlay
- **SSR-Safe**: All interactive components use `'use client'` directive appropriately

#### Data & State Management
- **Mock Data Pattern**: Centralized test data in `config/mock-data.ts` with type safety
- **Custom Hooks**: Animation settings, typewriter effects, intersection observers
- **TypeScript Types**: Comprehensive type definitions in `types/index.ts`

## Development Workflow

### Commands
```bash
npm run dev --turbopack    # Development with Turbopack (faster)
npm run build              # Production build
npm run lint               # ESLint checking
```

### Component Development
- Use `ComponentErrorBoundary` for new sections: `<ComponentErrorBoundary componentName="YourSection">`
- Follow the section pattern: Create in `components/sections/`, import in pages
- Animation components: Check `use-animation-control.ts` for visibility-based triggers

### Styling Conventions
- **Tailwind Classes**: Use `cn()` utility from `lib/utils.ts` for conditional classes
- **Component Variants**: Leverage `class-variance-authority` for component variations
- **Color Scheme**: Primary blue (`#3b82f6`), gradient backgrounds, glassmorphism effects
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints

## Project-Specific Patterns

### Animation Integration
- **MagicUI Components**: Pre-built animated components with customizable props
- **Framer Motion**: Use `motion/react` import (not `framer-motion`)
- **Performance Considerations**: All animations respect `animationsEnabled` from theme context

### Configuration Management
- **Site Config**: Update `config/site.ts` for metadata, SEO, and author info
- **Navigation**: Modify `config/navigation.ts` for menu items
- **Mock Data**: Update `config/mock-data.ts` for content (personal info, skills, projects)

### Component File Structure
```
components/
├── sections/        # Page sections (hero, skills, portfolio)
├── magicui/         # Animated UI components  
├── ui/             # Basic UI components
└── error-boundary.tsx, navigation.tsx, client-root.tsx
```

### Key Files to Understand
- `app/layout.tsx`: Root layout with providers, fonts, analytics
- `app/page.tsx`: Main page composition with sections
- `contexts/theme-context.tsx`: Animation settings and theme state
- `hooks/use-animation-control.ts`: Intersection observer for animations
- `lib/utils.ts`: Utility functions including `cn()` for class merging

### External Dependencies
- **Analytics**: Vercel Analytics integrated in layout
- **Icons**: Tabler Icons React and Lucide React
- **Fonts**: Geist Sans and Geist Mono from Next.js fonts
- **Animations**: Framer Motion with custom hooks for control

When adding new features, follow the established patterns: use TypeScript interfaces, wrap with error boundaries, implement animation controls, and update the corresponding config files.
