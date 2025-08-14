interface AnalyticsEvent {
  id: string;
  name: string;
  payload: any;
  timestamp: Date;
  userId?: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private maxEvents = 100;

  trackEvent(name: string, payload: any = {}) {
    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      payload,
      timestamp: new Date(),
      userId: this.getUserId()
    };

    this.events.unshift(event);
    
    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(0, this.maxEvents);
    }

    // Store in localStorage for persistence
    this.saveEvents();

    // Log to console for development
    console.log('📊 Analytics Event:', {
      name: event.name,
      payload: event.payload,
      timestamp: event.timestamp
    });

    // TODO: Send to real analytics service (Google Analytics, Mixpanel, etc.)
    // Example: window.gtag?.('event', name, payload);
  }

  getEvents(limit?: number): AnalyticsEvent[] {
    return limit ? this.events.slice(0, limit) : this.events;
  }

  getEventsByName(name: string): AnalyticsEvent[] {
    return this.events.filter(event => event.name === name);
  }

  clearEvents() {
    this.events = [];
    this.saveEvents();
  }

  private getUserId(): string {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  private saveEvents() {
    try {
      localStorage.setItem('analytics_events', JSON.stringify(this.events));
    } catch (error) {
      console.warn('Failed to save analytics events to localStorage:', error);
    }
  }

  private loadEvents() {
    try {
      const stored = localStorage.getItem('analytics_events');
      if (stored) {
        this.events = JSON.parse(stored).map((event: any) => ({
          ...event,
          timestamp: new Date(event.timestamp)
        }));
      }
    } catch (error) {
      console.warn('Failed to load analytics events from localStorage:', error);
    }
  }

  constructor() {
    this.loadEvents();
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

// Export the trackEvent function for easy use
export const trackEvent = analytics.trackEvent.bind(analytics);
export const getAnalyticsEvents = analytics.getEvents.bind(analytics);
export const clearAnalyticsEvents = analytics.clearEvents.bind(analytics);

export default analytics;
