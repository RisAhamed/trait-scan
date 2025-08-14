
# AI Social Persona Finder

A comprehensive social media personality analysis platform that uses advanced AI to discover digital personas, behavioral patterns, and connected identities across platforms.

## Features

- **Profile Analysis**: Analyze personality traits from social media profiles and usernames
- **File Upload**: Upload documents or paste text content for personality analysis
- **Comprehensive Reports**: Detailed personality profiles with Big Five traits, interests, and behavioral patterns
- **Identity Matching**: Find connected accounts across platforms with confidence scoring
- **Visual Analytics**: Interactive charts and data visualizations
- **Privacy First**: Secure processing with full control over data retention

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Usage

### Quick Analysis
1. Visit the homepage and use the "Try Quick Analysis" feature
2. Enter a username or profile URL
3. Wait for AI processing to complete
4. View comprehensive personality insights

### File Upload Analysis
1. Navigate to `/upload`
2. Choose between profile analysis or file upload
3. Upload supported files (PDF, DOCX, TXT) or paste text content
4. Receive detailed personality analysis

### Managing Personas
- View saved personas at `/personas`
- Search and filter personas at `/search`
- Access detailed analytics and reports

## Mock Data

The application includes comprehensive mock data for development and testing:

- **Sample personas** with realistic personality traits and confidence scores
- **Identity matching** examples across multiple platforms
- **Contradiction analysis** showing behavioral differences across platforms
- **Similar account suggestions** with similarity scoring

## API Integration

The app is designed to integrate with backend APIs but includes mock responses for development:

### Environment Variables
- `NEXT_PUBLIC_API_BASE`: Base URL for API endpoints (defaults to `/api/mock`)

### Key Endpoints
- `POST /api/seed` - Create new analysis
- `GET /api/seed/{seedId}/persona` - Get personality data
- `GET /api/seed/{seedId}/identity` - Get identity matches
- `GET /api/seed/{seedId}/contradictions` - Get behavioral contradictions
- `POST /api/report/{seedId}` - Generate downloadable report

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## Design System

The application uses a comprehensive design system with:

- **Colors**: Slate/Indigo/Cyan professional palette
- **Typography**: Inter font family with semantic scaling
- **Components**: Consistent button variants, cards, and form elements
- **Animations**: Subtle transitions and micro-interactions
- **Responsive**: Mobile-first design with collapsible sidebar

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### File Structure

```
src/
├── components/           # Reusable UI components
├── pages/               # Page components and routes
├── lib/                 # Utilities and API functions
├── hooks/               # Custom React hooks
├── mock-data/           # Sample data for development
└── index.css           # Global styles and design system
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy & Security

- All analysis is performed with user consent
- Data retention settings are user-controlled
- No personal information is stored without explicit permission
- Secure processing of uploaded content

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the `/demo` page for examples
- Visit `/settings` for configuration options
- Review the mock data in `src/mock-data/` for expected formats
