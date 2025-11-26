const HUD = {

    draw(x){
        return {...x, hud:true};
    },

    flash(msg){
        console.log("HUD:", msg);
    }
};

window.HUD = HUD;