// TimeCraft - Time Travel Engine for ChronoCode
// Records all events and enables replay/rewind functionality

export interface TimelineEvent {
  id: string;
  timestamp: number;
  type: 'tool_call' | 'response' | 'checkpoint' | 'error';
  sessionId: string;
  data: {
    tool?: string;
    args?: any;
    result?: any;
    station?: string;
    position?: { x: number; y: number; z: number };
    message?: string;
    commitHash?: string;
    branch?: string;
  };
}

export interface Checkpoint {
  id: string;
  timestamp: number;
  commitHash: string;
  branch: string;
  message: string;
  eventIndex: number;
}

export class TimeCraftEngine {
  private events: TimelineEvent[] = [];
  private checkpoints: Checkpoint[] = [];
  private currentIndex: number = -1;
  private isReplaying: boolean = false;
  private replaySpeed: number = 1.0;

  // Record a new event
  recordEvent(event: Omit<TimelineEvent, 'id' | 'timestamp'>): void {
    const newEvent: TimelineEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    this.events.push(newEvent);
    this.currentIndex = this.events.length - 1;
    
    // Auto-create checkpoint for git commits
    if (event.type === 'checkpoint' && event.data.commitHash) {
      this.createCheckpoint(event.data.commitHash, event.data.branch || 'main', event.data.message || '');
    }
  }

  // Create a checkpoint (git commit)
  createCheckpoint(commitHash: string, branch: string, message: string): void {
    this.checkpoints.push({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      commitHash,
      branch,
      message,
      eventIndex: this.events.length - 1,
    });
  }

  // Get all events
  getEvents(): TimelineEvent[] {
    return this.events;
  }

  // Get events in time range
  getEventsInRange(startTime: number, endTime: number): TimelineEvent[] {
    return this.events.filter(e => e.timestamp >= startTime && e.timestamp <= endTime);
  }

  // Get checkpoints
  getCheckpoints(): Checkpoint[] {
    return this.checkpoints;
  }

  // Jump to specific time
  jumpToTime(timestamp: number): TimelineEvent[] {
    const index = this.events.findIndex(e => e.timestamp >= timestamp);
    if (index === -1) return [];
    
    this.currentIndex = index;
    return this.events.slice(0, index + 1);
  }

  // Jump to checkpoint
  jumpToCheckpoint(checkpointId: string): TimelineEvent[] {
    const checkpoint = this.checkpoints.find(c => c.id === checkpointId);
    if (!checkpoint) return [];
    
    this.currentIndex = checkpoint.eventIndex;
    return this.events.slice(0, checkpoint.eventIndex + 1);
  }

  // Start replay from current position
  startReplay(speed: number = 1.0): void {
    this.isReplaying = true;
    this.replaySpeed = speed;
  }

  // Stop replay
  stopReplay(): void {
    this.isReplaying = false;
  }

  // Step forward one event
  stepForward(): TimelineEvent | null {
    if (this.currentIndex >= this.events.length - 1) return null;
    this.currentIndex++;
    return this.events[this.currentIndex];
  }

  // Step backward one event
  stepBackward(): TimelineEvent | null {
    if (this.currentIndex <= 0) return null;
    this.currentIndex--;
    return this.events[this.currentIndex];
  }

  // Get current position
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  // Get timeline bounds
  getTimelineBounds(): { start: number; end: number } {
    if (this.events.length === 0) return { start: 0, end: 0 };
    return {
      start: this.events[0].timestamp,
      end: this.events[this.events.length - 1].timestamp,
    };
  }

  // Export session for replay
  exportSession(): string {
    return JSON.stringify({
      events: this.events,
      checkpoints: this.checkpoints,
      version: '1.0.0',
    });
  }

  // Import session
  importSession(data: string): void {
    const parsed = JSON.parse(data);
    this.events = parsed.events || [];
    this.checkpoints = parsed.checkpoints || [];
    this.currentIndex = this.events.length - 1;
  }

  // Clear history
  clear(): void {
    this.events = [];
    this.checkpoints = [];
    this.currentIndex = -1;
  }
}

// Singleton instance
export const timecraft = new TimeCraftEngine();
