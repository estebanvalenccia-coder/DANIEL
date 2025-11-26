const CoreSupervisor = {

    watch(x){
        return {...x, supervised:true};
    },

    validate(x){
        return {...x, valid:true};
    }
};

window.CoreSupervisor = CoreSupervisor;