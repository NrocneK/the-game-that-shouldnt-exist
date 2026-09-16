export type QuestStatus =
    | 'available'
    | 'active'
    | 'ready'
    | 'completed';

export interface QuestState {
    questId: string;
    status: QuestStatus;
    objectiveProgress: number;
}