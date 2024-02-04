import config from "../app/config"
import { USER_ROLE } from "../app/modules/user/user.constant";
import { User } from "../app/modules/user/user.model";

const superUser = {
    id: '0001',
    email: '',
    password: config.super_admin_password,
    needsPasswordChange: false,
    role: 'super-admin',
    status: 'in-progress',
    isDeleted: false,
}

const seedSuperAdmin = async () => {
    //  when db is connected then only seed the super admin
    const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin })
    if (!isSuperAdminExists) {
        await User.create(superUser)
    }
}

export default seedSuperAdmin;