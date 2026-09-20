import type { AnomalyState } from './AnomalyState';

export interface AnomalyDefinition {
    id: string;
    name: string;
    description: string;
    requiredStoryFlag: string;
    worldReaction: string;
    state: AnomalyState;
}