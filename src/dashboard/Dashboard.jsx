import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardImg1 from '../images/1.PNG'
import DashboardImg2 from '../images/2.PNG'
import DashboardImg3 from '../images/3.PNG'
import DashboardImg4 from '../images/4.PNG'
import DashboardImg5 from '../images/5.PNG'
import DashboardImg6 from '../images/6.PNG'
import DashboardImg7 from '../images/7.PNG'
import Sidenav from './SideNav/Sidenav';
import {withRouter} from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    // root: {
    //     maxWidth: 345,
    //     backgroundColor: 'grey',
    //     marginRight: 900,

    // },
    root: {
        flexGrow: 1,
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        // color: theme.palette.text.secondary,
    },
    images: {
        [theme.breakpoints.up('md')]: {
            marginTop: 5,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: -10,
            marginTop: -10,
        },
    },
    images1: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 30,
            marginTop: 50,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: -10,
            marginTop: 10,
        },
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Sidenav title={ 'Dashboard' }>
            <div>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.images}>
                            <img src={DashboardImg4} alt="" width="290" height="210"/>
                        </Grid>
                        
                        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.images}>
                            <img src={DashboardImg5} alt="" width="290" height="210" />
                        </Grid>
                        
                        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.images}>
                            <img src={DashboardImg6} alt="" width="290" height="210" />
                        </Grid>
                        
                        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.images}>
                            <img src={DashboardImg7} alt="" width="290" height="210" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>
                            <img src={DashboardImg1} alt="" width="240" height="200"/>
                        </Grid>
                        
                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>
                            <img src={DashboardImg2} alt="" width="240" height="200" />
                        </Grid>
                        
                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>
                            <img src={DashboardImg3} alt="" width="240" height="200" />
                        </Grid>
                        
                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>
                            <img src={DashboardImg2} alt="" width="240" height="200" />
                        </Grid>
                    </Grid>
                    
                </div>
                {/* <h1>saheeer</h1> */}
                {/* <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card> */}
            </div>
        </Sidenav>
    )
}

export default withRouter(Dashboard)
