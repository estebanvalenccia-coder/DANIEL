/* ===========================================================================
   PATCH PARA TODAS LAS IA — habilidad de recibir mensajes IA ↔ IA
//    =========================================================================== */

export const IAReceiverPatch = {

    aplicar(ia){

        ia.recibirMensajeIA = function(origen, mensaje){

            console.log(`📨 IA ${this.id} recibió mensaje de ${origen.id}:`, mensaje);

            // IA puede reaccionar a mensajes internos
            if(this.rol && this.rol.nombre === "Guardia"){
                if(mensaje.includes("alerta")){
                    this.estado.estado = "⚠️ Alerta";
                }
            }

            if(this.rol && this.rol.nombre === "Emocional"){
                if(mensaje.includes("triste")){
                    IAEmotionSystem.cambiarEmocion(this, "empatía", 0.8);
                }
            }

            // Cada IA puede personalizar aquí su reacción
        };
    }
};

window.IAReceiverPatch = IAReceiverPatch;