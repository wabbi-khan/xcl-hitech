// import React from 'react';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import PropTypes from 'prop-types';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Box from '@material-ui/core/Box';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Collapse from '@material-ui/core/Collapse';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';
// import HomeIcon from '@material-ui/icons/Home';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     grow: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: fade(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: fade(theme.palette.common.white, 0.25),
//         },
//         marginRight: theme.spacing(2),
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(3),
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         padding: theme.spacing(0, 2),
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//         },
//     },
//     sectionDesktop: {
//         display: 'none',
//         [theme.breakpoints.up('md')]: {
//             display: 'flex',
//         },
//     },
//     sectionMobile: {
//         display: 'flex',
//         [theme.breakpoints.up('md')]: {
//             display: 'none',
//         },
//     },
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//         display: 'flex',
//         height: 224,
//     },
//     tabs: {
//         borderRight: `1px solid ${theme.palette.divider}`,
//         height: 400,
//         width: 200,
//     },
//     root: {
//         width: '100%',
//         maxWidth: 200,
//         backgroundColor: theme.palette.background.paper,
//     },
//     nested: {
//         paddingLeft: theme.spacing(4),
//     },
// }));

// const SideNav = (props) => {
//     const { history, children, title } = props;
//     const classes = useStyles();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//     const isMenuOpen = Boolean(anchorEl);
//     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//     const handleProfileMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMobileMenuClose = () => {
//         setMobileMoreAnchorEl(null);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         handleMobileMenuClose();
//     };

//     const handleMobileMenuOpen = (event) => {
//         setMobileMoreAnchorEl(event.currentTarget);
//     };

//     const menuId = 'primary-search-account-menu';
//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//             <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//         </Menu>
//     );

//     const mobileMenuId = 'primary-search-account-menu-mobile';
//     const renderMobileMenu = (
//         <Menu
//             anchorEl={mobileMoreAnchorEl}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             id={mobileMenuId}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={isMobileMenuOpen}
//             onClose={handleMobileMenuClose}
//         >

//             <MenuItem>
//                 <IconButton aria-label="show 11 new notifications" color="inherit">
//                     <Badge badgeContent={11} color="secondary">
//                         <NotificationsIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Notifications</p>
//             </MenuItem>
//             <MenuItem onClick={handleProfileMenuOpen}>
//                 <IconButton
//                     aria-label="account of current user"
//                     aria-controls="primary-search-account-menu"
//                     aria-haspopup="true"
//                     color="inherit"
//                 >
//                     <AccountCircle />
//                 </IconButton>
//                 <p>Profile</p>
//             </MenuItem>
//         </Menu>
//     );

//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const [open, setOpen] = React.useState(true);
//     const [open2, setOpen2] = React.useState(false);


//     const handleClick1 = () => {
//         console.log('handleClick1');

//         setOpen(!open);
//     };
//     const handleClick2 = () => {
//         console.log('handleClick2');
//         setOpen2(!open2);
//     };

//     return (
//         <div className={classes.grow}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         className={classes.menuButton}
//                         color="inherit"
//                         aria-label="open drawer"
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography className={classes.title} variant="h6" noWrap>
//                         Dashboard
//                     </Typography>
//                     {/* <div className={classes.search}>
//                         <div className={classes.searchIcon}>
//                             <SearchIcon />
//                         </div>
//                         <InputBase
//                             placeholder="Search…"
//                             classes={{
//                                 root: classes.inputRoot,
//                                 input: classes.inputInput,
//                             }}
//                             inputProps={{ 'aria-label': 'search' }}
//                         />
//                     </div> */}
//                     <div className={classes.grow} />
//                     <div className={classes.sectionDesktop}>
//                         <IconButton aria-label="show 4 new mails" color="inherit">
//                             <Badge badgeContent={4} color="secondary">
//                                 <MailIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton aria-label="show 17 new notifications" color="inherit">
//                             <Badge badgeContent={17} color="secondary">
//                                 <NotificationsIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton
//                             edge="end"
//                             aria-label="account of current user"
//                             aria-controls={menuId}
//                             aria-haspopup="true"
//                             onClick={handleProfileMenuOpen}
//                             color="inherit"
//                         >
//                             <AccountCircle />
//                         </IconButton>
//                     </div>
//                     <div className={classes.sectionMobile}>
//                         <IconButton
//                             aria-label="show more"
//                             aria-controls={mobileMenuId}
//                             aria-haspopup="true"
//                             onClick={handleMobileMenuOpen}
//                             color="inherit"
//                         >
//                             <MoreIcon />
//                         </IconButton>
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             {renderMobileMenu}
//             {renderMenu}

//             <List
//                 component="nav"
//                 aria-labelledby="nested-list-subheader"
//                 // subheader={
//                 //     <ListSubheader component="div" id="nested-list-subheader">
//                 //         Nested List Items
//                 //     </ListSubheader>
//                 // }
//                 className={classes.root}
//             >
//                 <ListItem button>
//                     <ListItemIcon>
//                         <HomeIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Dashboard" />
//                 </ListItem>
//                 <ListItem button onClick={handleClick1}>
//                     <ListItemIcon>
//                         <AttachMoneyIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Purchase" />
//                     {open ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={open} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <RadioButtonUncheckedIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <RadioButtonUncheckedIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <RadioButtonUncheckedIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <RadioButtonUncheckedIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <RadioButtonUncheckedIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <RadioButtonUncheckedIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                     </List>
//                 </Collapse>
//                 <ListItem button onClick={handleClick2}>
//                     <ListItemIcon>
//                         <InboxIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Purchase" />
//                     {open2 ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={open2} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <StarBorder />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <StarBorder />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <StarBorder />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <StarBorder />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <StarBorder />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                         <ListItem button className={classes.nested}>
//                             <ListItemIcon>
//                                 <StarBorder />
//                             </ListItemIcon>
//                             <ListItemText primary="item1" />
//                         </ListItem>
//                     </List>
//                 </Collapse>

//             </List>
//                     <h1>saghser </h1>
//         </div>

//     );
// }


// export default (SideNav)




import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LabelIcon from '@material-ui/icons/Label';
import StoreIcon from '@material-ui/icons/Store';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        background: 'black',
        color: 'whitesmoke',
        opacity: 0.9,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: 'black',
        color: 'whitesmoke',
        opacity: 0.9,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: 'lightgrey',
        minHeight: 770,
    },
}));

export default function Sidenav(props) {
    const { title, children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleDropdown1() {
        setOpen1(!open1)
      }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ backgroundColor: '#22a19a' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose} style={{ background: 'black', color: 'whitesmoke', }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{ background: 'black', color: 'whitesmoke', }}>
                                {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Purchase'].map((text, index) => (
                        <ListItem button key={text} onClick={handleDropdown1}>
                            <ListItemIcon style={{ background: 'black', color: 'whitesmoke', }}>
                                {index % 2 === 0 ? <AttachMoneyIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {open1 ? <IconExpandLess /> : <IconExpandMore />}
                        </ListItem>

                    ))}
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText inset primary="Material" />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText inset primary="Vendors" />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText inset primary="Supplier Evaluation Form" />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText inset primary="Approved Supplier List" />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText inset primary="Purchase Order" />
                            </ListItem>
                            <ListItem button className={classes.menuItem}>
                                <ListItemText inset primary="Purchase Order List" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List>
                    {['Marketing'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{ background: 'black', color: 'whitesmoke', }}
                            >
                                {index % 2 === 0 ? <AssessmentIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Production'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{ background: 'black', color: 'whitesmoke', }}>
                                {index % 2 === 0 ? <LabelIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Store'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{ background: 'black', color: 'whitesmoke', }}>
                                {index % 2 === 0 ? <StoreIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['HR'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon style={{ background: 'black', color: 'whitesmoke', }}>
                                {index % 2 === 0 ? <PeopleAltIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}
