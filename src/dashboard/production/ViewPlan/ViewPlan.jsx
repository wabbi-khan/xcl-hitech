import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../../purchase/material/Loading';
import { fetchPlanAction } from '../../../services/action/PlanAction';
import MaterialError from '../../purchase/material/MaterialError';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	addButton: {
		color: '#22A19A',
		borderWidth: 0,
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

const ViewPlan = (props) => {
	const dispatch = useDispatch();

	const { history, match } = props;

	const classes = useStyles();

	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const getPlan = async () => {
			setLoading(true);
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_API_URL}/plan/${match.params.planId}`
				);

				setPlans(data.data.plan.plan);
				setLoading(false);
			} catch (error) {}
		};

		getPlan();
	}, [match.params.planId]);

	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const onDelete = async () => {
		try {
			await axios.delete(
				`${process.env.REACT_APP_API_URL}/plan/${match.params.planId}`
			);

			window.location.pathname =
				'productionDashboard/weekly-production-plan';
		} catch (error) {}
	};

	return (
		<Sidenav title={'Weekly Production Plan'}>
			<div className={classes.root}>
				<div className={classes.dataTable}>
					<TableContainer className={classes.tableContainer}>
						<Table
							stickyHeader
							className="table table-dark"
							style={{
								backgroundColor: '#d0cfcf',
								border: '1px solid grey',
							}}
						>
							<TableHead>
								<TableRow hover role="checkbox">
									<StyledTableCell align="center">Day</StyledTableCell>
									<StyledTableCell align="center">
										Mgr.Date
									</StyledTableCell>
									<StyledTableCell align="center">
										Order No
									</StyledTableCell>
									<StyledTableCell align="center">
										Machine 1
									</StyledTableCell>
									<StyledTableCell align="center">
										Machine 2
									</StyledTableCell>
									<StyledTableCell align="center">
										Machine 3
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading ? (
									<Loading />
								) : error ? (
									<MaterialError />
								) : plans.length ? (
									plans.map((plan, i) => (
										<StyledTableRow>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{days[i]}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{plan.mgrDate ? plan.mgrDate : '---'}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{plan.orderNo ? plan.orderNo : '---'}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{plan.machine1 ? 'Used' : 'Not Used'}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{plan.machine2 ? 'Used' : 'Not Used'}
											</StyledTableCell>
											<StyledTableCell
												className="text-dark bg-light"
												align="center"
											>
												{plan.machine3 ? 'Used' : 'Not Used'}
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<h5>Not Found</h5>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							variant="outlined"
							color="primary"
							type="submit"
							style={{ marginRight: 20 }}
							onClick={() => {
								history.push({
									pathname:
										'/productionDashboard/weekly-production-plan/edit_plan',
									state: { plans, planId: match.params.planId },
								});
							}}
							className={`${classes.addButton} bg-warning text-light`}
						>
							Edit
						</Button>
						<Button
							variant="outlined"
							color="primary"
							type="submit"
							onClick={onDelete}
							className={`${classes.addButton} bg-danger text-light`}
						>
							Delete
						</Button>
					</div>
				</div>
			</div>
		</Sidenav>
	);
};

export default ViewPlan;
