import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEducations,
	createEducation,
	deleteEducation,
} from '../../../services/action/EducationAction';
import EditEducation from './EditEducation';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
	CustomButton,
	CustomTable,
	CustomContainer,
	CustomInput,
} from '../../../components';

const initialValues = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
});

const Education = () => {
	const [education, setEducation] = useState();
	const [open, setOpen] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');

	const dispatch = useDispatch();

	const { educations } = useSelector((state) => state.educations);

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getEducations(null, () => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmitDate = (values, actions) => {
		setCreateLoading(true);
		dispatch(
			createEducation(values, (err) => {
				setCreateLoading(false);
				if (err) {
					setCreateError(err);
					return;
				}
				actions.resetForm();
				setCreateError('');
			})
		);
	};

	const deleteCategory = async (params) => {
		dispatch(deleteEducation(params._id));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (edu) => {
		setEducation(edu);
		setOpen(true);
	};

	return (
		<Sidenav title={'Education'}>
			<EditEducation show={open} handler={handleClose} edu={education} />
			<div>
				<CustomContainer>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmitDate}
					>
						{(props) => (
							<Form autoComplete="off">
								<div
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									<CustomInput
										label="Education Name"
										onChange={props.handleChange('name')}
										value={props.values.name}
										onBlur={props.handleBlur('name')}
										helperText={
											props.touched.name && props.errors.name
										}
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
					data={educations}
					columnHeadings={['Sr.No', 'Education']}
					keys={['name']}
					firstOptionText="Edit"
					onFirstOptionClick={handleOpen}
					secondOptionText="Delete"
					onSecondOptionClick={deleteCategory}
					withSrNo
				/>
			</div>
		</Sidenav>
	);
};

export default Education;
