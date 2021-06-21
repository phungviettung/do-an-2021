import mongoose from 'mongoose'

const MaterialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.materials || mongoose.model('materials', MaterialSchema)
export default Dataset