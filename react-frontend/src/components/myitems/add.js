import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Add() {

	const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
		description: '',
		price: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post(`myitems/add/`, {
				title: formData.title,
				description: formData.description,
				price: formData.price
			})
			.then((res) => {
				history.push('/myitems/');
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add new item
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Title"
								name="title"
								autoComplete="title"
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoComplete="description"
								onChange={handleChange}
								multiline
								rows={10}
							/>
						</Grid>

						<Grid item xs={5}>
							<TextField
								type={"number"}
								variant="outlined"
								required
								fullWidth
								id="price"
								label="Price"
								name="price"
								autoComplete="price"
								value={formData.price}
								onChange={handleChange}
							/>
						</Grid>

					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Add
					</Button>
				</form>
			</div>
		</Container>
	);
}
