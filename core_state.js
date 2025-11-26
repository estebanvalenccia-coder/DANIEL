const CoreState = {

    state:{
        ready:false,
        active:false,
        ts:0
    },

    setReady(){
        this.state.ready = true;
        this.state.ts = Date.now();
    },

    setActive(){
        this.state.active = true;
        this.state.ts = Date.now();
    }
};

window.CoreState = CoreState;