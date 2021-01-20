const Provider = require("./Provider");
const {get, observable} = require("mobx");
const {createTransformer} = require("mobx-utils");

class Context extends Provider {


    /////////////////////////////////
    // Helpers
    /////////////////////////////////

    get providerProps() {
        return {
            context: this
        };
    }

    /////////////////////////////////
    // Constraints
    /////////////////////////////////

    @observable constraints = new Map();

    setConstraint(key, value) {
        this.constraints.set(key, value);
    }

    getConstraint = createTransformer(key => {
        return get(this.constraints, key);
    })

}

module.exports = Context;