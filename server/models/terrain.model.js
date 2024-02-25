const TerrainSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    soilType: {
        type: String,
        enum: ['arcilloso', 'arenoso', 'limoso', 'mixto', 'otro']
    },
    landSize: {
        type: Number, // En hectáreas, por ejemplo
        required: true
    },
    crops: [{
        type: String // Lista de cultivos que se cultivan en el terreno
    }],
    irrigation: {
        type: Boolean,
        default: false // Indica si el terreno cuenta con sistemas de riego
    },
    elevation: {
        type: Number // Elevación del terreno en metros sobre el nivel del mar
    },
    climate: {
        type: String,
        enum: ['soleado', 'lluvioso', 'ventoso', 'neblinoso', 'templado', 'frío', 'caluroso', 'seco', 'húmedo', 'variable', 'otro']
    },
    id_user: {
        type: String,
    },
}, { timestamps: true, versionKey: false });

const Terrain = new mongoose.model("Terrain", TerrainSchema);

module.exports = Terrain;
