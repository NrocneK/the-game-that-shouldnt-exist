export interface PlayerStats {
    maxHp: number;
    attack: number;
    defense: number;
    speed: number;
  }
  
  export interface PlayerState {
    position: {
      x: number;
      y: number;
    };
  
    hp: number;
  
    level: number;
  
    experience: number;
  
    stats: PlayerStats;
  
    inventory: string[];
  
    equipment: {
      weapon: string | null;
      armor: string | null;
      accessory: string | null;
    };
  }