import type { AnomalyState } from './AnomalyState';
import type { AnomalyInvestigationConsequences } from './AnomalyInvestigationConsequences';

export interface AnomalyDefinition {
    id: string;
    name: string;
    description: string;
    requiredStoryFlag: string;
    worldReaction: string;
    state: AnomalyState;
    investigationConsequences: AnomalyInvestigationConsequences;
}