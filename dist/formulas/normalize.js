"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const mathjs_1 = require("mathjs");
const clone_1 = require("../helpers/clone");
class NormalizeHelper {
    constructor() {
        this.cloneHelper = new clone_1.CloneHelper();
    }
    standard(min, max, target) {
        return mathjs_1.chain(target)
            .subtract(min)
            .divide(math
            .chain(max)
            .subtract(min)
            .done())
            .done();
    }
    extended(min, max, target) {
        return mathjs_1.chain(2)
            .multiply(this.standard(min, max, target))
            .subtract(1)
            .done();
    }
    normalizeObject(target, minMax) {
        const normalized = {};
        Object.keys(target).forEach(key => {
            const value = lodash_1.get(target, key);
            const min = lodash_1.get(minMax, key).min;
            const max = lodash_1.get(minMax, key).max;
            const normalize = min < 0 ? this.extended : this.standard;
            lodash_1.set(normalized, key, normalize.call(this, min, max, value));
        });
        return normalized;
    }
    normalizeArray(target, minMax) {
        const denormalized = [];
        target.forEach((value, index) => {
            const min = minMax[index][0];
            const max = minMax[index][1];
            const denormalize = min < 0 ? this.extended : this.standard;
            denormalized[index] = denormalize.call(this, min, max, value);
        });
        return denormalized;
    }
    getNormalizedVector(vector) {
        const module = this.getVectorsModule(vector);
        return this
            .cloneHelper
            .deepClone(vector)
            .map((clone) => clone.map(val => mathjs_1.chain(val).divide(module).done()));
    }
    getVectorsModule(vector) {
        return vector.reduce((total, val) => total.add(mathjs_1.chain(val).pow(2)), mathjs_1.chain(0)).sqrt().done();
    }
}
exports.NormalizeHelper = NormalizeHelper;
//# sourceMappingURL=normalize.js.map