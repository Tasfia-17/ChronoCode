// MultiCraft - Multiplayer Collaboration Engine
// Enables multiple users to see each other's AI agents in real-time

export interface User {
  id: string;
  name: string;
  color: string;
  avatar: string;
  sessionId: string;
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  isActive: boolean;
  lastSeen: number;
}

export interface Room {
  id: string;
  name: string;
  host: string;
  users: Map<string, User>;
  createdAt: number;
  maxUsers: number;
}

export interface MultiCraftMessage {
  type: 'join' | 'leave' | 'move' | 'tool_call' | 'chat' | 'task_assign';
  userId: string;
  roomId: string;
  timestamp: number;
  data: any;
}

export class MultiCraftEngine {
  private rooms: Map<string, Room> = new Map();
  private userColors = [
    '#ef4444', // red
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];
  private colorIndex = 0;

  // Create a new room
  createRoom(name: string, hostId: string, maxUsers: number = 8): Room {
    const room: Room = {
      id: crypto.randomUUID(),
      name,
      host: hostId,
      users: new Map(),
      createdAt: Date.now(),
      maxUsers,
    };
    
    this.rooms.set(room.id, room);
    return room;
  }

  // Join a room
  joinRoom(roomId: string, userId: string, userName: string): User | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    if (room.users.size >= room.maxUsers) return null;
    
    const user: User = {
      id: userId,
      name: userName,
      color: this.getNextColor(),
      avatar: this.generateAvatar(userName),
      sessionId: crypto.randomUUID(),
      position: { x: 0, y: 0, z: 0 },
      lookAt: { x: 0, y: 0, z: 0 },
      isActive: true,
      lastSeen: Date.now(),
    };
    
    room.users.set(userId, user);
    return user;
  }

  // Leave a room
  leaveRoom(roomId: string, userId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    room.users.delete(userId);
    
    // Delete room if empty
    if (room.users.size === 0) {
      this.rooms.delete(roomId);
    }
  }

  // Update user position
  updateUserPosition(
    roomId: string,
    userId: string,
    position: { x: number; y: number; z: number },
    lookAt: { x: number; y: number; z: number }
  ): void {
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    const user = room.users.get(userId);
    if (!user) return;
    
    user.position = position;
    user.lookAt = lookAt;
    user.lastSeen = Date.now();
  }

  // Get room
  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  // Get all users in room
  getRoomUsers(roomId: string): User[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    return Array.from(room.users.values());
  }

  // Broadcast message to room
  broadcastToRoom(roomId: string, message: MultiCraftMessage): void {
    // This will be handled by WebSocket server
    // Just a placeholder for the interface
  }

  // Get next color for user
  private getNextColor(): string {
    const color = this.userColors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % this.userColors.length;
    return color;
  }

  // Generate avatar initials
  private generateAvatar(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // Clean up inactive users
  cleanupInactiveUsers(timeoutMs: number = 30000): void {
    const now = Date.now();
    
    this.rooms.forEach(room => {
      room.users.forEach((user, userId) => {
        if (now - user.lastSeen > timeoutMs) {
          user.isActive = false;
          room.users.delete(userId);
        }
      });
      
      // Delete empty rooms
      if (room.users.size === 0) {
        this.rooms.delete(room.id);
      }
    });
  }

  // Get room list
  getRoomList(): Array<{ id: string; name: string; users: number; maxUsers: number }> {
    return Array.from(this.rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      users: room.users.size,
      maxUsers: room.maxUsers,
    }));
  }
}

// Singleton instance
export const multicraft = new MultiCraftEngine();
