import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.ObjectId;

const RolesSchema = new mongoose.Schema({
    author: ObjectId,
    name: { type: String },
    description: { type: String },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permissions' }],
    permissionsControl: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permission_controls' }],
}, {
    timestamps: true
})

let Dataset = mongoose.models.roles || mongoose.model('roles', RolesSchema)
export default Dataset