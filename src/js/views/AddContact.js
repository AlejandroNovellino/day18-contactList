import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

// Importing the context
import { Context } from "../store/appContext";

export const AddContact = () => {
	// Take the params from the url
	let { action, id } = useParams();
	// Using the context
	const { store, actions } = useContext(Context);
	// Set the state to save the changes
	const [state, setState] = useState(actions.getContactInfo(id));

	const handleChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleClickOfSave = _ => {
		if (action == "add") {
			actions.addNewContact(state);
		} else if (action == "edit") {
			actions.editNewContact(id, state);
		}
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={state.full_name}
							name="full_name"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={state.email}
							name="email"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={state.phone}
							name="phone"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={state.address}
							name="address"
							onChange={handleChange}
						/>
					</div>
					<button type="button" className="btn btn-primary form-control" onClick={handleClickOfSave}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
