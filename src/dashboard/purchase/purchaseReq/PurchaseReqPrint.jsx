import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';

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
	},
	table: {
		marginBottom: 300,
	},
}));

const PurchaseReqPrint = () => {
	const classes = useStyles();

	return (
		<div className='text-center'>
			<div className='container'>
				<img src='./logo.png' alt='' />
				<h4>Hi-Tech Pipe & Engineering Industries</h4>
				<h6>Plot No X-22, Site Area Kotri</h6>
				<p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
				<h5 className='mt-5'>PURCHASE REQUISITION</h5>
			</div>
			<div className='container-fluid'>
				<div className='row text-center'>
					<div className='col-lg-6 col-md-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-4 col-md-4' align='right'>
								<p>Department</p>
							</div>
							<div className='col-lg-4 col-md-4 ml-3'>
								<p>Purchase</p>
								<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
							</div>
						</div>
					</div>
					<div className='col-lg-6 col-md-6 mt-4'>
						<div className='row no-gutters mt-2'>
							<div className='col-lg-4 col-md-4' align='right'>
								<p>Date</p>
							</div>
							<div className='col-lg-4 col-md-4 ml-3'>
								<p>26-4-21</p>
								<hr style={{ backgroundColor: 'black', paddingTop: 1 }} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.table}>
				<div
					className='table ml-auto mr-auto mt-4'
					style={{ marginTop: 'auto', marginBottom: 'auto' }}>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow hover role='checkbox'>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Sr.No
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										DESCRIPTION
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Quantity
									</StyledTableCell>
									<StyledTableCell className='text-dark bg-light' align='center'>
										Justification/Remarks
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<StyledTableRow>
									<StyledTableCell className='text-dark' align='center'>
										1.
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. At fugit
										consequatur
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										23
									</StyledTableCell>
									<StyledTableCell className='text-dark' align='center'>
										Good
									</StyledTableCell>
								</StyledTableRow>
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
			<div className='container'>
				<div className='row'>
					<div className='col-lg-2 col-md-2'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Initiated By</p>
					</div>
					<div className='offset-lg-3 offset-md-3 col-lg-2 col-md-2'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Department Head</p>
					</div>
					<div className='offset-lg-3 offset-md-3 col-lg-2 col-md-2'>
						<hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
						<p style={{ marginTop: -10 }}>Approved By</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseReqPrint;
