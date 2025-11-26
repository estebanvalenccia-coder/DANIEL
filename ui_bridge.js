const UIBridge = {

    connect(x){
        return {...x, uiLinked:true};
    },

    sync(x){
        return {...x, uiSynced:true};
    }
};

window.UIBridge = UIBridge;