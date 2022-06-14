import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from 'react-icons';
import '../../static/css/sidebar-font.css';

function Sidebar() {
    const [sidebar, toggleSidebar] = useState(false);
    
    const showSidebar = () => toggleSidebar(sidebar => !sidebar);
    
    return (
        <div>
            <IconContext.Provider value={{color: '#fff'}}>
                <Link to='#' className='menu-bars'>
                    <FaBars onClick={showSidebar} style={{color: "#060b26"}} />
                </Link>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to="#" className='menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default Sidebar;