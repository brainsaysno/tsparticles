import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";

export class TiltOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: unknown;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("tilt", "Tilt");
        this.options = this.group.data as unknown;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");
        const particles = this.particles;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group
            .addProperty("direction", "Direction", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: "clockwise",
                },
                {
                    value: "counterClockwise",
                },
                {
                    value: "random",
                },
            ]);

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("random", "Random", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
