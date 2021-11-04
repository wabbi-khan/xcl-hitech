import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidenav from '../../SideNav/Sidenav';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import EditResponsibility from './EditResponsibility';
import {
	createResponsibilities,
	deleteResponsibilities,
	getResponsibilities,
} from '../../../services/action/responsibilityAction';
import {
	CustomContainer,
	CustomButton,
	CustomInput,
	CustomTable,
} from '../../../components';

const initialValue = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required('Responsibility is required'),
});

const Responsibilities = () => {
	const [open, setOpen] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [fetchLoading, setFetchLoading] = useState('');
	const [responsibility, setResponsibility] = useState({});

	const { responsibilities } = useSelector((state) => state.responsibilities);

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getResponsibilities(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = async (values, actions) => {
		setCreateLoading(true);
		dispatch(
			createResponsibilities(values, (err) => {
				setCreateLoading(false);
				if (err) {
					setCreateError(err);
					return;
				}
				actions.resetForms();
				setCreateError('');
			})
		);
	};

	const onDelete = async (params) => {
		dispatch(deleteResponsibilities(params._id));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (responsibility) => {
		setResponsibility(responsibility);
		setOpen(true);
	};

	return (
		<Sidenav title={'Responsibilities'}>
			<EditResponsibility
				show={open}
				handler={handleClose}
				responsibility={responsibility}
			/>

			<CustomContainer>
				<Formik
					initialValues={initialValue}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form autoComplete="off">
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<CustomInput
									label="Responsibility"
									onChange={props.handleChange('name')}
									value={props.values.name}
									onBlur={props.handleBlur('name')}
									helperText={props.touched.name && props.errors.name}
									error={props.touched.name && props.errors.name}
									width="30%"
								/>
							</div>
							<div>
								<CustomButton
									variant="outlined"
									color="primary"
									text="Submit"
									style={{
										backgroundColor: '#22A19A',
										color: '#fff',
										marginTop: '1rem',
									}}
									loading={createLoading}
									loaderColor="#fff"
									error={createError}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</CustomContainer>

			<CustomTable
				fetchLoading={fetchLoading}
				data={responsibilities}
				columnHeadings={['Sr.No', 'Education']}
				keys={['name']}
				firstOptionText="Edit"
				onFirstOptionClick={handleOpen}
				secondOptionText="Delete"
				onSecondOptionClick={onDelete}
				withSrNo
			/>
		</Sidenav>
	);
};

export default Responsibilities;
