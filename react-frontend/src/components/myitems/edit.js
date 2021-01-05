import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	const history = useHistory();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		title: '',
		description: '',
		price: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('myitems/edit/itemdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				['title']: res.data.title,
				['description']: res.data.description,
				['price']: res.data.price,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put(`myitems/edit/` + id + '/', {
			price: formData.price,
		});
		history.push({
			pathname: '/myitems/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	if (!localStorage.getItem('access_token'))
		return <h2 align="center">Not editable</h2>;

	if (localStorage.getItem('access_token'))
		return (
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Change item price
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>

							<Grid item xs={12}>
								<TextField
									disabled="true"
									variant="outlined"
									required
									fullWidth
									id="title"
									label="Title"
									value={formData.title}
									multiline
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									disabled="true"
									variant="outlined"
									id="description"
									label="Description"
									required
									fullWidth
									value={formData.description}
									multiline
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
							OK
						</Button>

					</form>
				</div>
			</Container>
		);
}
