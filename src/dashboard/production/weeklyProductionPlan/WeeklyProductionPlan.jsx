import React, { useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanAction } from '../../../services/action/PlanAction';
import Loading from '../../purchase/material/Loading';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	addButton: {
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '10%',
		},
		[theme.breakpoints.down('sm')]: {
			// width: '12%',
		},
	},
}));

const WeeklyProductionPlan = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPlanAction());
	}, [dispatch]);

	const { plans, error } = useSelector((state) => state.plans);
	const { history } = props;

	const classes = useStyles();

	return (
		<Sidenav title={'Weekly Production Plan'}>
			<div className={classes.root}>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-end',
					}}>
					<Button
						variant='outlined'
						color='primary'
						className={classes.addButton}
						onClick={() => {
							history.push('/productionDashboard/weekly-production-plan/add-new-plan');
						}}>
						Add New Plan
					</Button>
				</div>
				<div style={{ marginTop: 40 }}>
					{plans ? (
						plans.length > 0 ? (
							plans.map((el, i) => (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										marginBottom: 30,
									}}>
									<h3 style={{ margin: 0 }}>{`Week: 0${i + 1}`}</h3>
									<Button
										style={{ marginLeft: 20 }}
										variant='outlined'
										color='primary'
										onClick={() => {
											history.push(
												`/productionDashboard/weekly-production-plan/${el._id}`,
											);
										}}
										className={classes.addButton}>
										View Plan
									</Button>
								</div>
							))
						) : (
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<h1>Not found</h1>
							</div>
						)
					) : error ? (
						<h1>{error.message}</h1>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</Sidenav>
	);
};

export default WeeklyProductionPlan;
