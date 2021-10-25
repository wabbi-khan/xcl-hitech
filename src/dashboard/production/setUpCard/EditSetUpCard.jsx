import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { fetchCardAction } from '../../../services/action/CardAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { getVendorAction } from '../../../services/action/VendorAction';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: 'auto',
		width: '80%',
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
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
			// width: '12%',
		},
	},
	inputFieldStyle: {
		[theme.breakpoints.up('md')]: {
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
		},
	},
	inputFieldStyle1: {
		marginTop: 10,
		[theme.breakpoints.up('md')]: {
			width: 330,
		},
		[theme.breakpoints.down('sm')]: {
			width: 200,
			marginTop: 10,
		},
	},
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'black',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'black',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'black',
			},
		},
	},
})(TextField);

const EditSetUpCard = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCardAction());
		dispatch(getMaterialAction());
		dispatch(getVendorAction());
	}, [dispatch]);

	const { materials } = useSelector((state) => state.materials);
	const { vendors } = useSelector((state) => state.vendors);

	const { show, close, card, onSubmit } = props;

	const [open, setOpen] = useState(false);

	const { handleSubmit } = useForm();
	const [inputFields, setInputFields] = useState(card);

	useEffect(() => {
		setOpen(show);
	}, [show]);
	useEffect(() => {
		setInputFields({
			...card,
			supplier: card.supplier._id,
			material: card.material._id,
		});
	}, [card]);

	const onChangeHandler = (e, placeholder) => {
		setInputFields({ ...inputFields, [placeholder]: e.target.value });
	};

	const onSubmitData = () => {
		onSubmit(inputFields);
	};

	const handleClose = () => {
		setOpen(false);
		close();
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h5 className="text-center mt-4">Edit Card</h5>
						<Container className={classes.mainContainer}>
							{/* ========================================= */}
							{card ? (
								<form onSubmit={handleSubmit(onSubmitData)}>
									<Grid container spacing={1}>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Select Material"
												variant="outlined"
												type="text"
												autoComplete="off"
												className={classes.inputFieldStyle}
												size="small"
												onChange={(e) =>
													onChangeHandler(e, 'material')
												}
												select
												value={inputFields.material}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											>
												{!materials || !materials.length ? (
													<p>Data Not Found</p>
												) : (
													materials.map((material, i) => (
														<MenuItem
															value={material._id}
															key={i}
														>
															{material.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Select Vendor"
												variant="outlined"
												type="text"
												autoComplete="off"
												size="small"
												select
												onChange={(e) =>
													onChangeHandler(e, 'supplier')
												}
												value={inputFields.supplier}
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
											>
												{!vendors || !vendors.length ? (
													<p>Data Not Found</p>
												) : (
													vendors.map((vendor, i) => (
														<MenuItem value={vendor._id} key={i}>
															{vendor.name}
														</MenuItem>
													))
												)}
											</CssTextField>
										</Grid>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Min"
												variant="outlined"
												type="text"
												size="small"
												autocomplete="off"
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												style={{ marginBottom: 10 }}
												value={inputFields.min}
												onChange={(e) => onChangeHandler(e, 'min')}
											/>
										</Grid>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Max"
												variant="outlined"
												type="text"
												size="small"
												autocomplete="off"
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												style={{ marginBottom: 10 }}
												value={inputFields.max}
												onChange={(e) => onChangeHandler(e, 'max')}
											/>
										</Grid>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<CssTextField
												id="outlined-basic"
												label="Avg"
												variant="outlined"
												type="text"
												size="small"
												autocomplete="off"
												className={classes.inputFieldStyle}
												inputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{
													style: { fontSize: 14 },
												}}
												style={{ marginBottom: 10 }}
												value={inputFields.avg}
												onChange={(e) => onChangeHandler(e, 'avg')}
											/>
										</Grid>
									</Grid>
									<div>
										<Button
											className="bg-warning text-light"
											type="submit"
											style={{ marginRight: 10 }}
										>
											Update
										</Button>
										<Button
											className="bg-danger text-light ml-1"
											onClick={handleClose}
										>
											Close
										</Button>
									</div>
								</form>
							) : null}
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditSetUpCard;
