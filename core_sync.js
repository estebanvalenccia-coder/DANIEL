const CoreSync = {

    sync(a,b){
        return {...a, ...b, synced:true};
    }
};

window.CoreSync = CoreSync;