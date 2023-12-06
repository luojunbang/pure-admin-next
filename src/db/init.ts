import { initUserAdmin } from './user/user'

function init() {
  ;[initUserAdmin].reduce((rs, i) => {
    return rs.then((_) => i())
  }, Promise.resolve())
}

init()
