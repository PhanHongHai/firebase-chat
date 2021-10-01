import React, { FC, useState } from "react";
import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  Box,
  Divider,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { PersonOutline, GroupsSharp } from "@mui/icons-material";
import DraftsIcon from "@mui/icons-material/Drafts";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";

import LayoutStyles, { SidebarCustom } from "styles/component/layout";
import theme from "styles/component";

const data = [
  {
    key: 1,
    name: "a",
    avatar: "sd",
  },
];

const Sidebar: FC = () => {
  const layoutStyles = LayoutStyles();
  const [tabKey, setTabKey] = useState<string>("user");
  return (
    <SidebarCustom>
      <Box className={layoutStyles.profileContainer}>
        <div className="box">
          <Avatar sx={{ bgcolor: "white" }}>N</Avatar>
          <p>Mr.Test</p>
        </div>
      </Box>
      <Box sx={{ width: "100%", backgroundColor: theme.colorBlue }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutline />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <div>
          <BottomNavigation
            showLabels
            value={tabKey}
            onChange={(event, newValue) => {
              setTabKey(newValue);
            }}
          >
            <BottomNavigationAction  label="User" icon={<PersonOutline />} />
            <BottomNavigationAction label="Group" icon={<GroupsSharp />} />
            <BottomNavigationAction label="Bookmark" icon={<StarIcon />} />
            <BottomNavigationAction label="Search" icon={<SearchIcon />} />
          </BottomNavigation>
        </div>
      </Box>
    </SidebarCustom>
  );
};

export default Sidebar;
