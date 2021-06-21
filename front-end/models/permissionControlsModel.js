import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.ObjectId;

const PermissionControlSchema = new mongoose.Schema( {
    author: ObjectId,
    title: { type: String },
    code: { type: String },
},
{
    timestamps: true,
},)

let Dataset = mongoose.models.permission_controls || mongoose.model('permission_controls', PermissionControlSchema)
export default Dataset