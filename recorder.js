/* ============================================================
   RECORDER.JS — Grabador de audio para HERENCIA IA
   Guarda audio en base64 y lo envía al sistema
//    ============================================================ */

const AudioRecorder = {

    mediaRecorder: null,
    chunks: [],
    recording: false,

    async start(){
        const stream = await Microphone.start();
        if(!stream) return null;

        this.chunks = [];
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);

        this.mediaRecorder.onstop = async () => {
            const blob = new Blob(this.chunks, { type: "audio/webm" });
            const base64 = await this.toBase64(blob);
            MemoryCore?.pushShort?.("AUDIO_RECORDED");
            InteractionCore.reply("AUDIO:" + base64);
        };

        this.mediaRecorder.start();
        this.recording = true;
        console.log("⏺️ Grabando…");
    },

    stop(){
        if(this.mediaRecorder && this.recording){
            this.mediaRecorder.stop();
            this.recording = false;
            Microphone.stop();
            console.log("⏹️ Grabación detenida");
        }
    },

    toBase64(blob){
        return new Promise(resolve=>{
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    },

    expose(){
        window.AudioRecorder = this;
    }
};

AudioRecorder.expose();