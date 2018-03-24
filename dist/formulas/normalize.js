"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const math = require("mathjs");
class Normalize {
    constructor() {
        this._round = 10;
    }
    standard(min, max, target) {
        return math
            .chain(target)
            .subtract(min)
            .divide(math
            .chain(max)
            .subtract(min)
            .done())
            .done();
    }
    extended(min, max, target) {
        return math
            .chain(2)
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
}
exports.default = Normalize;
//# sourceMappingURL=normalize.js.map