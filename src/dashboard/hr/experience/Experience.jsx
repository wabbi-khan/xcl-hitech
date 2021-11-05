import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import {
	getExperiences,
	createExperience,
	deleteExperience,
} from '../../../services/action/ExperienceAction';
import EditExperience from './EditExperience';
import {
	CustomButton,
	CustomContainer,
	CustomInput,
	CustomTable,
} from '../../../components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const initialValues = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required(),
});

const Experience = () => {
	const [experience, setExperience] = useState('');
	const [open, setOpen] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');

	const dispatch = useDispatch();

	const { experiences } = useSelector((state) => state.experiences);

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getExperiences(null, () => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = (values, actions) => {
		setCreateLoading(true);
		dispatch(
			createExperience(values, (err) => {
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

	const onDelete = async (params) => {
		dispatch(deleteExperience(params._id));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = (exp) => {
		setExperience(exp);
		setOpen(true);
	};

	return (
		<Sidenav title="Experience">
			<EditExperience show={open} handler={handleClose} exp={experience} />
			<CustomContainer>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => (
						<Form autoComplete="off">
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<CustomInput
									label="Experience"
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
				data={experiences}
				columnHeadings={['Sr.No', 'Experience']}
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

export default Experience;
