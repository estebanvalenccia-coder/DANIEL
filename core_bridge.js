const CoreBridge = {

    link(a){
        return {...a, linked:true};
    },

    connect(a){
        return {...a, connected:true};
    }
};

window.CoreBridge = CoreBridge;