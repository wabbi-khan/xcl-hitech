import React from 'react';
import Sidenav from '../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardImg1 from '../../images/dashboard.png';
// import DashboardImg2 from '../../images/2.PNG'
// import DashboardImg3 from '../../images/3.PNG'
// import DashboardImg4 from '../../images/4.PNG'
// import DashboardImg5 from '../../images/5.PNG'
// import DashboardImg6 from '../../images/6.PNG'
// import DashboardImg7 from '../../images/7.PNG'
// import { withRouter } from 'react-router-dom';

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
			marginLeft: 30,
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

const PurchaseDashboard = () => {
	const classes = useStyles();

	return (
		<Sidenav title={'Purchase Dashboard'}>
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
				</div>
			</div>
		</Sidenav>
	);
};

export default PurchaseDashboard;
