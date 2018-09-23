module.exports = function(app) {
    const index = require('./index');
    //Devices
    // const add_device = require("./Device/add_device");
    // const add_type_device = require("./Device/type_device");
    // const info_device = require("./Device/info_device");
    // const locations = require("./Device/location_device");
    // app.use(add_device,add_type_device,locations, info_device);
    //Users
    const tasks = require('./Tasks');
    const auth = require('./Users/auth_routes')
    const user = require('./Users/user_routes');
    const departament = require('./Users/departament_routes');
    const post = require('./Users/post_routes');
    // const info_user = require('./Users/info_user');
    // const all_users = require('./Users/all_users');
    // const role_users = require("./Users/role_user");
    app.use(index, user, departament, post, auth, tasks);
};
//, registration, role_users,info_user,all_users
