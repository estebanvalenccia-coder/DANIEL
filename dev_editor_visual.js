/* ============================================================
   DEV EDITOR VISUAL — Creador gráfico automático
//    ============================================================ */

const DevEditorVisual = {

    openPanel(){
        let box = document.getElementById("dev-editor-visual");
        if(box) return box.style.display="flex";

        box = document.createElement("div");
        box.id = "dev-editor-visual";

        box.innerHTML = `
            <div class="dev-editor-window">
                <div class="dev-editor-title">Editor Visual IA</div>

                <textarea id="dev-editor-code" placeholder="Aquí aparece el código creado automáticamente..."></textarea>

                <div class="dev-editor-buttons">
                    <button id="dev-editor-save">Guardar</button>
                    <button id="dev-editor-close">Cerrar</button>
                </div>
            </div>
        `;

        document.body.appendChild(box);

        document.getElementById("dev-editor-close").onclick = ()=> box.style.display="none";
    },

    setCode(code){
        const area = document.getElementById("dev-editor-code");
        if(area) area.value = code;
    },

    showCodeFromIA(result){
        this.openPanel();
        this.setCode(result.code || "");
    }
};

window.DevEditorVisual = DevEditorVisual;