import type { CombatStats } from '../../types/combat/CombatStats';
import type { DamageResult } from '../../types/combat/DamageResult';
import type { AttackTarget } from '../../types/combat/AttackTarget';

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

    public attack(
        attacker: CombatStats,
        target: AttackTarget,
    ): DamageResult {
        if (target.isDefeated()) {
            return {
                damage: 0,
                isCritical: false,
            };
        }

        const result = this.calculateDamage(
            attacker,
            target.getCombatStats(),
        );

        target.takeDamage(result.damage);

        return result;
    }
}