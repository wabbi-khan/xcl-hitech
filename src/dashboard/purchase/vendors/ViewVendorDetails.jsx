import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
// import EditVendor from './EditVendor';
// import Loading from '../material/Loading';
// import MaterialError from '../material/MaterialError';

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

// function createData(No, name, Action) {
//     return { No, name, Action };
// }

// const rows = [
//     createData(1, 'Item1'),

// ];

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	mainContainer: {
		textAlign: 'center',
		[theme.breakpoints.up('md')]: {
			marginLeft: 0,
			marginTop: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: -15,
		},
	},
	addButton: {
		marginTop: 20,
		color: '#22A19A',
		borderColor: '#22A19A',
		fontWeight: 'bold',
		'&:hover': {
			border: 'none',
			backgroundColor: '#22A19A',
			color: 'whitesmoke',
		},
		[theme.breakpoints.up('md')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '30%',
		},
	},
	table: {
		minWidth: 600,
	},
	dataTable: {
		marginTop: 40,
	},
	ckeckBox: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 7,
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	inputFieldStyle: {
		// boxShadow: '0.4px 0.4px 0.4px 0.4px grey',
		// borderRadius: 5,
		[theme.breakpoints.up('md')]: {
			width: 250,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
}));

const ViewVendorDetails = (props) => {
	const id = props.match.params.id;
	const classes = useStyles();

	const [vendor, setVendor] = useState({});

	const getSingleVendor = async (id) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}/vendor/id/${id}`,
			);
			setVendor(data.vendor);
		} catch (error) {
			document.write('Internal Server Error: ' + error);
		}
	};

	useEffect(() => {
		getSingleVendor(id);
	}, [id]);

	const date = new Date();
	const currDate = date.getDate();
	const months = date.getMonth() + 1;
	const years = date.getFullYear();
	const fullDate = `${currDate} / ${months} / ${years}`;

	return (
		<div className='text-center'>
			<div className='container'>
				<img src='./logo.png' alt='' />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className='mt-5'>Goods Received and Inspection Report</h5>
			</div>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-lg-6 col-md-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-4 col-md-4' align='right'>
								<p>Date</p>
							</div>
							<div className='col-lg-4 col-md-4 ml-3'>
								<p>{fullDate}</p>
								<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
							</div>
						</div>
					</div>
					<div
						className='offset-lg-4 offset-md-4 col-lg-2 col-md-2 mt-4'
						id='printBtn'>
						<Button
							variant='contained'
							size='small'
							className='bg-dark text-light'
							onClick={() => window.print()}>
							Print
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.table}>
				<div className='table ml-auto mr-auto mt-4'>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Vendor Name
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Phone No.
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Address
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Category
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!vendor ? null : (
									<StyledTableRow>
										<StyledTableCell className='text-dark' align='center'>
											1.
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{vendor.name}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{vendor.phone}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{vendor.location}
										</StyledTableCell>
										<StyledTableCell className='text-dark' align='center'>
											{!vendor.category ? null : vendor.category.name}
										</StyledTableCell>
									</StyledTableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{/* <thead class="thead-dark">
                    <tr>
                    <th>S.No.</th>
                    <td colspan="5">
                    <th>DESCRIPTION</th>
                    </td>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Remarks</th>
                    </tr>
                </thead> */}
				</div>
			</div>
			<div className={classes.table1}>
				<div className='table ml-auto mr-auto mt-4'>
					{/* <h6>Purchase Inspection Materials</h6> */}
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Material Name
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Unit
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!vendor.material || !vendor.material.length ? (
									<span>Not Found</span>
								) : (
									vendor.material.map((mat, i) => (
										<StyledTableRow key={i}>
											<StyledTableCell className='text-dark' align='center'>
												{i + 1}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{mat.name}
											</StyledTableCell>
											<StyledTableCell className='text-dark' align='center'>
												{mat.unit}
											</StyledTableCell>
										</StyledTableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{/* <thead class="thead-dark">
                    <tr>
                    <th>S.No.</th>
                    <td colspan="5">
                    <th>DESCRIPTION</th>
                    </td>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Remarks</th>
                    </tr>
                </thead> */}
				</div>
			</div>
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-lg-3 col-md-3 mt-4'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Store Incharge</p>
					</div>
					<div className='offset-lg-6 offset-md-6 col-lg-3 col-md-3 mt-4'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Q.A Dept</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewVendorDetails;
