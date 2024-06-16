const allRoles = {
  user: ['manageUser', 'doTasks'],
  admin: ['getUsers', 'manageUsers', 'manageUser', 'manageTasks', 'doTasks'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
