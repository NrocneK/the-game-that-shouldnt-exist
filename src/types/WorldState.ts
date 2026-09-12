export interface WorldState {
    currentArea: string;
  
    storyFlags: Record<string, boolean>;
  
    questStates: Record<string, string>;
  
    npcStates: Record<string, string>;
  }