import User from '../models/userModel'
import Role from '../models/rolesModel'
import Permission from '../models/permissionsModel'
import PermissionControl from '../models/permissionControlsModel'

//param id ,return {userInfo : , roleDetails: , permissionDetail: }
module.exports = async function (id) {
    let finalObjUser = {};

    let user = await User.findOne({ _id: id });
    finalObjUser.user = user;

    let roles = await Role.find({ _id: { $in: user.roles } });
    finalObjUser.roles = roles;

    let permissionsObjResult = [];
    let permissionsId = [];
    for (let index = 0; index < roles.length; index++) {
        const role = roles[index];
        let permissions = await Permission.find({
            _id: { $in: role.permissions },
        });

        for (let i = 0; i < permissions.length; i++) {
            permissionsObjResult.push(permissions[i]);
            permissionsId.push(permissions[i]._id);
        }
    }
    //remove dumlicate array of object
    const filteredArr = permissionsObjResult.reduce((acc, current) => {
        const x = acc.find(
            (item) => item._id.toString() === current._id.toString(),
        );
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    finalObjUser.permissions = filteredArr;

    let idPermissAndAction = []
    filteredArr.forEach(element => {
        idPermissAndAction.push(element._id)
    });
   

    let controlObjResult = [];
    for (let index = 0; index < filteredArr.length; index++) {
        const per = filteredArr[index];
        let control = await PermissionControl.find({
            _id: { $in: per.controles },
        });

        for (let i = 0; i < control.length; i++) {
            controlObjResult.push(control[i]);
        }
    }

    
    //remove dumlicate array of object
    const filteredArrControl = controlObjResult.reduce((acc, current) => {
        const x = acc.find(
            (item) => item._id.toString() === current._id.toString(),
        );
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    finalObjUser.permissionControles = filteredArrControl;

    filteredArrControl.forEach(element => {
        idPermissAndAction.push(element._id)
    });
    finalObjUser.idPermissAndAction = idPermissAndAction


    return finalObjUser;

};
