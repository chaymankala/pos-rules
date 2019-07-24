var _rules = [];
var cart = [];

/**
 * Provide set of rules to initialise this 
 *
 * @param {array} _ pass array of rules
 */
function loadRules(_) {
    if (!_ || (_ && !_.length)) {
        throw "E101 - Please pass valid rules";
    }
    else {
        _rules = _;
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
 */
function add(item) {
    cart.push(item);
}


/**
 * remove items from cart
 *
 * @param {Number} index pass item index to remove
 */
function remove(index) {
    cart.splice(index, 1);
}




export default {
    loadRules,
    add,
    remove,
    total,
    clearCart,
    clearRules
};
