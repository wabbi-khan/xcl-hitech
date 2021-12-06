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

//         setOpen(!open);
//     };
//     const handleClick2 = () => {
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

import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AssessmentIcon from "@material-ui/icons/Assessment";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
// import LabelIcon from '@material-ui/icons/Label';
import StoreIcon from "@material-ui/icons/Store";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { withRouter } from "react-router-dom";
// import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import BusinessIcon from "@material-ui/icons/Business";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/utils/Button";
import { logOutUser } from "../../services/action/UserAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import ShowChartIcon from "@material-ui/icons/ShowChartIcon";
import financialImg from "../Accounts/images/financialIcon.png";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "black",
    color: "whitesmoke",
    opacity: 0.9,
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "black",
    color: "whitesmoke",
    opacity: 0.9,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "whitesmoke",
    minHeight: 770,
  },
  addMoreRes: {
    marginTop: 5,
    padding: 5,
    width: "10%",
    color: "#22A19A",
    backgroundColor: "whitesmoke",
    fontWeight: "500",
    textTransform: "none",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "black",
      color: "whitesmoke",
      border: "none",
      // borderColor: '#22A19A',
    },
    // [theme.breakpoints.up('md')]: {
    //     width: '10%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //     // width: '12%',
    // },
  },
}));

const ListItemComp = ({ link, name }) => (
  <Link
    to={link}
    style={{
      color: "#fff",
      textDecoration: "none",
      width: "100%",
      display: "block",
    }}
  >
    <span>{name}</span>
  </Link>
);

function Sidenav(props) {
  const { title, history, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // function handleDropdown1() {
  //     setOpen1(!open1);
  // }

  const logOut = () => {
    dispatch(logOutUser());
  };

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
					<Typography variant="h6" noWrap style={{ marginLeft: 'auto' }}>
						<ExitToAppIcon
							onClick={logOut}
							style={{ cursor: 'pointer' }}
						/>
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
					<IconButton style={{ background: 'black', color: 'whitesmoke' }}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{['Dashboard'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
								onClick={() => {
									handleDrawerOpen();
								}}
							>
								{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								onClick={() => {
									history.push('/dashboard');
								}}
							/>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['Purchase'].map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={() => {
								setOpen1(!open1);
							}}
						>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
								onClick={() => {
									handleDrawerOpen();
								}}
							>
								{index % 2 === 0 ? <AttachMoneyIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								onClick={() => {
									history.push('/purchasedashboard');
								}}
							/>
							{open1 ? <IconExpandLess /> : <IconExpandMore />}
						</ListItem>
					))}
					<Collapse in={open1} timeout="auto" unmountOnExit>
						<Divider />
						<List component="div" disablePadding>
							<ListItem button className={classes.menuItem}>
								<ListItemText inset>
									<ListItemComp link="/purchase/units" name="Units" />
								</ListItemText>
							</ListItem>
							<ListItem button className={classes.menuItem}>
								<ListItemText inset>
									<ListItemComp
										link="/purchase/category"
										name="Category"
									/>
								</ListItemText>
							</ListItem>
							<ListItem button className={classes.menuItem}>
								<ListItemText inset>
									<ListItemComp
										link="/purchase/sub_categories"
										name="Sub Category"
									/>
								</ListItemText>
							</ListItem>
							<ListItem button className={classes.menuItem}>
								<ListItemText inset>
									<ListItemComp
										link="/purchase/department"
										name="Departments"
									/>
								</ListItemText>
							</ListItem>
							<ListItem button className={classes.menuItem}>
								<ListItemText inset>
									<ListItemComp
										link="/purchase/material"
										name="Materials"
									/>
								</ListItemText>
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/purchase/vendors');
								}}
							>
								<ListItemText inset primary="Vendors" />
							</ListItem>
							<ListItem button className={classes.menuItem}>
								<ListItemText inset>
									<ListItemComp
										link="/purchase/supplier_evaluation_form"
										name="Supplier Eval Form "
									/>
								</ListItemText>
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/purchase/approved_supplier_list');
								}}
							>
								<ListItemText inset primary="Approved Supplier List" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/purchase/purchase_order');
								}}
							>
								<ListItemText inset primary="Purchase Order" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/purchase/purchase_order_list');
								}}
							>
								<ListItemText inset primary="Purchase Order List" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/purchase/purchase_requisition');
								}}
							>
								<ListItemText inset primary="Purchase Requisition" />
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
				<List>
					{['Marketing/Sales'].map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={() => {
								setOpen4(!open4);
							}}
						>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
							>
								{index % 2 === 0 ? <AssessmentIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								onClick={() => {
									history.push('/marketing_dashboard');
								}}
							/>
							{open4 ? <IconExpandLess /> : <IconExpandMore />}
						</ListItem>
					))}
					<Collapse in={open4} timeout="auto" unmountOnExit>
						<Divider />
						<List component="div" disablePadding>
						<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/marketing_dashboard/contract_review');
								}}
							>
								<ListItemText inset primary="Contract Review..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/marketing_dashboard/sales_contract');
								}}
							>
								<ListItemText inset primary="Sales Contract" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/marketing_dashboard/order_booking_form'
									);
								}}
							>
								<ListItemText inset primary="Order Booking Form" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/marketing_dashboard/order_log_sheet');
								}}
							>
								<ListItemText inset primary="Order Log Sheet" />
							</ListItem>
							{/* <ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/marketing/delivery_order');
								}}
							>
								<ListItemText inset primary="Delivery Order" />
							</ListItem> */}
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/marketing_dashboard/customer_feedback'
									);
								}}
							>
								<ListItemText inset primary="Customer Feedback.." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/marketing_dashboard/customer_complaint'
									);
								}}
							>
								<ListItemText inset primary="Customer Complaint.." />
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
				<List>
					{['Production'].map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={() => {
								setOpen5(!open5);
							}}
						>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
								onClick={() => {
									handleDrawerOpen();
								}}
							>
								{index % 2 === 0 ? <BusinessIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								onClick={() => {
									history.push('/productionDashboard');
								}}
							/>
							{open5 ? <IconExpandLess /> : <IconExpandMore />}
						</ListItem>
					))}
					<Collapse in={open5} timeout="auto" unmountOnExit>
						<Divider />
						<List component="div" disablePadding>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/productionDashboard/machines');
								}}
							>
								<ListItemText inset primary="Machines" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/productionDashboard/shifts');
								}}
							>
								<ListItemText inset primary="Shifts" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/productionDashboard/weekly-production-plan'
									);
								}}
							>
								<ListItemText inset primary="Weekly Production..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/productionDashboard/setUpCards');
								}}
							>
								<ListItemText inset primary="Set Up Cards" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/productionDashboard/productionReport'
									);
								}}
							>
								<ListItemText inset primary="Production Report" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/productionDashboard/productionOnlineInspectionReport'
									);
								}}
							>
								<ListItemText inset primary="Production Online..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/productionDashboard/production');
								}}
							>
								<ListItemText inset primary="Production" />
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
				<List>
					{['Store'].map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={() => {
								setOpen2(!open2);
							}}
						>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
								onClick={() => {
									handleDrawerOpen();
								}}
							>
								{index % 2 === 0 ? <StoreIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								onClick={() => {
									history.push('/storedashboard');
								}}
							/>
							{open2 ? <IconExpandLess /> : <IconExpandMore />}
						</ListItem>
					))}
					<Collapse in={open2} timeout="auto" unmountOnExit>
						<Divider />
						<List component="div" disablePadding>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/store_categories');
								}}
							>
								<ListItemText inset primary="Categories" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/products');
								}}
							>
								<ListItemText inset primary="Finished Products" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/products_bin_card');
								}}
							>
								<ListItemText inset primary="Products Bin Card" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/good_received_and_inspection_form'
									);
								}}
							>
								<ListItemText inset primary="Goods Received(GRIN)" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('');
								}}
							>
								<ListItemText inset primary="Grouped Bin Card" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/vehicles');
								}}
							>
								<ListItemText inset primary="Vehicles" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/vehicle_inspect_checklist'
									);
								}}
							>
								<ListItemText inset primary="Vehicles Inspection..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/inwards');
								}}
							>
								<ListItemText inset primary="Inwards" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/delivery_chalan');
								}}
							>
								<ListItemText inset primary="Delivery Chalan" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/outwards');
								}}
							>
								<ListItemText inset primary="Outwards" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/daily_inwards_report');
								}}
							>
								<ListItemText inset primary="Daily Inwards Report" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/daily_consumption_report'
									);
								}}
							>
								<ListItemText inset primary="Daily Consumption..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/department_wise_consumption_report'
									);
								}}
							>
								<ListItemText inset primary="Dept Wise Consump..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/department_wise_store_inventory'
									);
								}}
							>
								<ListItemText inset primary="Dept Wise Store Inv..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/material_issue_requisition'
									);
								}}
							>
								<ListItemText inset primary="Material Issue Req..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/storedashboard/outward_gatepass');
								}}
							>
								<ListItemText inset primary="Outward Gate Pass" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push(
										'/storedashboard/stock_assessment_report'
									);
								}}
							>
								<ListItemText inset primary="Stock Assessment Rep.." />
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
				<List>
					{['HR'].map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={() => {
								setOpen3(!open3);
							}}
						>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
								onClick={() => {
									handleDrawerOpen();
								}}
							>
								{index % 2 === 0 ? <PeopleAltIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								onClick={() => {
									history.push('/hr_dashboard');
								}}
							/>
							{open3 ? <IconExpandLess /> : <IconExpandMore />}
						</ListItem>
					))}
					<Collapse in={open3} timeout="auto" unmountOnExit>
						<Divider />
						<List component="div" disablePadding>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/education');
								}}
							>
								<ListItemText inset primary="Education" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/skills');
								}}
							>
								<ListItemText inset primary="Skills" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/experience');
								}}
							>
								<ListItemText inset primary="Experience" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/responsibilities');
								}}
							>
								<ListItemText inset primary="Responsibilities" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/authorities');
								}}
							>
								<ListItemText inset primary="Authorities" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/designation');
								}}
							>
								<ListItemText inset primary="Designation" />
							</ListItem>
							{/* <ListItem button
                                className={classes.menuItem}
                                onClick={() => {
                                    history.push('/hr/competence_criteria')
                                }}
                            >
                                <ListItemText inset primary="Competence Criteria" />
                            </ListItem> */}
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees');
								}}
							>
								<ListItemText inset primary="Employee Profile" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees/view_emp_details');
								}}
							>
								<ListItemText inset primary="Employees Details" />
							</ListItem>
							{/* <ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees_salaries');
								}}
							>
								<ListItemText inset primary="Employees Salaries" />
							</ListItem> */}
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees_leave');
								}}
							>
								<ListItemText inset primary="Employees Leave" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees_attendance');
								}}
							>
								<ListItemText inset primary="Employees Attendence" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees_performance_assessment');
								}}
							>
								<ListItemText inset primary="Employees Perform..." />
							</ListItem>

							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/emp_competency_evaluation');
								}}
							>
								<ListItemText inset primary="Employee Competency.." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/employees_promotion');
								}}
							>
								<ListItemText inset primary="Employees Promotion" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/training');
								}}
							>
								<ListItemText inset primary="Trainings" />
							</ListItem>

							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/training_venue');
								}}
							>
								<ListItemText inset primary="Training Venue" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/training_need_pre-requests');
								}}
							>
								<ListItemText inset primary="Training Need Pre-Req.." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/training_need_identification');
								}}
							>
								<ListItemText inset primary="Training Need..." />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/training_plan');
								}}
							>
								<ListItemText inset primary="Training Plan" />
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/training_record_and_evaluation');
								}}
							>
								<ListItemText
									inset
									primary="Training Record & Eval.."
								/>
							</ListItem>
							<ListItem
								button
								className={classes.menuItem}
								onClick={() => {
									history.push('/hr/job_description');
								}}
							>
								<ListItemText inset primary="Job Description" />
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
				<List>
					{['Accounting'].map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={() => {
								setOpen6(!open6);
							}}
						>
							<ListItemIcon
								style={{ background: 'black', color: 'whitesmoke' }}
							>
								{index % 2 === 0 ? <AssessmentIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={text}
								// onClick={() => {
								//   history.push("/marketing_dashboard");
								// }}
							/>
							{open5 ? <IconExpandLess /> : <IconExpandMore />}
						</ListItem>
					))}
					<Collapse in={open6} timeout="auto" unmountOnExit>
						<Divider />
						<List>
							{['Financial'].map((text, index) => (
								<ListItem
									button
									key={text}
									onClick={() => {
										setOpen7(!open7);
									}}
								>
									<ListItemIcon
										style={{
											background: 'black',
											color: 'whitesmoke',
										}}
									>
										{index % 2 === 0 ? (
											<img src={financialImg} width="25px" alt="" />
										) : (
											<MailIcon />
										)}
									</ListItemIcon>
									<ListItemText
										primary={text}
										// onClick={() => {
										//   history.push("/marketing_dashboard");
										// }}
									/>
									{open5 ? <IconExpandLess /> : <IconExpandMore />}
								</ListItem>
							))}
							<Collapse in={open7} timeout="auto" unmountOnExit>
								<Divider />
								<List component="div" disablePadding>
									<ListItem
										button
										className={classes.menuItem}
										onClick={() => {
											history.push('/finance/accounts/add_accounts');
										}}
									>
										<ListItemText inset primary="Add Accounts" />
									</ListItem>
									<ListItem
										button
										className={classes.menuItem}
										onClick={() => {
											history.push(
												'/finance/accounts/entries/add_entry'
											);
										}}
									>
										<ListItemText inset primary="Add Entries" />
									</ListItem>
								</List>
							</Collapse>
						</List>
						<List>
							{['Payroll'].map((text, index) => (
								<ListItem
									button
									key={text}
									onClick={() => {
										setOpen8(!open8);
									}}
								>
									<ListItemIcon
										style={{
											background: 'black',
											color: 'whitesmoke',
										}}
									>
										{index % 2 === 0 ? (
											<img src={financialImg} width="25px" alt="" />
										) : (
											<MailIcon />
										)}
									</ListItemIcon>
									<ListItemText
										primary={text}
										// onClick={() => {
										//   history.push("/marketing_dashboard");
										// }}
									/>
									{open5 ? <IconExpandLess /> : <IconExpandMore />}
								</ListItem>
							))}
							<Collapse in={open8} timeout="auto" unmountOnExit>
								<Divider />
								<List component="div" disablePadding>
									<ListItem
										button
										className={classes.menuItem}
										onClick={() => {
											history.push('/payroll/create');
										}}
									>
										<ListItemText inset primary="Employee Salaries" />
									</ListItem>
									<ListItem
										button
										className={classes.menuItem}
										onClick={() => {
											history.push(
												'/marketing_dashboard/order_log_sheet'
											);
										}}
									>
										<ListItemText
											inset
											primary="Employees Attendance"
										/>
									</ListItem>
								</List>
							</Collapse>
						</List>
					</Collapse>
				</List>
				
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
export default withRouter(Sidenav);
