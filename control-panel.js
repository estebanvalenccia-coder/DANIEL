const ControlPanel = {

    open(){
        return {panel:true, opened:true};
    },

    close(){
        return {panel:true, closed:true};
    }
};

window.ControlPanel = ControlPanel;