/**
 * ChronoCode Integration Layer
 * 
 * This file integrates TimeCraft and MultiCraft with Vibecraft
 * Add this import to main.ts: import './chronocode-integration'
 */

import { timecraft } from './timecraft/engine'
import { TimelineUI } from './timecraft/ui'
import { multicraft } from './multicraft/engine'
import { MultiCraftUI } from './multicraft/ui'
import { eventBus } from './events/EventBus'

// Initialize ChronoCode features
export function initializeChronoCode() {
  console.log('🚀 Initializing ChronoCode...')
  
  // Initialize TimeCraft
  const timelineUI = new TimelineUI('app', (timestamp) => {
    console.log('⏰ Seeking to timestamp:', timestamp)
    const events = timecraft.jumpToTime(timestamp)
    // TODO: Replay events in 3D scene
    console.log(`📼 Replaying ${events.length} events`)
  })
  
  // Initialize MultiCraft
  const multicraftUI = new MultiCraftUI('app')
  
  // Hook into event system
  eventBus.on('pre_tool_use', (context: any) => {
    // Record tool call to timeline
    timecraft.recordEvent({
      type: 'tool_call',
      sessionId: context.sessionId || 'default',
      data: {
        tool: context.tool || 'unknown',
        args: context.args || {},
        station: getStationForTool(context.tool || ''),
      },
    })
    
    timelineUI.update()
  })
  
  eventBus.on('post_tool_use', (context: any) => {
    // Record tool result
    timecraft.recordEvent({
      type: 'response',
      sessionId: context.sessionId || 'default',
      data: {
        tool: context.tool || 'unknown',
        result: context.result,
      },
    })
    
    timelineUI.update()
  })
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // T - Toggle timeline
    if (e.key === 'T' || e.key === 't') {
      timelineUI.toggle()
    }
    
    // M - Toggle multiplayer
    if (e.key === 'M' || e.key === 'm') {
      multicraftUI.toggle()
    }
  })
  
  console.log('✅ ChronoCode initialized!')
  console.log('  ⏰ Press T to toggle timeline')
  console.log('  👥 Press M to toggle multiplayer')
  
  return { timelineUI, multicraftUI }
}

// Map tools to stations (from Vibecraft)
function getStationForTool(tool: string): string {
  const toolStationMap: Record<string, string> = {
    read_file: 'bookshelf',
    write_file: 'desk',
    edit_file: 'workbench',
    execute_bash: 'terminal',
    grep: 'scanner',
    glob: 'scanner',
    web_fetch: 'antenna',
    web_search: 'antenna',
    use_subagent: 'portal',
    todo_write: 'taskboard',
  }
  
  return toolStationMap[tool] || 'center'
}

// Auto-initialize when imported
// Comment this out if you want manual initialization
// initializeChronoCode()
