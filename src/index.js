var _rules = [];
var cart = [];

/**
 * Provide set of rules to initialise this 
 *
 * @param {array} _ pass array of rules
 * @throws {error} if the argument is not an array
 */
function loadRules(_) {
    if (!_ || (_ && !_.length)) {
        throw "E101 - Please pass valid rules";
    }
    else {
        _rules = _;
        return;
    }
};

/**
 * Clear all Rules
 *
 */
function clearRules() {
    _rules = [];
}

/**
 * Add items to cart
 *
 * @param {object} item pass item id and its quantity
 * @returns {Number} Cart length after adding
 */
function add({ id, quantity, unit_cost }) {
    if ((!id && id != 0) || !quantity || (!unit_cost && unit_cost != 0)) {
        throw "E102 - Invalid argument";
    }
    cart.push({ id, quantity, unit_cost });
    return cart.length;
}


/**
 * remove items from cart
 *
 * @param {Number} index pass item index to remove
 * @returns {Number} Cart length after removing
 */
function remove(index) {
    cart.splice(index, 1);
    return cart.length;
}


/**
 * remove all items from cart
 *
 */
function clearCart() {
    cart = [];
}


/**
 * find total value of the cart
 *
 */
function total(ignore_rules = false) {
    let total = 0;

    const __ = ignore_rules === true ? cart : validateCart();

    for (let i of __) {
        total += i.unit_cost;
    }


    return total;
}


export default {
    loadRules,
    add,
    remove,
    total,
    clearCart,
    clearRules
};
