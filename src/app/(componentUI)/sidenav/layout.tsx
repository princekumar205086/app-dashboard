"use client";

import * as React from "react";
import { ReactNode, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: ReactNode;
}

export default function Layout(props: Props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleCollapse = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCollapse((prev) => !prev);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname " + pathname);

  // Automatically expand "Setting" if on a sub-item route
  useEffect(() => {
    if (
      pathname.startsWith("/support") ||
      pathname.startsWith("/change-password") ||
      pathname.startsWith("/contact")
    ) {
      setIsCollapse(true);
    }
  }, [pathname]);

  const drawer = (
    <div>
      <Toolbar className="shadow-lg">
        <Typography
          variant="h6"
          noWrap
          component="div"
          className=" font-semibold"
        >
          APP-DASHBOARD
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Profile", "Users", "Analytics"].map((text, index) => (
          <Link href={`/${text.toLowerCase()}`} key={text}>
            <ListItem
              disablePadding
              className={
                pathname.startsWith("/" + text.toLowerCase())
                  ? "text-sky-600 bg-slate-100"
                  : " text-slate-700"
              }
            >
              <ListItemButton>
                <ListItemIcon
                  className={
                    pathname.startsWith("/" + text.toLowerCase())
                      ? "text-sky-600 bg-slate-100"
                      : " text-slate-700"
                  }
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Divider />
        <ListItem
          disablePadding
          onClick={handleCollapse}
          className={
            pathname.startsWith("/setting")
              ? "text-sky-600 bg-slate-100"
              : " text-slate-700"
          }
        >
          <ListItemButton>
            <ListItemIcon
              className={
                pathname.startsWith("/setting")
                  ? "text-sky-600 bg-slate-100"
                  : " text-slate-700"
              }
            >
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
            {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List>
          {["Support", "Change-Password", "Contact"].map((text, index) => (
            <Link href={`/${text.toLowerCase()}`} key={text}>
              <ListItem
                disablePadding
                className={
                  pathname.startsWith("/" + text.toLowerCase())
                    ? "text-sky-600 bg-slate-100"
                    : " text-slate-700"
                }
              >
                <ListItemButton>
                  <ListItemIcon
                    className={
                      pathname.startsWith("/" + text.toLowerCase())
                        ? "text-sky-600 bg-slate-100"
                        : " text-slate-700"
                    }
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#ffffff",
          color: "black",
          boxShadow: "none",
          borderBottom: "solid black 1px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pathname.replace(/^\//, "").toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="dashboard"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <main>{children}</main>
      </Box>
    </Box>
  );
}
