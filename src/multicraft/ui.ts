// Multiplayer UI Component for MultiCraft
// Shows other users' avatars and presence

import { multicraft, User } from './engine';

export class MultiCraftUI {
  private container: HTMLElement;
  private roomId: string | null = null;
  private userId: string | null = null;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) || document.body;
    this.createUI();
  }

  private createUI(): void {
    const html = `
      <div class="multicraft-container" style="
        position: fixed;
        top: 20px;
        right: 20px;
        width: 250px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px;
        z-index: 1000;
        display: none;
      ">
        <div class="multicraft-header" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        ">
          <div style="color: #fff; font-size: 14px; font-weight: 600;">
            👥 MultiCraft
          </div>
          <button class="multicraft-close" style="
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 18px;
          ">×</button>
        </div>
        
        <div class="multicraft-lobby" style="display: block;">
          <input type="text" class="room-name-input" placeholder="Room name" style="
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: #fff;
          ">
          <button class="create-room-btn" style="
            width: 100%;
            padding: 10px;
            background: #6366f1;
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            margin-bottom: 10px;
          ">Create Room</button>
          
          <div style="color: #888; font-size: 12px; margin: 15px 0 10px;">Or join existing:</div>
          <div class="room-list" style="
            max-height: 200px;
            overflow-y: auto;
          "></div>
        </div>
        
        <div class="multicraft-room" style="display: none;">
          <div class="room-info" style="
            background: rgba(99, 102, 241, 0.2);
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
          ">
            <div class="room-name" style="color: #fff; font-weight: 600; margin-bottom: 5px;"></div>
            <div class="room-code" style="color: #888; font-size: 12px;"></div>
          </div>
          
          <div style="color: #888; font-size: 12px; margin-bottom: 10px;">Active Users:</div>
          <div class="user-list"></div>
          
          <button class="leave-room-btn" style="
            width: 100%;
            padding: 8px;
            background: rgba(239, 68, 68, 0.8);
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            margin-top: 15px;
          ">Leave Room</button>
        </div>
      </div>
    `;
    
    this.container.innerHTML += html;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    
    // Close button
    container.querySelector('.multicraft-close')?.addEventListener('click', () => {
      this.hide();
    });
    
    // Create room
    container.querySelector('.create-room-btn')?.addEventListener('click', () => {
      const input = container.querySelector('.room-name-input') as HTMLInputElement;
      const roomName = input.value.trim() || 'Untitled Room';
      this.createRoom(roomName);
    });
    
    // Leave room
    container.querySelector('.leave-room-btn')?.addEventListener('click', () => {
      this.leaveRoom();
    });
    
    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if (e.key === 'M' || e.key === 'm') {
        this.toggle();
      }
    });
  }

  private createRoom(name: string): void {
    this.userId = crypto.randomUUID();
    const room = multicraft.createRoom(name, this.userId);
    this.roomId = room.id;
    
    const user = multicraft.joinRoom(room.id, this.userId, 'You');
    if (user) {
      this.showRoom();
      this.updateRoomInfo();
    }
  }

  private joinRoom(roomId: string): void {
    this.userId = crypto.randomUUID();
    this.roomId = roomId;
    
    const user = multicraft.joinRoom(roomId, this.userId, 'You');
    if (user) {
      this.showRoom();
      this.updateRoomInfo();
    }
  }

  private leaveRoom(): void {
    if (this.roomId && this.userId) {
      multicraft.leaveRoom(this.roomId, this.userId);
      this.roomId = null;
      this.userId = null;
      this.showLobby();
    }
  }

  private showLobby(): void {
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    container.querySelector('.multicraft-lobby')!.setAttribute('style', 'display: block;');
    container.querySelector('.multicraft-room')!.setAttribute('style', 'display: none;');
    this.updateRoomList();
  }

  private showRoom(): void {
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    container.querySelector('.multicraft-lobby')!.setAttribute('style', 'display: none;');
    container.querySelector('.multicraft-room')!.setAttribute('style', 'display: block;');
  }

  private updateRoomList(): void {
    const roomList = this.container.querySelector('.room-list') as HTMLElement;
    const rooms = multicraft.getRoomList();
    
    roomList.innerHTML = rooms.map(room => `
      <div class="room-item" data-room-id="${room.id}" style="
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: background 0.2s;
      ">
        <div style="color: #fff; font-weight: 600; margin-bottom: 4px;">${room.name}</div>
        <div style="color: #888; font-size: 12px;">${room.users}/${room.maxUsers} users</div>
      </div>
    `).join('');
    
    // Add click handlers
    roomList.querySelectorAll('.room-item').forEach(item => {
      item.addEventListener('click', () => {
        const roomId = (item as HTMLElement).dataset.roomId!;
        this.joinRoom(roomId);
      });
    });
  }

  private updateRoomInfo(): void {
    if (!this.roomId) return;
    
    const room = multicraft.getRoom(this.roomId);
    if (!room) return;
    
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    
    // Update room info
    container.querySelector('.room-name')!.textContent = room.name;
    container.querySelector('.room-code')!.textContent = `Room ID: ${room.id.slice(0, 8)}`;
    
    // Update user list
    const users = multicraft.getRoomUsers(this.roomId);
    const userList = container.querySelector('.user-list') as HTMLElement;
    
    userList.innerHTML = users.map(user => `
      <div class="user-item" style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        margin-bottom: 6px;
      ">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${user.color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 12px;
        ">${user.avatar}</div>
        <div style="flex: 1;">
          <div style="color: #fff; font-size: 14px;">${user.name}</div>
          <div style="color: #888; font-size: 11px;">${user.isActive ? '🟢 Active' : '⚫ Idle'}</div>
        </div>
      </div>
    `).join('');
  }

  public show(): void {
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    container.style.display = 'block';
    this.updateRoomList();
  }

  public hide(): void {
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    container.style.display = 'none';
  }

  public toggle(): void {
    const container = this.container.querySelector('.multicraft-container') as HTMLElement;
    if (container.style.display === 'none') {
      this.show();
    } else {
      this.hide();
    }
  }

  public update(): void {
    if (this.roomId) {
      this.updateRoomInfo();
    }
  }
}
