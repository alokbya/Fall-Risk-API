import mongoose from "mongoose";

/********************************
    * Epic Question Set Schema
********************************/
const EpicAuditSchema = new mongoose.Schema({
    name                            : { type: String, required: true },
    room                            : { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    fallRiskAssessed                : { type: Object, required: true },
    lasDocumentedFallRiskAssessment : { type: Object, required: true },
    patientFamilyEducated           : { type: Boolean, required: true }
});

export default EpicAuditSchema;