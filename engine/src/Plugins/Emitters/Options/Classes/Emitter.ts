import type { IEmitter } from "../Interfaces/IEmitter";
import type { RecursivePartial } from "../../../../Types";
import type { ICoordinates } from "../../../../Core/Interfaces";
import { MoveDirection, MoveDirectionAlt } from "../../../../Enums";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import { EmitterRate } from "./EmitterRate";
import { EmitterLife } from "./EmitterLife";
import { deepExtend } from "../../../../Utils";
import { EmitterSize } from "./EmitterSize";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import { AnimatableColor } from "../../../../Options/Classes/AnimatableColor";
import { EmitterShapeType } from "../../Enums/EmitterShapeType";

/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay;
    size?: EmitterSize;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    fill;
    life;
    name?: string;
    particles?: RecursivePartial<IParticles>;
    position?: RecursivePartial<ICoordinates>;
    rate;
    shape: EmitterShapeType | keyof typeof EmitterShapeType;
    spawnColor?: AnimatableColor;

    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
        this.shape = EmitterShapeType.square;
    }

    load(data?: RecursivePartial<IEmitter>): void {
        if (data === undefined) {
            return;
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }

        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new EmitterSize();
            }

            this.size.load(data.size);
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        if (data.fill !== undefined) {
            this.fill = data.fill;
        }

        this.life.load(data.life);

        this.name = data.name;

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        this.rate.load(data.rate);

        if (data.shape !== undefined) {
            this.shape = data.shape;
        }

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }

        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor();
            }

            this.spawnColor.load(data.spawnColor);
        }
    }
}
