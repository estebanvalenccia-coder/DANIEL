const QuickActions = {

    run(a){
        return {action:a, ok:true};
    },

    batch(list){
        return {batch:list, ok:true};
    }
};

window.QuickActions = QuickActions;
