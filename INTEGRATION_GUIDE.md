# ChronoCode - Quick Integration Guide

## 🎯 Goal: Connect TimeCraft + MultiCraft to ChronoCode

This guide shows you exactly what to modify in ChronoCode's code to integrate the new features.

---

## Step 1: Add New Dependencies (2 min)

```bash
cd ~/chronocode
npm install
```

No new dependencies needed - everything uses existing packages!

---

## Step 2: Integrate TimeCraft (30 min)

### 2.1: Find ChronoCode's Event Handler

Look for where ChronoCode receives tool calls. It's likely in:
- `src/main.ts` or `src/app.ts`
- `server/index.ts`

Search for WebSocket message handling or tool call processing.

### 2.2: Add TimeCraft Recording

```typescript
// At the top of the file
import { timecraft } from './timecraft/engine';
import { TimelineUI } from './timecraft/ui';

// After WebSocket connection is established
const timelineUI = new TimelineUI('app', (timestamp) => {
  // When user scrubs timeline, replay to that point
  const events = timecraft.jumpToTime(timestamp);
  replayEvents(events);
});

// When a tool is called (find existing code that handles this)
function onToolCall(tool: string, args: any, result: any) {
  // Record to timeline
  timecraft.recordEvent({
    type: 'tool_call',
    sessionId: currentSessionId,
    data: {
      tool,
      args,
      result,
      station: getStationForTool(tool),
    },
  });
  
  // Update timeline UI
  timelineUI.update();
  
  // ... existing ChronoCode code ...
}

// Add replay function
function replayEvents(events: TimelineEvent[]) {
  // Clear scene
  // For each event, animate Claude moving to station
  events.forEach(event => {
    if (event.data.station) {
      // Use existing ChronoCode animation code
      moveClaudeToStation(event.data.station);
    }
  });
}
```

### 2.3: Add Timeline HTML Container

In `index.html`, add before closing `</body>`:

```html
<div id="timeline-container"></div>
```

Then update TimelineUI constructor:

```typescript
const timelineUI = new TimelineUI('timeline-container', (timestamp) => {
  const events = timecraft.jumpToTime(timestamp);
  replayEvents(events);
});
```

---

## Step 3: Integrate MultiCraft (30 min)

### 3.1: Add WebSocket Multiplayer to Server

In `server/index.ts`:

```typescript
import { multicraft } from '../src/multicraft/engine';
import { MultiCraftUI } from '../src/multicraft/ui';

// Store connected clients
const clients = new Map<string, WebSocket>();

// Handle multiplayer messages
wss.on('connection', (ws) => {
  let userId: string | null = null;
  let roomId: string | null = null;
  
  ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());
    
    switch (msg.type) {
      case 'multicraft:create_room':
        userId = crypto.randomUUID();
        const room = multicraft.createRoom(msg.roomName, userId);
        roomId = room.id;
        multicraft.joinRoom(roomId, userId, msg.userName);
        clients.set(userId, ws);
        ws.send(JSON.stringify({ type: 'room_created', room }));
        break;
        
      case 'multicraft:join_room':
        userId = crypto.randomUUID();
        roomId = msg.roomId;
        const user = multicraft.joinRoom(roomId, userId, msg.userName);
        clients.set(userId, ws);
        
        // Broadcast to room
        broadcastToRoom(roomId, {
          type: 'user_joined',
          user,
        });
        break;
        
      case 'multicraft:update_position':
        if (userId && roomId) {
          multicraft.updateUserPosition(roomId, userId, msg.position, msg.lookAt);
          
          // Broadcast to room
          broadcastToRoom(roomId, {
            type: 'user_moved',
            userId,
            position: msg.position,
            lookAt: msg.lookAt,
          });
        }
        break;
        
      case 'tool_call':
        // Existing ChronoCode tool call handling
        // Also broadcast to room if in multiplayer
        if (roomId) {
          broadcastToRoom(roomId, {
            type: 'remote_tool_call',
            userId,
            tool: msg.tool,
            args: msg.args,
          });
        }
        break;
    }
  });
  
  ws.on('close', () => {
    if (userId && roomId) {
      multicraft.leaveRoom(roomId, userId);
      clients.delete(userId);
      
      broadcastToRoom(roomId, {
        type: 'user_left',
        userId,
      });
    }
  });
});

function broadcastToRoom(roomId: string, message: any) {
  const users = multicraft.getRoomUsers(roomId);
  users.forEach(user => {
    const ws = clients.get(user.id);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}
```

### 3.2: Add MultiCraft UI to Client

In `src/main.ts` or wherever the 3D scene is initialized:

```typescript
import { MultiCraftUI } from './multicraft/ui';

// After scene is created
const multicraftUI = new MultiCraftUI('app');

// Listen for remote users
ws.on('message', (data) => {
  const msg = JSON.parse(data);
  
  switch (msg.type) {
    case 'user_joined':
      // Create a new Claude character with user's color
      createRemoteClaude(msg.user);
      multicraftUI.update();
      break;
      
    case 'user_moved':
      // Update remote Claude's position
      updateRemoteClaude(msg.userId, msg.position);
      break;
      
    case 'remote_tool_call':
      // Animate remote Claude using tool
      animateRemoteClaude(msg.userId, msg.tool);
      break;
      
    case 'user_left':
      // Remove remote Claude
      removeRemoteClaude(msg.userId);
      multicraftUI.update();
      break;
  }
});

// Create remote Claude character
function createRemoteClaude(user: User) {
  // Clone existing Claude model
  const remoteClaude = claude.clone();
  remoteClaude.material = new THREE.MeshStandardMaterial({
    color: user.color,
  });
  remoteClaude.userData.userId = user.id;
  scene.add(remoteClaude);
}
```

### 3.3: Add MultiCraft HTML Container

In `index.html`, add:

```html
<div id="multicraft-container"></div>
```

---

## Step 4: Test Integration (15 min)

### 4.1: Test TimeCraft

```bash
npm run dev
```

1. Open http://localhost:4002
2. Start Claude Code in tmux
3. Make Claude do some tasks
4. Press `T` to show timeline
5. Drag scrubber - Claude should replay actions

### 4.2: Test MultiCraft

1. Open http://localhost:4002 in two browser windows
2. Press `M` in first window
3. Create a room
4. Press `M` in second window
5. Join the room
6. You should see two Claudes (different colors)

---

## Step 5: Quick Fixes for Common Issues

### Timeline not showing?

Check:
- Is `timeline-container` div in HTML?
- Is TimelineUI imported and initialized?
- Are events being recorded? (Add `console.log` in `recordEvent`)

### Multiplayer not working?

Check:
- Is WebSocket server running?
- Are messages being sent? (Check browser console)
- Is `multicraft-container` div in HTML?

### ChronoCode features broken?

- Make sure you didn't modify existing ChronoCode code
- Only ADD new code, don't change existing
- Test ChronoCode features one by one

---

## Step 6: Polish (15 min)

### Add Keyboard Shortcuts

Already included in UI components:
- `T` - Toggle timeline
- `M` - Toggle multiplayer
- `Space` - Play/pause replay
- `←/→` - Step through timeline

### Style Adjustments

If UI looks off, adjust in:
- `src/timecraft/ui.ts` - Timeline styles
- `src/multicraft/ui.ts` - Multiplayer panel styles

---

## 🎯 Minimal Working Version

If you're short on time, focus on:

1. **TimeCraft basics** (1 hour)
   - Record events
   - Show timeline
   - Basic scrubbing (no replay animation)

2. **MultiCraft basics** (1 hour)
   - Create/join rooms
   - Show user list
   - Don't worry about 3D avatars yet

This gives you a working demo even if not fully polished.

---

## 🚀 You're Ready to Integrate!

The engines are built. Just need to:
1. Find where ChronoCode handles tool calls
2. Add `timecraft.recordEvent()` there
3. Add WebSocket multiplayer handling
4. Initialize the UI components

**Total time: 2-3 hours**

Good luck! 🎉
