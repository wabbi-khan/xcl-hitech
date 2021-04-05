import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { red , grey} from '@material-ui/core/colors';
// import DashboardBtns from './DashboardBtns';
import { withRouter } from 'react-router';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import VehicleEntryBack from '../../../images/copy.JPG';
import LoginImg from '../../images/loginBack.jpg';
import { Typography } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },

    },
    iconColor: {
        color: 'white',
        [theme.breakpoints.up('md')]: {
            marginLeft: 7,
        },
    },
    small: {
        width: theme.spacing(3.8),
        height: theme.spacing(3.8),
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
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        backgroundColor: grey[900],
        color: 'white',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    drawerClose: {
        backgroundColor: grey[900],
        color: 'white',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        [theme.breakpoints.down('sm')]: {
            width: 0,
            display: 'none',
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
    },
    menuIcon: {
        [theme.breakpoints.down('sm')]: {
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
        },

    },
    title: {
        // marginTop: 2,
        fontSize: 26,
        [theme.breakpoints.up('md')]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
}));

const SideNav = (props) => {
    const { history, children, title } = props;
    console.log(history);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}
            style={{ backgroundImage: `url(${LoginImg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon className={classes.menuIcon} />
                    </IconButton>
                    <Typography variant="h4" noWrap className={classes.title}>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon className={classes.iconColor} /> : <ChevronLeftIcon className={classes.iconColor} />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard', 'Add Services', 'Add Vehicles', 'Change Price', 'Contact Us', 'Change Password', 'Logout'].map((text, index) => (
                        <ListItem button key={text}
                            onClick={() => {
                                if (text === 'Add Services') {
                                    history.push('/dashboard/AddServices');
                                }
                                else if (text === 'Add Vehicles') {
                                    history.push('/dashboard/AddVehicle');
                                }
                                else if (text === 'Change Price') {
                                    history.push('/dashboard/ChangePrice')
                                }
                                else if (text === 'Dashboard') {
                                    history.push('/dashboard')
                                }
                                else if (text === 'Contact Us') {
                                    history.push('/dashboard/contactus')
                                }
                                else if (text === 'Change Password') {
                                    history.push('/dashboard/carwashchangepass')
                                }
                                else if (text === 'Logout') {
                                    localStorage.removeItem("user")
                                    localStorage.removeItem("carwashName")
                                    history.push('/')
                                }
                            }}
                        >
                            <ListItemIcon className={classes.iconColor} >
                                {text === 'Dashboard' ? <HomeIcon /> : null}
                                {text === 'Add Services' ? <SettingsApplicationsIcon /> : null}
                                {text === 'Add Vehicles' ? <DriveEtaIcon /> : null}
                                {text === 'Change Price' ? <MonetizationOnIcon /> : null}
                                {text === 'Contact Us' ? <ContactSupportIcon /> : null}
                                {text === 'Change Password' ? <LockOpenIcon /> : null}
                                {text === 'Logout' ? <ExitToAppIcon /> : null}
                                {/* {index % 2 === 0 ?
                  <Avatar alt="Remy Sharp" src="https://www.seekpng.com/png/small/202-2027059_car-service-icon-car-service-icon-png.png" className={classes.firstImg} />
                    : 
                  <Avatar alt="Remy Sharp" src="https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-car-icon-png-image_515825.jpg" className={classes.small} />} */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                {/* <Divider /> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
            <div className="fixed-bottom text-white bg-dark text-center">
                <span >
                    Powered by XCL Technologies
        </span>
            </div>
        </div>
    );
}


export default (SideNav)
