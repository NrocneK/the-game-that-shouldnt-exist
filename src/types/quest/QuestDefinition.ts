export interface QuestObjective {
    type: 'defeat_enemy';
    targetId: string;
    requiredCount: number;
}

export interface QuestReward {
    experience?: number;
}

export interface QuestDefinition {
    id: string;
    title: string;
    description: string;
    objective: QuestObjective;
    reward: QuestReward;
}