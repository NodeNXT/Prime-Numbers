class Factor {

    constructor(number) {
        this.number = number;
        this.first = undefined;
    }

    decompose() {
        if (!this.isFirst()) {
            var factors = [];

            for (let i = 2; i <= Math.floor(this.number / 2); i++) {
                if (this.number % i == 0) {

                    factors.push(new Factor(i), new Factor(this.number / i));

                    break;
                }
            }

            return factors;
        }

        return [this.number];
    }

    isFirst() {
        if (this.first == undefined) {
            for (let i = 2; i <= Math.floor(this.number / 2); i++) {
                if (this.number % i == 0) {
                    return false;
                }
            }

            return true;
        }

        return this.first;
    }

}

module.exports = Factor;