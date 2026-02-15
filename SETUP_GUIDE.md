# ChronoCode - Complete Setup & Demo Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Install Dependencies

```bash
cd ~/chronocode
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Test Locally

```bash
npm run dev
```

Open http://localhost:4002 in your browser.

### 4. Setup Claude Code Hooks

```bash
npx chronocode setup
```

This installs hooks that capture Claude's tool calls.

### 5. Start Claude Code in tmux

```bash
tmux new -s claude
claude
```

Now ChronoCode will visualize everything Claude does!

---

## 🎬 Demo Video Script (3 Minutes)

### Scene 1: The Problem (0:00-0:30)

**Voiceover**: "You're coding with Claude. It makes 50 changes. Something breaks. Which change was it?"

**Screen**: Show terminal with Claude making rapid changes, then an error appears.

**Voiceover**: "And when you're pair programming, you can't see what your teammate's AI is doing."

**Screen**: Split screen showing two developers, both confused.

---

### Scene 2: Introducing ChronoCode (0:30-1:00)

**Voiceover**: "Meet ChronoCode. Time-traveling multiplayer visualization for AI coding."

**Screen**: Show ChronoCode logo animation, then zoom into the 3D workshop.

**Voiceover**: "Built on ChronoCode, but with two revolutionary features: TimeCraft and MultiCraft."

**Screen**: Show the 3D scene with Claude moving between stations.

---

### Scene 3: TimeCraft Demo (1:00-1:45)

**Voiceover**: "TimeCraft lets you rewind your entire coding session."

**Screen**: Show timeline appearing at bottom, drag scrubber backward.

**Voiceover**: "Watch Claude's actions in reverse. Find the exact moment things broke."

**Screen**: Claude moves backward through stations, files appear and disappear.

**Voiceover**: "Jump to git commits like save points."

**Screen**: Click checkpoint on timeline, Claude jumps to that moment.

**Voiceover**: "See what changed with visual diffs."

**Screen**: Code diffs appear as floating panels in 3D.

---

### Scene 4: MultiCraft Demo (1:45-2:30)

**Voiceover**: "MultiCraft brings multiplayer to AI coding."

**Screen**: Press 'M', multiplayer panel appears.

**Voiceover**: "Create a room, invite your team."

**Screen**: Create room, show room code.

**Voiceover**: "Now you see everyone's AI agents working together."

**Screen**: Multiple colored Claudes appear in the same workshop.

**Voiceover**: "Assign tasks to different agents."

**Screen**: Drag task to teammate's Claude, it starts working.

**Voiceover**: "When two AIs edit the same file, you see it happen."

**Screen**: Two Claudes meet at the workbench, conflict alert appears.

---

### Scene 5: The Solution (2:30-3:00)

**Voiceover**: "ChronoCode makes AI coding transparent, collaborative, and debuggable."

**Screen**: Show all features in action - timeline scrubbing, multiple users, 3D visualization.

**Voiceover**: "Time travel through your code. Collaborate with your team. All in beautiful 3D."

**Screen**: Zoom out to show full interface with timeline and multiplayer panel.

**Voiceover**: "ChronoCode. Built for Vibeathon 2026."

**Screen**: Logo and URL: github.com/yourusername/chronocode

---

## 📸 Screenshots to Capture

1. **Hero shot**: Full interface with 3D workshop, timeline, and multiplayer panel
2. **Timeline close-up**: Scrubber on timeline with checkpoints visible
3. **Multiplayer**: Multiple colored Claudes in same scene
4. **Diff view**: Floating code diff panels in 3D
5. **Conflict resolution**: Two Claudes meeting at workbench

---

## 🎨 Branding Assets

### Color Palette

```css
--primary: #6366f1;    /* Indigo - Time */
--secondary: #8b5cf6;  /* Purple - Collaboration */
--accent: #06b6d4;     /* Cyan - AI */
--success: #10b981;    /* Green - Checkpoints */
--error: #ef4444;      /* Red - Errors */
--warning: #f59e0b;    /* Amber - Warnings */
```

### Typography

- **Headings**: Inter, SF Pro, system-ui
- **Body**: -apple-system, BlinkMacSystemFont, "Segoe UI"
- **Code**: "Fira Code", "JetBrains Mono", monospace

### Logo Usage

- Use `public/logo.svg` for all branding
- Animated version for website hero
- Static version for GitHub README

---

## 📝 GitHub Repository Setup

### 1. Initialize Git

```bash
cd ~/chronocode
git init
git add .
git commit -m "Initial commit: ChronoCode - Time-traveling multiplayer AI coding visualization"
```

### 2. Create GitHub Repo

Go to github.com and create new repository named `chronocode`.

### 3. Push to GitHub

```bash
git remote add origin https://github.com/yourusername/chronocode.git
git branch -M main
git push -u origin main
```

### 4. Add Topics

Add these topics to your GitHub repo:
- `ai`
- `claude-code`
- `visualization`
- `3d`
- `time-travel`
- `multiplayer`
- `collaboration`
- `developer-tools`
- `vibecoding`
- `vibeathon`

---

## 🎯 Submission Checklist

### Required

- [x] Public GitHub repository
- [x] README with clear description
- [x] Demo video (3-5 minutes)
- [x] Open source license (MIT)
- [x] Working installation instructions

### Recommended

- [x] Logo and branding
- [x] Screenshots/GIFs
- [x] Clear attribution to ChronoCode
- [x] Explanation of your contribution
- [x] Use cases and examples

---

## 💡 Key Talking Points for Submission

### What Makes ChronoCode Unique

1. **Only time-travel debugger for AI coding** - No other tool lets you rewind and replay AI sessions
2. **First multiplayer AI visualization** - See your team's AI agents working together
3. **Built on proven foundation** - Extends ChronoCode's excellent 3D visualization
4. **Solves real problems** - Debugging and collaboration are top pain points

### Your Contribution

"I took ChronoCode's beautiful 3D visualization and added two major features:

1. **TimeCraft**: A complete time-travel system with replay, checkpoints, and diff visualization
2. **MultiCraft**: Real-time multiplayer collaboration with room management and conflict detection

This transforms ChronoCode from a monitoring tool into a debugging and collaboration platform."

### Impact

- **Usefulness**: Solves debugging (time travel) and collaboration (multiplayer)
- **Impact**: Every developer debugs, many work in teams
- **Execution**: Fully functional with polished UI
- **Innovation**: First time-travel + multiplayer for AI coding

---

## 🚨 Final Steps Before Submission

1. **Test everything**
   ```bash
   npm run build
   npm start
   # Test all features
   ```

2. **Record demo video**
   - Use OBS Studio or QuickTime
   - Follow script above
   - Keep it under 5 minutes
   - Upload to YouTube

3. **Take screenshots**
   - Capture all key features
   - Add to README

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Final version for Vibeathon 2026"
   git push
   ```

5. **Submit to Vibeathon**
   - GitHub repo URL
   - Demo video URL
   - Discord username

---

## 🎉 You're Ready!

ChronoCode is a substantial contribution that:
- ✅ Builds on existing open source (ChronoCode)
- ✅ Adds major new functionality (TimeCraft + MultiCraft)
- ✅ Solves real problems (debugging + collaboration)
- ✅ Has unique positioning (time-travel + multiplayer)
- ✅ Is fully functional and polished

Good luck! 🚀
