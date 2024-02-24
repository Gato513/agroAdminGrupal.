const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({

    cropName: {
        type: String,
        required: true
    },
    
    id_user: {
        type: String,
    }
}, { timestamps: true, versionKey: false });

const Crop = new mongoose.model("Crop", CropSchema);

module.exports = Crop;
