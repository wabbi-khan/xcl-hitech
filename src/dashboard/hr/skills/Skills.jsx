import React, { useEffect, useState } from 'react';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSkills,
	deleteSkill,
	createSkill,
} from '../../../services/action/SkillsAction';
import EditSkills from './EditSkills';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
	CustomButton,
	CustomTable,
	CustomContainer,
	CustomInput,
} from '../../../components';

const initialValues = {
	skill: '',
};

const validationSchema = yup.object({
	skill: yup.string().required(),
});

const Skills = () => {
	const [fetchLoading, setFetchLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [open, setOpen] = useState(false);
	const [skill, setSkill] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getSkills(null, (err) => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const { skills } = useSelector((state) => state.skills);

	const onSubmit = (values, actions) => {
		setCreateLoading(true);
		dispatch(
			createSkill(values, (err) => {
				setCreateLoading(false);
				if (err) {
					setCreateError(err);
					return;
				}
				setCreateError('');
				actions.resetForm();
			})
		);
	};

	const deleteSkillFunc = (params) => {
		dispatch(deleteSkill(params._id));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (skill) => {
		setSkill(skill);
		setOpen(true);
	};

	return (
		<Sidenav title={'Skills'}>
			<EditSkills show={open} handler={handleClose} skill={skill} />

			<div>
				<CustomContainer>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form autoComplete="off">
								<div
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									<CustomInput
										label="Enter Skill Name"
										onChange={props.handleChange('skill')}
										value={props.values.skill}
										onBlur={props.handleBlur('skill')}
										helperText={
											props.touched.skill && props.errors.skill
										}
										error={props.touched.skill && props.errors.skill}
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
					data={skills}
					columnHeadings={['Sr.No', 'Skill']}
					keys={['skill']}
					firstOptionText="Edit"
					onFirstOptionClick={handleOpen}
					secondOptionText="Delete"
					onSecondOptionClick={deleteSkillFunc}
					withSrNo
				/>
			</div>
		</Sidenav>
	);
};

export default Skills;
