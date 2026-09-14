import type { ProgressionState } from '../../types/progression/ProgressionState';

export class ProgressionSystem {
    public addExperience(
        state: ProgressionState,
        amount: number,
    ): boolean {
        const experience = Math.max(0, amount);

        state.experience += experience;

        let leveledUp = false;

        while (
            state.experience >=
            state.experienceToNextLevel
        ) {
            this.levelUp(state);
            leveledUp = true;
        }

        return leveledUp;
    }

    private levelUp(
        state: ProgressionState,
    ): void {
        state.level += 1;

        state.experience -=
            state.experienceToNextLevel;

        state.experienceToNextLevel =
            this.getExperienceRequirement(
                state.level,
            );

        state.stats.maxHp +=
            state.statGrowth.maxHp;

        state.stats.attack +=
            state.statGrowth.attack;

        state.stats.defense +=
            state.statGrowth.defense;
    }

    private getExperienceRequirement(
        level: number,
    ): number {
        return level * 100;
    }
}