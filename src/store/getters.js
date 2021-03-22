const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  onsid: state => state.user.onsid,
  isadmin: state => state.user.isadmin
  // usertotal: state => state.getinfo.usertotal
}
export default getters
