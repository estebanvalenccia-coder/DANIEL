const CoreDynamics = {

    pulse(x){
        return {...x, pulse:true, t:Date.now()};
    },

    flux(x){
        return {...x, flux:true};
    }
};

window.CoreDynamics = CoreDynamics;