import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// import dark/light switch button
import SwitchMode from "@components/global/switchMode"

const Header = () => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      wpMenu(slug: {eq: "primary-menu"}) {
        id
        menuItems {
          nodes {
            id
            parentId
            label
            url
            childItems {
              nodes {
                url
                label
              }
            }
          }
        }
      }
    }
  `)

  const menuItems = data.wpMenu.menuItems.nodes ? data.wpMenu.menuItems.nodes.filter(menuItem => menuItem.parentId === null) : null
      
  return (
    <header className="global-header" id="fixedHeader">
        <div className="container grid-container header-grid">
          <div>
            <Link to="/" alt="Creador" className="site-logo">
              <img src="/logo.svg" alt="site-logo"/>
            </Link>
          </div>
          <div>
            <div className="primary-menu">
              {menuItems.map((data) => {
                return <li key={data.id}><Link to={data.url}>{data.label}</Link></li>
              })}
            </div>
            <SwitchMode></SwitchMode>  
          </div>          
        </div>        
    </header>
  )
}

export default Header

