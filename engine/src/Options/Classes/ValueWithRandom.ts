import type { IOptionLoader, IValueWithRandom } from "../Interfaces";
import type { RangeValue, RecursivePartial } from "../../Types";
import { setRangeValue } from "../../Utils";

export abstract class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    value: RangeValue;

    protected constructor() {
        this.value = 0;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (!data) {
            return;
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
