var _rules = [];
var cart = [];
const RULE_TYPES = {
    DISCOUNT: "DISCOUNT",
    GET_X_FOR_Y: "GET_X_FOR_Y"
}

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
function add({ id, unit_cost }) {
    if ((!id && id != 0) || (!unit_cost && unit_cost != 0)) {
        throw "E102 - Invalid argument";
    }
    cart.push({ id, unit_cost });
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
 * @param {string} customer_id Customer ID to validate rules
 */
function total(customer_id, ignore_rules = false) {
    let total = 0;

    ignore_rules === true ? null : validateCart(customer_id);

    for (let i of cart) {
        total += i.unit_cost;
    }


    return total;
}

function validateCart(customer_id) {
    if ((!cart || (cart && !cart.length) || (!_rules || (_rules && !_rules.length)))) {
        return [];
    }

    let _rule = _rules.find(___ => ___ && ___.customer_id === customer_id);

    if (_rule && _rule.rules && _rule.rules.length) {
        let cRules = _rule.rules;
        for (let i of cRules) {
            applyRule(i);
        }
    }
    else {
        return [];
    }

}

function applyRule(rule) {
    if (rule && rule.type && rule.product_id) {
        switch (rule.type) {
            case RULE_TYPES.DISCOUNT: {
                if (rule.discount && !isNaN(rule.discount) && rule.discount > 0) {
                    for (let i of cart) {
                        if (rule.product_id == i.id) {
                            i.unit_cost = i.unit_cost - (i.unit_cost * (rule.discount / 100));
                        }
                    }
                }
                break;
            }
            case RULE_TYPES.GET_X_FOR_Y: {
                if (!isNaN(rule.x) && !isNaN(rule.y) && rule.x > 0 && rule.y > 0 && x > y) {
                    let ys = 0;
                    let residue = x - y;
                    let residue2 = 0;
                    for (let i of cart) {
                        if (rule.product_id == i.id) {
                            if (residue2 == 0) {
                                ys++;
                            }
                            else {
                                residue2--;
                                rule.unit_cost = 0;
                            }
                        }
                        if (ys == y) {
                            residue2 = residue;
                        }

                    }
                }
                break;
            }
            default:
                return;
        }
    }

}


export default {
    loadRules,
    add,
    remove,
    total,
    clearCart,
    clearRules,
    RULE_TYPES
};
