import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";

export class WobbleOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: unknown;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("wobble", "Wobble");
        this.options = this.group.data as unknown;

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
