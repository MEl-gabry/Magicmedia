import React, {useState} from "react";
import {Nav, Navbar} from "react-bootstrap";

function Sidebar() {
    const [isToggled, setToggled] = useState(false);
    
    return (
        <div>
            <Navbar className="mnb">
                <i className="fa fa-bars" id="msb"/>
            </Navbar>
            <Nav className="msb d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/login">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Sidebar;