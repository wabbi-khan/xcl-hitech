import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
	CustomContainer,
	CustomInput,
	generateOptions,
} from '../../../components';
import Button from '../../../components/utils/Button';
import { updateStockAssessmentReports } from '../../../services/action/stockAssessmentReportAction';
import { okOptions } from './StockAssessReport';

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
		width: 500,
	},
	mainContainer: {
		textAlign: 'center',
		marginTop: 20,
	},
}));

const initialValues = {
	item: '',
	quantityExamined: '',
	properties: '',
	ok: '',
	reasonForRejection: '',
	remarks: '',
};

const validationSchema = yup.object({
	item: yup.string().required(),
	quantityExamined: yup.string().required(),
	properties: yup.string(),
	ok: yup.string().required(),
	reasonForRejection: yup.string().required(),
	remarks: yup.string().required(),
});

const EditStockAssesment = (props) => {
	const { stock } = props;

	const classes = useStyles();

	const { show, handler } = props;
	const [initialValuesState, setInitialValuesState] = useState({
		...initialValues,
	});
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState('');

	const dispatch = useDispatch();

	const { materials } = useSelector((state) => state.materials);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const onSubmit = async (values) => {
		dispatch(
			updateStockAssessmentReports(stock._id, values, (err) => {
				if (err) {
				} else {
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);
				}
			})
		);
	};

	const handleClose = () => {
		handler(false);
	};

	useEffect(() => {
		if (stock) {
			setInitialValuesState({
				...stock,
				item: stock.item._id,
			});
		}
	}, [stock]);

	return (
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
					<h5 className="text-center mt-4">Update</h5>
					<CustomContainer>
						{stock ? (
							<Formik
								initialValues={initialValuesState}
								validationSchema={validationSchema}
								enableReinitialize
								onSubmit={onSubmit}
							>
								{(props) => (
									<Form>
										<Grid container spacing={1}>
											<Grid lg={12} md={12} sm={12}>
												<CustomInput
													label="Select Item"
													selectValues={generateOptions(
														materials,
														'name',
														'_id'
													)}
													onChange={props.handleChange('item')}
													value={props.values.item}
													onBlur={props.handleBlur('item')}
													helperText={
														props.touched.item &&
														props.errors.item
													}
													error={
														props.touched.item &&
														props.errors.item
													}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
												<CustomInput
													label="Quantity Examined"
													type="number"
													onChange={props.handleChange(
														'quantityExamined'
													)}
													value={props.values.quantityExamined}
													onBlur={props.handleBlur(
														'quantityExamined'
													)}
													helperText={
														props.touched.quantityExamined &&
														props.errors.quantityExamined
													}
													error={
														props.touched.quantityExamined &&
														props.errors.quantityExamined
													}
												/>
											</Grid>

											<Grid lg={12} md={12} sm={12} className="mt-3">
												<CustomInput
													label="Item Retains/Item Properties"
													onChange={props.handleChange(
														'properties'
													)}
													value={props.values.properties}
													onBlur={props.handleBlur('properties')}
													helperText={
														props.touched.properties &&
														props.errors.properties
													}
													error={
														props.touched.properties &&
														props.errors.properties
													}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
												<CustomInput
													label="OK?"
													onChange={props.handleChange('ok')}
													value={props.values.ok}
													onBlur={props.handleBlur('ok')}
													helperText={
														props.touched.ok && props.errors.ok
													}
													error={
														props.touched.ok && props.errors.ok
													}
													selectValues={okOptions}
												/>
												{/* <Autocomplete
                          options={units}
                          label="name"
                          onChange={props.handleChange("unit")}
                          value={units.find(
                              (el) => el._id === props.values.unit
                              )}
                          onBlur={props.handleBlur("unit")}
                          helperText={props.touched.unit && props.errors.unit}
                          error={props.touched.unit && props.errors.unit}
                          style={{ width: "100%", marginTop: 20 }}
                          inputProps={{ style: { fontSize: 14 } }}
                          InputLabelProps={{ style: { fontSize: 14 } }}
                          labelText="Select Unnit"
                        /> */}
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid lg={12} md={12} sm={12} className="mt-3">
												<CustomInput
													label="Reason For Rejection"
													onChange={props.handleChange(
														'reasonForRejection'
													)}
													value={props.values.reasonForRejection}
													onBlur={props.handleBlur(
														'reasonForRejection'
													)}
													helperText={
														props.touched.reasonForRejection &&
														props.errors.reasonForRejection
													}
													error={
														props.touched.reasonForRejection &&
														props.errors.reasonForRejection
													}
												/>
											</Grid>
											<Grid lg={12} md={12} sm={12} className="mt-3">
												<CustomInput
													label="Remarks"
													onChange={props.handleChange('remarks')}
													value={props.values.remarks}
													onBlur={props.handleBlur('remarks')}
													helperText={
														props.touched.remarks &&
														props.errors.remarks
													}
													error={
														props.touched.remarks &&
														props.errors.remarks
													}
												/>
											</Grid>
										</Grid>
										<div
											style={{
												marginTop: '2rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<Button
												variant="contained"
												color="primary"
												text="Update"
												style={{ marginRight: '1rem' }}
											/>
											<Button
												variant="outlined"
												color="dark"
												onClick={handleClose}
												text="Close"
												type="button"
												classNames="bg-danger text-light"
											/>
										</div>
										{success && <p>Successfully Updated</p>}
									</Form>
								)}
							</Formik>
						) : null}
					</CustomContainer>
				</div>
			</Fade>
		</Modal>
	);
};

export default EditStockAssesment;
