
# AI Social Persona Finder - Style Guide

## Design System Overview

This style guide defines the visual language and component patterns for the AI Social Persona Finder application.

## Color Palette

### Primary Colors
- **Primary**: `#334155` (Slate 700) - Used for headers, primary buttons, and main navigation
- **Accent**: `#6366F1` (Indigo 500) - CTAs, highlights, and interactive elements  
- **Secondary**: `#06B6D4` (Cyan 500) - Secondary actions and accent elements

### Semantic Colors
- **Success**: `#10B981` (Green 500) - Success states, high confidence indicators
- **Warning**: `#F59E0B` (Amber 500) - Warning states, medium confidence indicators
- **Danger**: `#EF4444` (Red 500) - Error states, low confidence indicators

### Neutral Colors
- **Surface**: `#FFFFFF` (light) / `#0F172A` (dark) - Card backgrounds and surfaces
- **Muted Text**: `#6B7280` (Gray 500) - Secondary text and descriptions
- **Border**: `#E6E9EE` - Dividers, borders, and subtle separations

## Typography

### Font Family
- **Primary**: Inter (system-ui, -apple-system fallback)
- Web font loaded via Google Fonts or local installation

### Type Scale
- **H1 (Hero)**: 36px / 700 weight - Main page headings
- **H2 (Section)**: 28px / 600 weight - Section headings  
- **H3 (Subsection)**: 22px / 600 weight - Card titles, subsections
- **Body**: 16px / 400 weight, 1.5 line-height - Main text content
- **UI Small**: 14px / 400 weight - Labels, captions, metadata

### Tailwind Classes
- `text-4xl font-bold` for H1
- `text-3xl font-semibold` for H2
- `text-xl font-semibold` for H3
- `text-base` for body text
- `text-sm` for small UI text

## Spacing & Layout

### Base Unit
- **4px base unit** - All spacing uses multiples of 4px
- Tailwind utilities: `p-4` (16px), `p-6` (24px), `p-8` (32px)

### Container Widths
- **Max width**: 1400px (`max-w-7xl`)
- **Content areas**: 1024px (`max-w-4xl`) for focused content
- **Forms**: 512px (`max-w-2xl`) for input forms

### Grid Systems
- **Cards**: CSS Grid with responsive columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Sidebar**: Fixed 256px width (collapsed: 64px)

## Border Radius & Shadows

### Border Radius
- **Cards**: `rounded-2xl` (16px) - Main content cards
- **Buttons**: `rounded-2xl` (16px) - Primary and secondary buttons
- **Inputs**: `rounded-lg` (8px) - Form inputs and fields
- **Badges**: `rounded-full` - Pills and tags

### Shadows
- **Cards**: `shadow-sm` - Subtle elevation for cards
- **Hover**: `shadow-md` - Enhanced shadow on hover
- **Modals**: `shadow-lg` - Prominent shadow for dialogs

## Component Patterns

### Buttons

#### Primary (Accent)
```tsx
<Button className="btn-primary">
  Analyze Persona
</Button>
```
- Background: Accent color (`#6366F1`)
- Text: White
- Hover: Slightly darker accent
- Used for: Main CTAs, form submissions

#### Secondary (Outline)
```tsx
<Button className="btn-outline">
  View Details  
</Button>
```
- Border: Primary color
- Text: Primary color
- Hover: Filled with primary background
- Used for: Secondary actions

#### Ghost
```tsx
<Button className="btn-ghost">
  Cancel
</Button>
```
- Background: Transparent
- Text: Muted foreground
- Hover: Muted background
- Used for: Tertiary actions, navigation

### Cards

#### Standard Surface Card
```tsx
<div className="card-surface">
  <!-- Card content -->
</div>
```
- Background: Surface color
- Border: Subtle border
- Radius: `rounded-2xl`
- Shadow: `shadow-sm`

#### Hover Card
```tsx
<div className="card-hover">
  <!-- Interactive card content -->
</div>
```
- Extends surface card
- Hover: Enhanced shadow
- Cursor: Pointer
- Used for: Clickable cards, navigation items

### Form Elements

#### Input Fields
```tsx
<input className="input-field" />
```
- Background: Background color
- Border: Input color
- Focus: Accent ring
- Padding: `px-4 py-3`

### Confidence Indicators

#### High Confidence (80%+)
```tsx
<span className="confidence-high">87% confident</span>
```
- Background: Success/10 opacity
- Text: Success color
- Border: Success/20 opacity

#### Medium Confidence (60-79%)
```tsx
<span className="confidence-medium">65% confident</span>
```
- Background: Warning/10 opacity
- Text: Warning color
- Border: Warning/20 opacity

#### Low Confidence (<60%)
```tsx
<span className="confidence-low">45% confident</span>
```
- Background: Danger/10 opacity
- Text: Danger color
- Border: Danger/20 opacity

## Animations & Interactions

### Micro-Interactions
- **Button hover**: 200ms ease-out transition
- **Card hover**: Scale and shadow transition
- **Input focus**: Ring animation with accent color

### Page Transitions
- **Fade in**: `animate-fade-in` (300ms ease-out)
- **Slide up**: `animate-slide-up` (400ms ease-out)
- **Scale in**: `animate-scale-in` (200ms ease-out)

### Loading States
- **Skeleton**: Pulse animation on muted background
- **Spinner**: Rotate animation with accent color
- **Progress bars**: Smooth width transitions (1000ms ease-out)

## Responsive Breakpoints

### Tailwind Breakpoints
- **sm**: 640px and up - Tablet portrait
- **md**: 768px and up - Tablet landscape  
- **lg**: 1024px and up - Desktop
- **xl**: 1280px and up - Large desktop

### Layout Adaptations
- **Sidebar**: Collapsible on mobile (`md:` prefix for desktop layout)
- **Grid columns**: Responsive grid systems
- **Text sizes**: Slightly smaller on mobile
- **Spacing**: Reduced padding on smaller screens

## Accessibility

### Color Contrast
- **Text on background**: Minimum 4.5:1 ratio
- **Interactive elements**: Clear focus indicators
- **Status colors**: Not solely dependent on color

### Keyboard Navigation
- **Tab order**: Logical flow through interactive elements
- **Focus indicators**: Visible outline on all focusable elements
- **Skip links**: Available for main content navigation

### Screen Readers
- **Semantic HTML**: Proper heading hierarchy, landmark elements
- **ARIA labels**: Descriptive labels for complex interactions
- **Alt text**: Meaningful descriptions for images and icons

## Usage Examples

### Persona Card Layout
```tsx
<Card className="card-hover">
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary">
        {/* Avatar */}
      </div>
      <div>
        <CardTitle>John Doe</CardTitle>
        <p className="text-sm text-muted-foreground">Multi-platform</p>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    {/* Personality traits, interests, etc. */}
  </CardContent>
</Card>
```

### Trait Visualization
```tsx
<div className="space-y-2">
  <div className="flex justify-between">
    <span className="font-medium">Openness</span>
    <span className="confidence-high">81%</span>
  </div>
  <div className="trait-bar h-3">
    <div className="trait-fill bg-purple-500 w-[81%]" />
  </div>
</div>
```

### Form Section
```tsx
<div className="space-y-4">
  <Input 
    className="input-field" 
    placeholder="Enter username or profile URL"
  />
  <Button className="btn-primary w-full">
    Analyze Persona
  </Button>
</div>
```

This style guide ensures consistent visual language across the entire application while maintaining flexibility for future enhancements.
