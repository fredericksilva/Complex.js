/**
 * @license Complex.js v1.1.0 22/06/2015
 *
 * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

/**
 *
 * This class allows the manipilation of complex numbers.
 * You can pass a complex number in different formats. Either as object, double, string or two integer parameters.
 *
 * Object form
 * { r: <real>, i: <imaginary> }
 * { arg: <angle>, abs: <radius> }
 *
 * Double form
 * 99.3 - Single double value
 *
 * String form
 * "23.1337" - Simple real number
 * "15+3i" - a simple complex number
 * "3-i" - a simple complex number
 *
 * Example:
 *
 * var c = new Complex("99.3+8i");
 * c.mul({r: 3, i: 9}).div(4.9).sub(3, 2);
 *
 */

(function(root) {

    "use strict";

    var P = {r: 0, i: 0};

    // Heaviside-Function
    var H = function(x) {
        return x < 0 ? -1 : 1;
    };

    var cosh = function(x) {
        return (Math.exp(x) + Math.exp(-x)) / 2;
    };

    var sinh = function(x) {
        return (Math.exp(x) - Math.exp(-x)) / 2;
    };

    var parser_exit = function() {
        throw "Invalid Param";
    };

    var parse = function(a, b) {

        if (b !== undefined) {
            P['r'] = (a);
            P['i'] = (b);
        } else
            switch (typeof a) {

                case "object":

                    if ('i' in a && 'r' in a) {
                        P['r'] = (a['r']);
                        P['i'] = (a['i']);
                    } else if ('abs' in a && 'arg' in a) {
                        P['r'] = a['abs'] * Math.cos(a['arg']);
                        P['i'] = a['abs'] * Math.sin(a['arg']);
                    } else {
                        parser_exit();
                    }
                    break;

                case "string":

                    P['i'] = /* void */
                            P['r'] = 0;

                    for (var reg = /[+-]?[\di.]+/g, tmp, tr, i = 0; null !== (tmp = reg.exec(a)); i = 1) {

                        if (tmp[0].indexOf("i") !== -1) {

                            tr = tmp[0].replace("i", "");
                            if (tr === "+" || tr === "-" || tr === "")
                                tr+= "1";

                            P['i']+= parseFloat(tr);
                        } else {
                            P['r']+= parseFloat(tmp[0]);
                        }
                    }

                    // No single iteration
                    if (i === 0) {
                        parser_exit();
                    }
                    break;

                case "number":
                    P['i'] = 0;
                    P['r'] = parseFloat(a);
                    break;

                default:
                    parser_exit();
            }

        if (isNaN(P['r'] * P['i'])) {
            parser_exit();
        }
    };

    /**
     * @constructor
     * @returns {Complex}
     */
    function Complex(a, b) {

        if (!(this instanceof Complex)) {
            return new Complex(a, b);
        }

        parse(a, b);

        this['r'] = P['r'];
        this['i'] = P['i'];
    }

    Complex.prototype['r'] = 0;
    Complex.prototype['i'] = 0;

    /**
     * Adds two complex numbers
     * 
     * @returns {Complex}
     */
    Complex.prototype['add'] = function(a, b) {

        parse(a, b);

        return new Complex(
                this['r'] + P['r'],
                this['i'] + P['i']
                );
    };

    /**
     * Subtracts two complex numbers 
     * 
     * @returns {Complex}
     */
    Complex.prototype['sub'] = function(a, b) {

        parse(a, b);

        return new Complex(
                this['r'] - P['r'],
                this['i'] - P['i']
                );
    };

    /**
     * Multiplies two complex numbers
     * 
     * @returns {Complex}
     */
    Complex.prototype['mul'] = function(a, b) {

        parse(a, b);

        return new Complex(
                this['r'] * P['r'] - this['i'] * P['i'],
                this['r'] * P['i'] + this['i'] * P['r']
                );
    };

    /**
     * Divides two complex numbers
     * 
     * @returns {Complex}
     */
    Complex.prototype['div'] = function(a, b) {

        parse(a, b);

        a = P['r'];
        b = P['i'];

        var t = a * a + b * b;

        if (0 === t) {
            throw "DIV/0";
        }

        return new Complex(
                (a * this['r'] + b * this['i']) / t,
                (a * this['i'] - b * this['r']) / t
                );
    };

    /**
     * Calculate the power of two complex numbers
     * 
     * @returns {Complex}
     */
    Complex.prototype['pow'] = function(a, b) {

        parse(a, b);

        a = this['r'];
        b = this['i'];

        var abs = a * a + b * b;
        var arg = Math.atan2(b, a);

        var A = Math.pow(abs, P['r'] / 2) * Math.exp(-P['i'] * arg);
        var B = P['i'] * Math.log(abs) / 2 + P['r'] * arg;

        return new Complex(
                A * Math.cos(B),
                A * Math.sin(B)
                );
    };

    /**
     * Calculate the complex square root
     * 
     * @returns {Complex}
     */
    Complex.prototype['sqrt'] = function() {

        var r = this['abs']();

        return new Complex(
                Math.sqrt((r + this['r']) / 2),
                Math.sqrt((r - this['r']) / 2) * H(this['i'])
                );
    };

    /**
     * Calculate the complex exponent
     * 
     * @returns {Complex}
     */
    Complex.prototype['exp'] = function() {

        var tmp = Math.exp(this['r']);

        return new Complex(
                tmp * Math.cos(this['i']),
                tmp * Math.sin(this['i']));
    };

    /**
     * Calculate the natural log
     * 
     * @returns {Complex}
     */
    Complex.prototype['log'] = function() {

        var a = this['r'];
        var b = this['i'];

        return new Complex(
                Math.log(a * a + b * b) / 2,
                Math.atan2(b, a));
    };

    /**
     * Calculate the magniture of the complex number
     * 
     * @returns {number}
     */
    Complex.prototype['abs'] = function() {

        var a = this['r'];
        var b = this['i'];

        return Math.sqrt(a * a + b * b);
    };

    /**
     * Calculate the angle of the complex number
     * 
     * @returns {number}
     */
    Complex.prototype['arg'] = function() {

        return Math.atan2(this['i'], this['r']);
    };

    /**
     * Calculate the sine of the complex number
     * 
     * @returns {Complex}
     */
    Complex.prototype['sin'] = function() {

        var a = this['r'];
        var b = this['i'];

        return new Complex(
                Math.sin(a) * cosh(b),
                Math.cos(a) * sinh(b)
                );
    };

    /**
     * Calculate the cosine
     * 
     * @returns {Complex}
     */
    Complex.prototype['cos'] = function() {

        var a = this['r'];
        var b = this['i'];

        return new Complex(
                Math.cos(a) * cosh(b),
                -Math.sin(a) * sinh(b)
                );
    };

    /**
     * Calculate the tangent
     * 
     * @returns {Complex}
     */
    Complex.prototype['tan'] = function() {

        var a = this['r'];
        var b = this['i'];

        var d = Math.cos(2 * a) + cosh(2 * b);

        return new Complex(
                Math.sin(2 * a) / d,
                sinh(2 * b) / d
                );
    };

    /**
     * Calculate the complex arcus sinus
     * 
     * @returns {Complex}
     */
    Complex.prototype['asin'] = function() {

        return this['mul'](this)['negate']()['add'](1)['sqrt']()
                ['add'](this['mul'](Complex['I']))['log']()['mul'](Complex['I'])['negate']();
    };

    /**
     * Calculate the complex arcus cosinus
     * 
     * @returns {Complex}
     */
    Complex.prototype['acos'] = function() {

        return this['mul'](this)['negate']()['add'](1)['sqrt']()
                ['mul'](Complex['I'])['add'](this)['log']()['mul'](Complex['I'])['negate']();
    };

    /**
     * Calculate the complex arcus tangent
     * 
     * @returns {Complex}
     */
    Complex.prototype['atan'] = function() {

        return Complex['I']['add'](this)['div'](Complex['I']['sub'](this))
                ['log']()['mul'](Complex['I'])['div'](2);
    };

    /**
     * Calculate the complex sinh
     * 
     * @returns {Complex}
     */
    Complex.prototype['sinh'] = function() {

        var a = this['r'];
        var b = this['i'];

        return new Complex(
                sinh(a) * Math.cos(b),
                cosh(a) * Math.sin(b)
                );
    };

    /**
     * Calculate the complex cosh
     * 
     * @returns {Complex}
     */
    Complex.prototype['cosh'] = function() {

        var a = this['r'];
        var b = this['i'];

        return new Complex(
                cosh(a) * Math.cos(b),
                sinh(a) * Math.sin(b)
                );
    };

    /**
     * Calculate the complex tanh
     * 
     * @returns {Complex}
     */
    Complex.prototype['tanh'] = function() {

        var a = this['r'];
        var b = this['i'];

        var d = cosh(2 * a) + Math.cos(2 * b);

        return new Complex(
                sinh(2 * a) / d,
                Math.sin(2 * b) / d
                );
    };

    /**
     * Calculate the complex inverse 1/z
     * 
     * @returns {Complex}
     */
    Complex.prototype['inverse'] = function() {

        var a = this['r'];
        var b = this['i'];

        var t = a * a + b * b;

        if (0 === t) {
            throw "DIV/0";
        }
        return new Complex(a / t, -b / t);
    };

    /**
     * Returns the complex conjugate
     * 
     * @returns {Complex}
     */
    Complex.prototype['conjugate'] = function() {

        return new Complex(this['r'], -this['i']);
    };

    /**
     * Gets the negated complex number
     * 
     * @returns {Complex}
     */
    Complex.prototype['negate'] = function() {
        return new Complex(-this['r'], -this['i']);
    };

    /**
     * Compares two complex numbers
     * 
     * @TODO Epsilon comparison
     * @returns {boolean}
     */
    Complex.prototype['equals'] = function(a, b) {

        parse(a, b);

        return (P['r'] === this['r'] && P['i'] === this['i']);
    };

    /**
     * Clones the actual object
     * 
     * @returns {Complex}
     */
    Complex.prototype['clone'] = function() {

        return new Complex(this['r'], this['i']);
    };

    /**
     * Gets a string of the actual complex number
     * 
     * @returns {String}
     */
    Complex.prototype['toString'] = function() {

        var a = this['r'];
        var b = this['i'];

        if (isNaN(a * b)) {
            return 'NaN';
        }

        var ret = "";

        if (a !== 0) {
            ret+= a;
        }

        if (b !== 0) {

            if (b > 0 && a !== 0)
                ret+= "+";

            if (b === 1) {

            } else if (b === -1) {
                ret+= "-";
            } else {
                ret+= b;
            }
            ret+= "i";
        }

        if (ret === "")
            return "0";

        return ret;
    };

    /**
     * Returns the actual number as a vector
     * 
     * @returns {Array}
     */
    Complex.prototype['toVector'] = function() {

        return [this.r, this.i];
    };

    /**
     * Returns the actual real value of the current object
     * 
     * @returns {number|null}
     */
    Complex.prototype['valueOf'] = function() {

        if (this['i'] === 0) {
            return this['r'];
        }
        return null;
    };

    Complex['ZERO'] = new Complex(0, 0);
    Complex['ONE'] = new Complex(1, 0);
    Complex['I'] = new Complex(0, 1);
    Complex['PI'] = new Complex(Math.PI, 0);
    Complex['E'] = new Complex(Math.E, 0);

    if (typeof define === 'function' && define['amd']) {
        define([], function() {
            return Complex;
        });
    } else if (typeof exports === 'object') {
        module['exports'] = Complex;
    } else {
        root['Complex'] = Complex;
    }

})(this);
