export const IASuelo = {

    id: "IA_SUELO",
    rol: "suelo",
    tipo: "analitica",

    analizar(datos) {

        const salida = {
            tipo: "",
            estado: "",
            drenaje: "",
            recomendaciones: []
        };

        // Tipo general
        if (datos.textura === "arena") {
            salida.tipo = "Arenoso";
            salida.estado = "Muy drenante";
            salida.recomendaciones.push("Añadir materia orgánica para retener agua.");
        }

        if (datos.textura === "arcilla") {
            salida.tipo = "Arcilloso";
            salida.estado = "Pesado y poco drenante";
            salida.recomendaciones.push("Agregar perlita y arena para airearlo.");
        }

        if (datos.textura === "limoso") {
            salida.tipo = "Limoso";
            salida.estado = "Equilibrado pero compactable";
            salida.recomendaciones.push("Evitar encharcamiento y airear semanalmente.");
        }

        // pH
        if (datos.ph < 5.5) {
            salida.recomendaciones.push("pH ácido: añadir cal agrícola.");
        }
        if (datos.ph > 7.5) {
            salida.recomendaciones.push("pH alcalino: añadir azufre o sustrato ácido.");
        }

        // Drenaje
        if (datos.drenaje < 40) {
            salida.drenaje = "Malo";
            salida.recomendaciones.push("Aumentar drenaje con perlita o fibra de coco.");
        } else if (datos.drenaje < 70) {
            salida.drenaje = "Normal";
        } else {
            salida.drenaje = "Excelente";
        }

        return salida;
    }
};