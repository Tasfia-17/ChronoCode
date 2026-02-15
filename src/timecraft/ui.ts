// Timeline UI Component for TimeCraft
// Renders the timeline scrubber at bottom of screen

import { timecraft, TimelineEvent, Checkpoint } from './engine';

export class TimelineUI {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scrubber: HTMLElement;
  private isVisible: boolean = true;
  private isDragging: boolean = false;
  private onSeek: (timestamp: number) => void;

  constructor(containerId: string, onSeek: (timestamp: number) => void) {
    this.container = document.getElementById(containerId) || document.body;
    this.onSeek = onSeek;
    
    this.createUI();
    this.canvas = this.container.querySelector('.timeline-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.scrubber = this.container.querySelector('.timeline-scrubber') as HTMLElement;
    
    this.setupEventListeners();
    this.render();
  }

  private createUI(): void {
    const html = `
      <div class="timeline-container" style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
      ">
        <div class="timeline-header" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        ">
          <div class="timeline-title" style="color: #fff; font-size: 14px; font-weight: 600;">
            ⏰ TimeCraft
          </div>
          <div class="timeline-controls" style="display: flex; gap: 10px;">
            <button class="timeline-btn" data-action="step-back" style="
              background: rgba(255, 255, 255, 0.1);
              border: none;
              color: #fff;
              padding: 5px 10px;
              border-radius: 4px;
              cursor: pointer;
            ">◀</button>
            <button class="timeline-btn" data-action="play-pause" style="
              background: rgba(99, 102, 241, 0.8);
              border: none;
              color: #fff;
              padding: 5px 15px;
              border-radius: 4px;
              cursor: pointer;
            ">▶</button>
            <button class="timeline-btn" data-action="step-forward" style="
              background: rgba(255, 255, 255, 0.1);
              border: none;
              color: #fff;
              padding: 5px 10px;
              border-radius: 4px;
              cursor: pointer;
            ">▶</button>
            <button class="timeline-btn" data-action="reset" style="
              background: rgba(255, 255, 255, 0.1);
              border: none;
              color: #fff;
              padding: 5px 10px;
              border-radius: 4px;
              cursor: pointer;
            ">↻</button>
          </div>
        </div>
        <div class="timeline-track" style="
          position: relative;
          height: 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        ">
          <canvas class="timeline-canvas" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          "></canvas>
          <div class="timeline-scrubber" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background: #6366f1;
            cursor: ew-resize;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.8);
          ">
            <div style="
              position: absolute;
              top: -5px;
              left: -5px;
              width: 13px;
              height: 13px;
              background: #6366f1;
              border-radius: 50%;
              border: 2px solid #fff;
            "></div>
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = html;
  }

  private setupEventListeners(): void {
    // Scrubber dragging
    this.scrubber.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = x / rect.width;
      
      const bounds = timecraft.getTimelineBounds();
      const timestamp = bounds.start + (bounds.end - bounds.start) * percent;
      
      this.scrubber.style.left = `${percent * 100}%`;
      this.onSeek(timestamp);
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Control buttons
    this.container.querySelectorAll('.timeline-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = (e.target as HTMLElement).dataset.action;
        this.handleAction(action!);
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'T' || e.key === 't') {
        this.toggle();
      } else if (e.key === ' ') {
        this.handleAction('play-pause');
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        this.handleAction('step-back');
      } else if (e.key === 'ArrowRight') {
        this.handleAction('step-forward');
      } else if (e.key === 'r' || e.key === 'R') {
        this.handleAction('reset');
      }
    });
  }

  private handleAction(action: string): void {
    switch (action) {
      case 'step-back':
        timecraft.stepBackward();
        break;
      case 'step-forward':
        timecraft.stepForward();
        break;
      case 'play-pause':
        // Toggle replay
        break;
      case 'reset':
        const bounds = timecraft.getTimelineBounds();
        this.onSeek(bounds.end);
        break;
    }
    this.render();
  }

  private render(): void {
    const width = this.canvas.width = this.canvas.offsetWidth;
    const height = this.canvas.height = this.canvas.offsetHeight;
    
    this.ctx.clearRect(0, 0, width, height);
    
    const events = timecraft.getEvents();
    const checkpoints = timecraft.getCheckpoints();
    const bounds = timecraft.getTimelineBounds();
    
    if (bounds.end === bounds.start) return;
    
    // Draw events
    events.forEach(event => {
      const x = ((event.timestamp - bounds.start) / (bounds.end - bounds.start)) * width;
      
      // Color by type
      let color = '#6366f1';
      if (event.type === 'error') color = '#ef4444';
      if (event.type === 'checkpoint') color = '#10b981';
      
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, height / 2 - 2, 2, 4);
    });
    
    // Draw checkpoints
    checkpoints.forEach(checkpoint => {
      const x = ((checkpoint.timestamp - bounds.start) / (bounds.end - bounds.start)) * width;
      
      this.ctx.fillStyle = '#10b981';
      this.ctx.beginPath();
      this.ctx.arc(x, height / 2, 5, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw label
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '10px sans-serif';
      this.ctx.fillText(checkpoint.message.slice(0, 20), x + 8, height / 2 + 4);
    });
    
    // Update scrubber position
    const currentIndex = timecraft.getCurrentIndex();
    if (currentIndex >= 0 && currentIndex < events.length) {
      const event = events[currentIndex];
      const percent = (event.timestamp - bounds.start) / (bounds.end - bounds.start);
      this.scrubber.style.left = `${percent * 100}%`;
    }
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
    this.container.style.display = this.isVisible ? 'flex' : 'none';
  }

  public update(): void {
    this.render();
  }
}
