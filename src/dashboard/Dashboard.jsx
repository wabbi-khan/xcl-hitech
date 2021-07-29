import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardImg1 from '../images/dashboard.png';
// import DashboardImg2 from '../images/2.PNG'
// import DashboardImg3 from '../images/3.PNG'
// import DashboardImg4 from '../images/4.PNG'
// import DashboardImg5 from '../images/5.PNG'
// import DashboardImg6 from '../images/6.PNG'
// import DashboardImg7 from '../images/7.PNG'
import Sidenav from './SideNav/Sidenav';
import { withRouter } from 'react-router-dom';
import './dashboard.css';
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
		<Sidenav title={'Dashboard'}>
			<div>
				<div className={classes.root}>
					<Grid container spacing={1}>
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-lg-3 col-md-4 col-xl-3'>
									<div className='card bg-c-blue order-card'>
										<div className='card-block'>
											<h6 className='m-b-20'>Orders Received</h6>
											<h2 className='text-right'>
												<i className='fa fa-cart-plus f-left'></i>
												<span>486</span>
											</h2>
											<p className='m-b-0'>
												Completed Orders<span className='f-right'>351</span>
											</p>
										</div>
									</div>
								</div>

								<div className='col-lg-3 col-md-4 col-xl-3'>
									<div className='card bg-c-green order-card'>
										<div className='card-block'>
											<h6 className='m-b-20'>Orders Received</h6>
											<h2 className='text-right'>
												<i className='fa fa-rocket f-left'></i>
												<span>486</span>
											</h2>
											<p className='m-b-0'>
												Completed Orders<span className='f-right'>351</span>
											</p>
										</div>
									</div>
								</div>

								<div className='col-lg-3 col-md-4 col-xl-3'>
									<div className='card bg-c-yellow order-card'>
										<div className='card-block'>
											<h6 className='m-b-20'>Orders Received</h6>
											<h2 className='text-right'>
												<i className='fa fa-refresh f-left'></i>
												<span>486</span>
											</h2>
											<p className='m-b-0'>
												Completed Orders<span className='f-right'>351</span>
											</p>
										</div>
									</div>
								</div>

								<div className='col-lg-3 col-md-4 col-xl-3'>
									<div className='card bg-c-pink order-card'>
										<div className='card-block'>
											<h6 className='m-b-20'>Orders Received</h6>
											<h2 className='text-right'>
												<i className='fa fa-credit-card f-left'></i>
												<span>486</span>
											</h2>
											<p className='m-b-0'>
												Completed Orders<span className='f-right'>351</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <Grid item lg={3} md={2} sm={12} xs={12} className={classes.images}>
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
                        </Grid> */}
					</Grid>
					<Grid container spacing={3}>
						<Grid item lg={12} md={12} sm={12} xs={12} className='mt-4'>
							<img src={DashboardImg1} alt='' width='70%' height='95%' />
						</Grid>
					</Grid>
					{/* <Grid container spacing={3}>
                        <Grid item lg={3} md={2} sm={12} xs={12} className={classes.images1}>
                            <div class="card">
                                <div class="card-header white">
                                    <div class="row">
                                        <div class="col-6">
                                            <p class="text-uppercase small mb-2"><strong>Sales</strong></p>
                                            <h5 class="font-weight-bold mb-0">
                                                $4567
                                            <small class="text-success ml-2">
                                                    <i class="fas fa-arrow-up fa-sm pr-1"></i>
                                                13,48%
                                            </small>
                                            </h5>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button type="button" class="btn btn-primary btn-sm mt-2">Details</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <canvas id="lineChart"></canvas>
                                </div>
                                <div class="card-footer white">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="d-flex flex-wrap">
                                                <div class="select-outline position-relative w-100">
                                                    <select class="mdb-select md-form md-outline">
                                                        <option value="1">Today</option>
                                                        <option value="2">Yesterday</option>
                                                        <option value="3" selected>Last 7 days</option>
                                                        <option value="4">Last 28 days</option>
                                                        <option value="5">Last 90 days</option>
                                                    </select>
                                                    <label>Example label</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="md-form md-outline">
                                                <input placeholder="Custom date" type="text" id="date-picker-example" class="form-control datepicker" />
                                                <label for="date-picker-example">Unselected</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>

                        </Grid>

                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>
                            <img src={DashboardImg3} alt="" width="240" height="200" />
                        </Grid>

                        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.images1}>
                            <img src={DashboardImg2} alt="" width="240" height="200" />
                        </Grid>
                    </Grid> */}

					{/* <div className="row">
                        <div className="col-lg-8">
                            <div className="bar-chart-example card">
                                <div className="card-close">
                                    <div className="dropdown">
                                        <button type="button" id="closeCard6" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </button>
                                        <div aria-labelledby="closeCard6" class="dropdown-menu dropdown-menu-right has-shadow">
                                            <a href="#" className="dropdown-item edit">
                                                <i className="fa fa-gear"></i>
                                                Edit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header d-flex align-items-center">
                                    <h3 className="h4">Bar Chart Example</h3>
                                </div>
                                <div className="card-body">
                                    <canvas id="barChartExample"></canvas>
                                </div>
                            </div>
                        </div>
                    </div> */}
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
	);
};

export default withRouter(Dashboard);
