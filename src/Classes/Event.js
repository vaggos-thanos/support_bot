class Event {
    constructor(name, once) {
        this.name = name;
        this.once = once;
    }

    run(db, ...args) {}
}

module.exports = Event;