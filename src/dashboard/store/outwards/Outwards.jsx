import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../../components/utils/Button';
import { useForm } from 'react-hook-form';

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
		marginTop: 70,
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
	mainBtn: {
		borderColor: '#22A19A',
		backgroundColor: '#22A19A',
		color: 'whitesmoke',
		fontWeight: 500,
		fontSize: '13.5px',
		border: '1px solid #22A19A',
		'&:hover': {
			border: '1px solid #22A19A',
			color: '#22A19A',
		},
		// [theme.breakpoints.up('md')]: {
		//     width: '15%',
		// },
		// [theme.breakpoints.down('sm')]: {
		//     width: '30%',
		// },
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
}));

const Outwards = ({ history }) => {
	const classes = useStyles();

	const { handleSubmit } = useForm();

	const onSubmitData = () => {};

	return (
		<Sidenav title={'Outwards'}>
			<div>
				<div class="container mt-5">
					<form onSubmit={handleSubmit(onSubmitData)}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								gap: '5rem',
							}}
						>
							<Button
								text="Item Outward"
								size="large"
								variant="contained"
								classNames={classes.mainBtn}
								onClick={() => {
									history.push(
										'/storedashboard/outwards/item_outwards'
									);
								}}
							/>
							<Button
								text="Non-Returnable Outward Gate Pass"
								size="large"
								variant="contained"
								classNames={classes.mainBtn}
								onClick={() => {
									history.push('');
								}}
							/>
							<Button
								text="Returnable Outward Gate Pass"
								size="large"
								variant="contained"
								classNames={classes.mainBtn}
								onClick={() => {
									history.push('');
								}}
							/>
						</div>
					</form>
				</div>
			</div>
		</Sidenav>
	);
};

export default Outwards;
