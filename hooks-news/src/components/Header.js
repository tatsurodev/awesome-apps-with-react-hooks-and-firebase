import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'

function Header(props) {
  // withRouterでrouting対象でないcomponentでprops.historyを使用できるようにする。hocなので引数のcomponentをwrapする
  // console.log(props.history)
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hooks News Logo" className="logo" />
        <NavLink to="/" className="header-title">
          Hooks News
        </NavLink>
        <NavLink to="/" className="header-link">
          new
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">
          top
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">
          search
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/create" className="header-link">
          submit
        </NavLink>
      </div>
      <div className="flex">
        <div className="divider">|</div>
        <NavLink to="/login" className="header-link">
          login
        </NavLink>
      </div>
    </div>
  )
}

export default withRouter(Header)
