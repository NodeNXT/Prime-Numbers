const Factor = require('./Factor'),
    fs = require('fs');

var uncomposed = {
    "4": [new Factor(2), new Factor(2)]
};

function firstFactors(number) {
    var factors = [new Factor(number)];

    function decompose(cb, COUNT) {

        let f = factors;
        f.forEach((factor, key) => {
            if (number == 16) {
                console.log(COUNT, factor.number);
            }
            if (uncomposed[factor.number] != undefined) {
                factors.splice(key, 1);
                factors = factors.concat(uncomposed[factor.number]);
            }
        });
        // factors = f;
        // console.log(factors);

        factors.forEach((factor, key) => {

            let decomposed = factor.decompose();

            if (decomposed.length == 2) {
                factors.splice(key, 1);
                factors.push(decomposed[0], decomposed[1]);

                decompose(cb, COUNT++);
            }

        });

        cb();
    }

    decompose(() => {
        uncomposed[number] = factors;
    }, 0);
    return factors;
}
let factors = {};
for (let i = 0; i <= 20; i++) {
    if (i % 100 == 0) {
        console.log(i);
    }
    let Nfactors = firstFactors(i);
    let list = [];

    let c = 0;
    Nfactors.forEach(factor => {
        list.push(factor.number);
        c++;
    });
    factors[i] = list;
}

fs.writeFile('./factors.json', JSON.stringify(factors), (err) => {
    if (err) {
        throw err;
    }
});