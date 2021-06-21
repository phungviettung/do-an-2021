import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.ObjectId;

const PermissionsSchema = new mongoose.Schema(  {
    author: ObjectId,
    title: { type: String },
    url: { type: String },
    controles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permission_controls' }],
},
{
    timestamps: true,
})

let Dataset = mongoose.models.permissions || mongoose.model('permissions', PermissionsSchema)
export default Dataset