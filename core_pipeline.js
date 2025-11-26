const CorePipeline = {

    flow(data){
        return {
            input:data,
            processed:true,
            ts:Date.now()
        };
    }
};

window.CorePipeline = CorePipeline;