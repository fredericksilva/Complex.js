var assert = require("assert");

var Complex = require("../complex.min");

var tests = [{
        set: "foo",
        expect: "Invalid Param"
    }, {
        set: {},
        expect: "Invalid Param"
    }, {
        set: Complex.I,
        fn: "mul",
        param: Complex(Math.PI).exp(),
        expect: "23.140692632779274i"
    }, {
        set: 0,
        expect: "0"
    }, {
        set: "4+3i",
        fn: "add",
        param: "-3-2i",
        expect: "1+i"
    }, {
        set: "3i",
        fn: "add",
        param: "-2i",
        expect: "i"
    }, {
        set: "4",
        fn: "add",
        param: "-3",
        expect: "1"
    }, {
        set: 9,
        fn: "sqrt",
        expect: "3"
    }, {
        set: -9,
        fn: "sqrt",
        expect: "3i"
    }, {
        set: "-36",
        fn: "sqrt",
        expect: "6i"
    }, {
        set: "36i",
        fn: "sqrt",
        expect: "4.242640687119285+4.242640687119285i"
    }, {
        set: "-36i",
        fn: "sqrt",
        expect: "4.242640687119285-4.242640687119285i"
    }, {
        set: "4+2i",
        fn: "div",
        param: "1+i",
        expect: "3-i"
    }, {
        set: "25",
        fn: "div",
        param: "3-4i",
        expect: "3+4i"
    }, {
        set: "3-2i",
        fn: "div",
        param: "i",
        expect: "-2-3i"
    }, {
        set: "4i",
        fn: "mul",
        param: "-5i",
        expect: "20"
    }, {
        set: "3-6i",
        fn: "mul",
        param: "i",
        expect: "6+3i"
    }, {
        set: "3+4i",
        fn: "add",
        param: "5-7i",
        expect: "8-3i"
    }, {
        set: "6i",
        fn: "div",
        param: "3-12i",
        expect: "-0.47058823529411764+0.11764705882352941i"
    }, {
        set: "36+36i",
        fn: "sqrt",
        expect: "6.59210468080686+2.730539163373364i"
    }, {
        set: "36-36i",
        fn: "sqrt",
        expect: "6.59210468080686-2.730539163373364i"
    }, {
        set: "-36+36i",
        fn: "sqrt",
        expect: "2.730539163373364+6.59210468080686i"
    }, {
        set: "-36-36i",
        fn: "sqrt",
        expect: "2.730539163373364-6.59210468080686i"
    }, {
        set: "0",
        fn: "sqrt",
        expect: "0"
    }, {
        set: Math.E,
        fn: "log",
        expect: "1"
    }, {
        set: "i",
        fn: "log",
        expect: (Math.PI / 2) + "i"
    }, {
        set: "3+2i",
        fn: "log",
        expect: Math.log(13) / 2 + "+" + Math.atan2(2, 3) + "i"
    }, {
        set: "3-2i",
        fn: "log",
        expect: Math.log(13) / 2 + "-" + Math.atan2(2, 3) + "i"
    }, {
        set: 1,
        fn: "exp",
        expect: "" + Math.E
    }, {
        set: "i",
        fn: "exp",
        expect: Math.cos(1) + "+" + Math.sin(1) + "i"
    }, {
        set: "3+2i",
        fn: "exp",
        expect: "-8.358532650935372+18.263727040666765i"
    }, {
        set: "3-2i",
        fn: "exp",
        expect: "-8.358532650935372-18.263727040666765i"
    }, {
        set: "3",
        fn: "pow",
        param: "3",
        expect: "27"
    }, {
        set: "3i",
        fn: "pow",
        param: "3i",
        expect: "-0.008876640735623675-0.0013801328997494896i"
    }, {
        set: {r: 3, i: 4},
        fn: "abs",
        expect: "5"
    }, {
        set: "1+4i",
        fn: "mul",
        param: "3+2i",
        expect: "-5+14i"
    }, {
        set: "4+16i",
        fn: "div",
        param: "4.0000",
        expect: "1+4i"
    }, {
        set: {r: -7.1, i: 2.5},
        fn: "negate",
        expect: "7.1-2.5i"
    }, {
        set: {r: 1, i: 1},
        fn: "arg",
        expect: "" + Math.PI / 4
    }, {
        set: {r: -1, i: -1},
        fn: "arg",
        expect: "" + -3 * Math.PI / 4
    }, {
        set: {r: 0, i: 1},
        fn: "arg",
        expect: "" + Math.PI / 2
    }, {
        set: {r: 1, i: 0.5 * Math.sqrt(4 / 3)},
        fn: "arg",
        expect: "" + Math.PI / 6
    }, {
        set: {r: 99, i: 50},
        fn: "conjugate",
        expect: "99-50i"
    }, {
        set: "2+8i",
        fn: "div",
        param: new Complex(1, 2),
        expect: "3.6+0.8i"
    }, {
        set: {r: 1, i: 2},
        fn: "add",
        param: "4+6i",
        expect: "5+8i"
    }, {
        set: {r: 5, i: 8},
        fn: "sub",
        param: "4+6i",
        expect: "1+2i"
    }, {
        set: "1+2i",
        fn: "pow",
        param: "2",
        expect: "-2.999999999999999+4.000000000000001i"
    }, {
        set: "1+2i",
        fn: "pow",
        param: "1+2i",
        expect: "-0.2225171568017727+0.10070913113607542i"
    }, {
        set: {r: 1, i: 2},
        fn: "pow",
        param: new Complex(3, 4),
        expect: "0.129009594074467+0.03392409290517003i"
    }, {
        set: "1+4i",
        fn: "sqrt",
        expect: "1.600485180440241+1.2496210676876531i"
    }, {
        set: {r: -3, i: 4},
        fn: "sqrt",
        expect: "1+2i"
    }, {
        set: {r: 3, i: -4},
        fn: "sqrt",
        expect: "2-i"
    }, {
        set: {r: -3, i: -4},
        fn: "sqrt",
        expect: "1-2i"
    }, {
        set: "4+3i",
        fn: "log",
        expect: "1.6094379124341003+0.6435011087932844i"
    }, {
        set: "4+3i",
        fn: "exp",
        expect: "-54.05175886107815+7.7048913727311525i"
    }, {
        set: {r: 1, i: 2},
        fn: "sin",
        expect: "3.1657785132161678+1.959601041421606i"
    }, {
        set: {r: 1, i: 2},
        fn: "cos",
        expect: "2.0327230070196656-3.0518977991517997i"
    }, {
        set: {r: 1, i: 2},
        fn: "tan",
        expect: "0.0338128260798967+1.0147936161466335i"
    }
];

describe("Complex", function() {

    for (var i = 0; i < tests.length; i++) {

        (function(i) {

            if (tests[i].fn) {

                it((tests[i].fn || "") + "" + tests[i].set, function() {
                    try {
                        assert.equal(tests[i].expect, new Complex(tests[i].set)[tests[i].fn](tests[i].param).toString());
                    } catch (e) {
                        assert.equal(e.toString(), tests[i].expect.toString());
                    }
                });

            } else {

                it((tests[i].fn || "") + "" + tests[i].set, function() {
                    try {
                        assert.equal(tests[i].expect, new Complex(tests[i].set).toString());
                    } catch (e) {
                        assert.equal(e.toString(), tests[i].expect.toString());
                    }
                });
            }

        })(i);
    }
});

describe("Complex Details", function() {

    it("should work with different params", function() {
        assert.equal(Complex(1, -1).toString(), "1-i");
        assert.equal(Complex(0, 0).toString(), "0");
        assert.equal(Complex(0, 2).toString(), "2i");
        assert.equal(Complex("3+4i").toString(), "3+4i");
        assert.equal(Complex("1+i").toString(), "1+i");
        assert.equal(Complex("i").toString(), "i");
        assert.equal(Complex("3-4i").toString(), "3-4i");
        assert.equal(Complex("5").toString(), "5");
        assert.equal(Complex(0, -2).toString(), "-2i");
        assert.equal(Complex({r: 0, i: -2}).toString(), "-2i");
    });

    it("Complex Combinations", function() {

        var zero = Complex(0, 0), one = Complex(1, 1), two = Complex(2, 2);

        assert.equal(zero.toString(), "0");
        assert.equal(one.toString(), "1+i");
        assert(one.negate().equals(Complex(-1, -1)));
        assert(one.conjugate().equals(Complex(1, -1)));
        assert.equal(one.abs(), Math.SQRT2);
        assert.equal(one.arg(), Math.PI / 4);
        assert.equal(one.add(one).toString(), two.toString());
        assert.equal(one.sub(one).toString(), zero.toString());
        assert.equal(one.mul(2).toString(), two.toString());
        assert.equal(one.mul(one).toString(), Complex(0, 2).toString());
        assert.equal(one.div(2).toString(), "0.5+0.5i");
        assert.equal(one.div(one).toString(), "1");
        try {
            assert.equal(one.div(0).toString(), "Invalid Param");
        } catch (e) {
            assert.equal(e, "Invalid Param");
        }
        assert.equal(one.exp().toString(), "1.4686939399158851+2.2873552871788423i");
        assert.equal(one.log().toString(), "0.3465735902799727+0.7853981633974483i");
        assert.equal(one.pow(one).toString(), "0.27395725383012104+0.5837007587586146i");
        assert.equal(one.pow(zero).toString(), "1");
        assert.equal(one.sqrt().toString(), "1.09868411346781+0.4550898605622274i");
        assert.equal(one.sin().toString(), "1.2984575814159773+0.6349639147847361i");
        assert.equal(one.cos().toString(), "0.8337300251311491-0.9888977057628651i");
        assert.equal(one.tan().toString(), "0.2717525853195118+1.0839233273386948i");
        assert.equal(one.asin().toString(), "0.6662394324925153+1.0612750619050355i");
        assert.equal(one.acos().toString(), "0.9045568943023813-1.0612750619050357i");
        assert.equal(one.atan().toString(), "1.0172219678978514+0.4023594781085251i");
    });

    it("should handle inverse trig fns", function() {

        var values = [
            new Complex(2.3, 1.4),
            new Complex(-2.3, 1.4),
            new Complex(-2.3, -1.4),
            new Complex(2.3, -1.4)];

        var fns = ['sin', 'cos', 'tan'];

        for (var i = 0; i < values.length; i++) {

            for (var j = 0; j < 3; j++) {

                var a = values[i]['a' + fns[j]]()[fns[j]]();

                var res = values[i];

                assert(Math.abs(a.r - res.r) < 1e-12 && Math.abs(a.i - res.i) < 1e-12);
            }
        }
    });

});