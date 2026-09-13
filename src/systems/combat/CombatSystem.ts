import type { CombatStats } from '../../types/combat/CombatStats';
import type { DamageResult } from '../../types/combat/DamageResult';

export class CombatSystem {
    public calculateDamage(
        attacker: CombatStats,
        defender: CombatStats,
    ): DamageResult {
        const damage = Math.max(
            1,
            attacker.attack - defender.defense,
        );

        return {
            damage,
            isCritical: false,
        };
    }
}