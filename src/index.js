var _rules = [];

function loadRules(_) {
    if (!_ || (_ && !_.length)) {
        throw "E101 - Please pass valid rules";
    }
    else {
        _rules = _;
    }
};

function clearRules(){
    _rules = [];
}




export default {
    loadRules,
    add,
    remove,
    total,
    clearCart,
    clearRules
};
