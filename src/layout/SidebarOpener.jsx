

import "../styles/SidebarOpener.css"

function SidebarOpener({sidebarOpen,setSidebarOpen}){
  return(
    <button onClick={e=>{e.preventDefault(); setSidebarOpen(!sidebarOpen);}} id="sidebarOpener">
      {sidebarOpen
      ? <b className="fa-solid fa-x"></b>
      : <i className="fa-solid fa-bars"></i>
      }
    </button>
  )
}
export default SidebarOpener;