/* ============================================================
   DEV ARCHITECTURE VIEWER — Árbol, Grafo y Red IA
//    ============================================================ */

const DevArchitectureViewer = {

    init(){
        this.createPanel();
        this.bind();
    },

    /* ============================================================
       CREAR PANEL
//        ============================================================ */
    createPanel(){
        const box = document.createElement("div");
        box.id = "dev-architecture-viewer";

        box.innerHTML = `
            <div class="arch-header">
                <span>🌐 Architecture Viewer</span>
                <button id="arch-close">✖</button>
            </div>

            <div class="arch-section">
                <h4>Vista Árbol</h4>
                <button id="arch-tree">Generar Árbol</button>
                <pre id="arch-tree-output"></pre>
            </div>

            <div class="arch-section">
                <h4>Vista Red</h4>
                <button id="arch-network">Generar Red</button>
                <pre id="arch-network-output"></pre>
            </div>

            <div class="arch-section">
                <h4>Vista Grafo</h4>
                <button id="arch-graph">Generar Grafo</button>
                <pre id="arch-graph-output"></pre>
            </div>
        `;

        document.body.appendChild(box);
    },

    /* ============================================================
       EVENTOS
//        ============================================================ */
    bind(){
        document.getElementById("arch-close").onclick = ()=> this.hide();

        document.getElementById("arch-tree").onclick = ()=> {
            const tree = this.buildTree();
            document.getElementById("arch-tree-output").innerText =
                JSON.stringify(tree, null, 2);
        };

        document.getElementById("arch-network").onclick = ()=> {
            const net = this.buildNetwork();
            document.getElementById("arch-network-output").innerText =
                JSON.stringify(net, null, 2);
        };

        document.getElementById("arch-graph").onclick = ()=> {
            const graph = this.buildGraph();
            document.getElementById("arch-graph-output").innerText =
                JSON.stringify(graph, null, 2);
        };
    },

    /* ============================================================
       GENERADORES
//        ============================================================ */

    // Árbol jerárquico IA
    buildTree(){
        return {
            superbrain: Object.keys(window.superbrain || {}),
            core: Object.keys(window.CoreState || {}),
            ui: Object.keys(window.UIState || {}),
            memory: Object.keys(window.memory || {}),
            perception: Object.keys(window.perception || {}),
            reasoner: Object.keys(window.reasoner || {})
        };
    },

    // Red: nodos + conexiones
    buildNetwork(){
        return {
            nodes: [
                "superbrain",
                "memory",
                "perception",
                "reasoner",
                "CoreState",
                "UIState"
            ],
            links: [
                {from:"superbrain", to:"memory"},
                {from:"superbrain", to:"UIState"},
                {from:"memory", to:"reasoner"},
                {from:"reasoner", to:"CoreState"},
                {from:"UIState", to:"superbrain"}
            ]
        };
    },

    // Grafo total del sistema
    buildGraph(){
        return {
            totalKeys: Object.keys(window).length,
            keys: Object.keys(window).slice(0,200),
            timestamp: Date.now()
        };
    },

    /* ============================================================
       MÉTODOS DE CONTROL
//        ============================================================ */
    show(){
        document.getElementById("dev-architecture-viewer").style.display = "flex";
    },

    hide(){
        document.getElementById("dev-architecture-viewer").style.display = "none";
    }
};

window.DevArchitectureViewer = DevArchitectureViewer;

document.addEventListener("DOMContentLoaded",()=> DevArchitectureViewer.init());