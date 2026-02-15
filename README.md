# ChronoCode ⏳🌐

**Time-traveling multiplayer AI coding visualization**

Revolutionary features for AI-assisted development:
- ⏰ **TimeCraft**: Rewind and replay your entire coding session
- 👥 **MultiCraft**: See your teammates' AI agents working in real-time
- 🎮 **3D Workshop**: Immersive visualization with spatial audio and animations

---

## 🆕 What's New in ChronoCode

### ⏰ TimeCraft - Time Travel Debugging

**The Problem**: You made 50 changes. Something broke. Which change was it?

**The Solution**: Rewind your entire session like a video game.

- **Timeline Scrubber** - Drag to any point in your session history
- **Replay Mode** - Watch Claude's actions in fast-forward or slow-motion
- **Checkpoints** - Git commits appear as save points on the timeline
- **Branch Visualization** - See parallel timelines when you try different approaches
- **Diff View** - See exactly what changed at each moment

**Use Cases**:
- Find the exact change that broke your code
- Review what Claude did while you were away
- Learn from past sessions
- Create time-lapse videos of your project

### 👥 MultiCraft - Multiplayer Collaboration

**The Problem**: Pair programming with AI is invisible to your teammate.

**The Solution**: See everyone's AI agents in the same 3D space.

- **Multiplayer Lobby** - Invite teammates to your session
- **Avatar System** - Each person has their own colored Claude
- **Live Presence** - See where teammates are looking
- **Shared Task Queue** - Drag tasks to different AI agents
- **Conflict Alerts** - When two AIs edit the same file, they meet visually
- **Voice Chat** - Built-in spatial audio communication

**Use Cases**:
- Pair programming with visual feedback
- Coordinate multiple AI agents on complex tasks
- Teaching/mentoring with live AI visualization
- Team debugging sessions

---

## 🎨 Core Features

ChronoCode provides a complete 3D visualization system:

| Station | Tools | Visual |
|---------|-------|--------|
| Bookshelf | Read | Books on shelves |
| Desk | Write | Paper, pencil, ink |
| Workbench | Edit | Wrench, gears |
| Terminal | Bash | Glowing screen |
| Scanner | Grep, Glob | Telescope |
| Antenna | WebFetch, WebSearch | Satellite dish |
| Portal | Task (subagents) | Glowing portal |
| Taskboard | TodoWrite | Sticky notes |

Plus:
- ✨ Floating context labels
- 💭 Thought bubbles
- 🎵 Spatial audio
- 🎨 Animations
- 🎤 Voice input
- 🖌️ Draw mode
- 📊 Station panels

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
brew install jq tmux       # macOS
# sudo apt install jq tmux  # Ubuntu/Debian

# 2. Install ChronoCode
npm install -g chronocode

# 3. Setup hooks (one time)
chronocode setup

# 4. Start server
chronocode
```


## ⏰ Using TimeCraft

### Basic Time Travel

1. **Timeline appears at bottom** of screen showing your session history
2. **Drag the scrubber** to any point in time
3. **Watch Claude replay** its actions from that moment
4. **Click checkpoints** (git commits) to jump instantly

### Keyboard Shortcuts

- `T` - Toggle timeline
- `Space` - Play/Pause replay
- `←/→` - Step backward/forward
- `Shift+←/→` - Jump to previous/next checkpoint
- `R` - Reset to current time
- `[/]` - Slow down / speed up replay

### Advanced Features

**Branch Visualization**: When you have multiple git branches, they appear as parallel timelines. Switch between them to see different approaches.

**Diff Mode**: Press `D` while replaying to see code diffs appear as floating panels in 3D space.

**Export Time-lapse**: Press `E` to export your session as a video.

---

## 👥 Using MultiCraft

### Starting a Multiplayer Session

```bash
# Host creates a room
chronocode --multiplayer --room myteam

# Share the room code with teammates
# They join with:
chronocode --multiplayer --join myteam
```

### Multiplayer Features

**Avatar Colors**: Each person gets a unique color. Their Claude has the same color.

**Live Cursors**: See where teammates are looking in 3D space (glowing orbs).

**Task Assignment**: 
- Right-click any task → "Assign to..."
- Drag tasks to teammate's avatar
- Their Claude automatically receives the prompt

**Conflict Resolution**:
- When two AIs edit the same file, they both move to the Workbench
- A "merge" animation plays
- You see a diff view to resolve conflicts

**Voice Chat**: Press `V` to toggle voice chat. Spatial audio means teammates sound like they're in the 3D space.

---

## 🎯 Use Cases

### Solo Developer
- **Debug with time travel**: Find breaking changes instantly
- **Review AI work**: See what Claude did while you were away
- **Learn patterns**: Replay successful sessions to understand what worked

### Pair Programming
- **Visual coordination**: See your partner's AI working
- **Async collaboration**: Leave tasks for teammates, they see them in 3D
- **Teaching**: Mentor can watch student's AI and provide guidance

### Team Projects
- **Multi-agent orchestration**: Assign different features to different AIs
- **Progress tracking**: See all agents working simultaneously
- **Conflict prevention**: Visual alerts before merge conflicts happen

---

## 🏗️ Architecture

ChronoCode extends Vibecraft with:

```
┌─────────────────────────────────────────────────┐
│           ChronoCode Server                      │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  TimeCraft   │  │  MultiCraft  │            │
│  │   Engine     │  │   Engine     │            │
│  │              │  │              │            │
│  │ - History DB │  │ - WebRTC     │            │
│  │ - Replay     │  │ - Room Mgmt  │            │
│  │ - Checkpoints│  │ - Sync       │            │
│  └──────────────┘  └──────────────┘            │
│           ↓                ↓                     │
│  ┌─────────────────────────────────┐           │
│  │    Vibecraft Core (unchanged)    │           │
│  │  - 3D Scene                      │           │
│  │  - Tool Hooks                    │           │
│  │  - WebSocket                     │           │
│  └─────────────────────────────────┘           │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Logo & Branding

**Logo**: A clock face with orbital rings, multiple AI avatars circling around it, connected by glowing timeline threads.

**Color Scheme**:
- Primary: `#6366f1` (Indigo - represents time)
- Secondary: `#8b5cf6` (Purple - represents collaboration)
- Accent: `#06b6d4` (Cyan - represents AI)

**Mascot**: "Chrono" - A friendly AI character with a clock face and multiple arms (representing parallel timelines)

---

## 📊 Comparison

| Feature | ChronoCode | Jacques | BridgeOS |
|---------|-----------|---------|----------|
| 3D Visualization | ✅ | ❌ | ❌ |
| Time Travel | ✅ | ❌ | ❌ |
| Multiplayer | ✅ | ❌ | ❌ |
| Multi-session | ✅ | ✅ | ✅ |
| Spatial Audio | ✅ | ❌ | ❌ |
| Git Integration | ✅ | ❌ | ❌ |

---

## 🙏 Acknowledgments

ChronoCode's 3D visualization system was inspired by innovative approaches in AI coding tools.

**What ChronoCode adds**:
- ⏰ Complete time-travel system with replay engine
- 👥 Multiplayer collaboration with WebRTC
- 🌳 Git integration with branch visualization
- 📊 Enhanced history tracking and analytics
- 🎬 Session recording and export

**Core features**:
- 🎨 Beautiful 3D visualization
- 🎵 Spatial audio system
- 🎮 Station-based tool mapping
- 🎤 Voice input
- 🖌️ Draw mode

---



---

## 🚀 Built for BridgeMind Vibeathon 2026

ChronoCode demonstrates how AI coding tools can be:
- **Transparent** (see what AI is doing)
- **Collaborative** (work together with teammates)
- **Debuggable** (time-travel to find issues)
- **Delightful** (beautiful 3D visualization)



---

## 🛠️ Development

```bash
npm install
npm run dev
```

**Project Structure**:
```
chronocode/
├── src/
│   ├── timecraft/      # Time travel engine
│   ├── multicraft/     # Multiplayer system
│   ├── scene/          # 3D visualization
│   ├── entities/       # Characters and objects
│   └── events/         # Event system
├── server/
│   └── index.ts        # WebSocket server
└── hooks/              # Claude Code hooks
```

---

**Made with ❤️ for Vibeathon 2026**
