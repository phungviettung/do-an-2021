const User = require('../../../app/models/Admin/User');
const Role = require('../../../app/models/Admin/Role');
const Permission = require('../../../app/models/Admin/Permission');
const PermissionControl = require('../../../app/models/Admin/PermissionControl');
const { mutipleMongooseToObject } = require('../../mongoose');
const { mongooseToObject } = require('../../mongoose');

//param id ,return {userInfo : , roleDetails: , permissionDetail: }
module.exports = async function (id) {
    let finalObjUser = {};

    let user = await User.findOne({ _id: id });
    let userObj = mongooseToObject(user);
    finalObjUser.userInfo = userObj;

    let roles = await Role.find({});
    let rolesObj = mutipleMongooseToObject(roles);
    finalObjUser.roleDetails = rolesObj;

    let permissions = await Permission.find({});
    let permissionsObj = mutipleMongooseToObject(permissions);
    finalObjUser.permissionsDetails = permissionsObj;

    // let permissionControles = await PermissionControl.find({})
    // let permissionControlesObj = mutipleMongooseToObject(permissionControles)
    // finalObjUser.permissionControleDetails = []

    return finalObjUser;
};
