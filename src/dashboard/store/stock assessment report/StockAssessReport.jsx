import React, { useState, useEffect } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
	CustomButton,
	CustomTable,
	CustomContainer,
	CustomInput,
	generateOptions,
} from '../../../components';
import {
	createStockAssessmentReports,
	deleteStockAssessmentReports,
	getStockAssessmentReports,
} from '../../../services/action/stockAssessmentReportAction';
import { getMaterialAction } from '../../../services/action/MaterialDataHandle';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import EditStockAssesment from './EditStockAssesment';
import Loader from 'react-loader-spinner';

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
	properties: yup.string().required(),
	ok: yup.string().required(),
	reasonForRejection: yup.string().required(),
	remarks: yup.string().required(),
});

export const okOptions = [
	{
		value: 'true',
		name: 'OK',
	},
	{
		value: 'false',
		name: 'Rejected',
	},
];

const StockAssessReport = ({ history }) => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteError, setDeleteError] = useState('');
	const [open, setOpen] = useState(false);
	const [stock, setStock] = useState();

	const { stockAssessmentReports } = useSelector(
		(state) => state.stockAssessmentReport
	);

	const { materials } = useSelector((state) => state.materials);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMaterialAction());
		setFetchLoading(true);
		dispatch(
			getStockAssessmentReports(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = (values) => {
		setCreateLoading(true);
		dispatch(
			createStockAssessmentReports(values, (err) => {
				if (err) {
					setCreateError(err);
					setTimeout(() => {
						setCreateError('');
					}, 4000);
				}
				setCreateLoading(false);
			})
		);
	};

	const handleOpen = async (stock) => {
		setStock(stock);
		setOpen(true);
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const onDelete = (params) => {
		setDeleteLoading(true);
		dispatch(
			deleteStockAssessmentReports(params._id, (err) => {
				if (err) {
					setDeleteError(err);
					setTimeout(() => {
						setDeleteError('');
					}, 4000);
				}
				setDeleteLoading(false);
			})
		);
	};

	const navigateToPrint = (value) => {
		history.push({
			pathname:
				'/storedashboard/stock_assessment_report/print_stock_assesment_report',
			state: { report: value },
		});
	};

	return (
		<Sidenav title={'Stock Assessment Report'}>
			<EditStockAssesment show={open} handler={handleClose} stock={stock} />
			{deleteLoading && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Loader type="TailSpin" width="2rem" height="2rem" />
				</div>
			)}
			{deleteError && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<span>{deleteError}</span>
				</div>
			)}
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form>
							<CustomContainer>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
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
												props.touched.item && props.errors.item
											}
											error={props.touched.item && props.errors.item}
										/>
									</Grid>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="Quantity Examined"
											type="number"
											onChange={props.handleChange(
												'quantityExamined'
											)}
											value={props.values.quantityExamined}
											onBlur={props.handleBlur('quantityExamined')}
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
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="Item Retains/Item Properties"
											onChange={props.handleChange('properties')}
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
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="OK?"
											onChange={props.handleChange('ok')}
											value={props.values.ok}
											onBlur={props.handleBlur('ok')}
											helperText={
												props.touched.ok && props.errors.ok
											}
											error={props.touched.ok && props.errors.ok}
											selectValues={okOptions}
										/>
									</Grid>
								</Grid>
							</CustomContainer>
							<CustomContainer>
								<Grid container spacing={1} style={{ marginTop: 15 }}>
									<Grid item lg={3} md={3} sm={12} xs={12}>
										<CustomInput
											label="Reason For Rejection"
											onChange={props.handleChange(
												'reasonForRejection'
											)}
											value={props.values.reasonForRejection}
											onBlur={props.handleBlur('reasonForRejection')}
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
									<Grid item lg={3} md={3} sm={12} xs={12}>
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
								<div>
									<CustomButton
										text="Submit"
										variant="outlined"
										classNames="text-light"
										style={{
											backgroundColor: '#22A19A',
											marginTop: '10px',
										}}
										loading={createLoading}
										loaderColor="#fff"
									/>
									{createError && <p>{createError}</p>}
								</div>
							</CustomContainer>
						</Form>
					)}
				</Formik>
				<CustomTable
					fetchLoading={fetchLoading}
					data={stockAssessmentReports}
					heading="Materials"
					columnHeadings={[
						'Sr.No',
						'Item',
						'Qty Examined',
						'Items Retains/Items Properties',
						'Remarks',
					]}
					keys={['item.name', 'quantityExamined', 'properties', 'remarks']}
					firstOptionText="Edit"
					onFirstOptionClick={handleOpen}
					secondOptionText="Delete"
					onSecondOptionClick={onDelete}
					thirdOptionText="View"
					onThirdOptionClick={navigateToPrint}
					withSrNo
				/>
			</div>
		</Sidenav>
	);
};

export default StockAssessReport;
