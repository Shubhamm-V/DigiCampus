import React, { useEffect, useState } from "react";
import { Button, Col, Menu, Row } from "antd";
import { MENU_ITEMS } from "../../utils/menu";
import classes from "./MenuTop.module.scss";
import { MenuOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/redux";
import { useSelector } from 'react-redux';

const MenuTop = (props) => {
  const user = useSelector(state=>state.user)
  const [isLoginned, setIsLoggined] = useState(false);
  const [current, setCurrent] = useState("mail");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  // to get screenwidht for managing responsiveness as screenwidht decrease or increase
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);


  // Google Login
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(loginActions.login({ user: result.user }));
        setIsLoggined(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // action to be performed after clicking menu
  const onClick = (e) => {
    console.log("click ", e);
    navigate(`${e.key}`)
    setCurrent(e.key);
  };

  // for responsive menu declaring area
  let logoSpan = 6,
    buttonSpan = 4,
    menuSpan = 14;
  if (windowWidth > 930 && windowWidth <= 1200) {
    logoSpan = 24;
    menuSpan = 20;
    buttonSpan = 4;
  } else if (windowWidth < 930) {
    logoSpan = 16;
    buttonSpan = 5;
  }

  return (
    <div>
    <div className={`${windowWidth > 930 && classes.stickMenu} ${classes.menuTop}`} >
      <Row>
        <Col
          span={4}
          lg={4}
          sm={3}
          xs={windowWidth > 320 ? 4 : 5}
          className={classes.menuButton}
        >
          <Button
            onClick={() => setToggleMenu(true)}
            className={classes.menuButtonIcon}
            style={{
              marginBottom: 16,
            }}
          >
            <MenuOutlined />
          </Button>
        </Col>
        <Col
          span={logoSpan}
          md={logoSpan}
          sm={15}
          xs={windowWidth > 320 ? 12 : 11}
        >
          <img
            src="applogo.png"
            alt="app logo"
            className={classes.appLogo}
          />
        </Col>
        <Col
          span={menuSpan}
          sm={menuSpan}
          xs={24}
          className={`${classes.upperMenu} ${
            toggleMenu ? classes.showMenu : classes.hideMenu
          }`}
        >
          <CloseOutlined
            className={classes.closeIcon}
            onClick={() => setToggleMenu(false)}
          />
          <Menu
            className={classes.menuWithItems}
            onClick={onClick}
            selectedKeys={[current]}
            defaultActiveFirst={['/']}
            mode={windowWidth <= 930 ? "inline" : "horizontal"}
            items={MENU_ITEMS}
          />
        </Col>
        <Col
          span={buttonSpan}
          md={buttonSpan}
          sm={6}
          xs={8}
          className={classes.buttonArea}
        >

          {
            isLoginned ? <div>
              <strong className={classes.user}>{user.displayName}</strong>
              <LogoutOutlined className={classes.logOut}/>:
              </div>:
              <Button
            size={windowWidth <= 930 ? "default" : "large"}
            className={classes.exploreButton}
            onClick={signIn}
            type = "primary"
          >
           Google Login
          </Button>
          }
          
        </Col>
      </Row>
    </div>
    {props.children}

    </div>
  );
};

export default MenuTop;