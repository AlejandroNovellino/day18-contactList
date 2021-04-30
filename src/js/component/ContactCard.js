import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import daniiPhoto from "../../img/m101.jpg";

// Importing the context
import { Context } from "../store/appContext";

export const ContactCard = ({ id, name, address, phone, email }) => {
	const [state, setState] = useState({
		//initialize state here
		id: id
	});
	// Using the context
	const { store, actions } = useContext(Context);

	const handleDelete = _ => {
		actions.deleteContactFromAgenda(state.id);
	};

	return (
		<li className="list-group-item">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img src={daniiPhoto} alt="Danii" className="rounded-circle mx-auto d-block img-fluid" />
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className=" float-right">
						<Link className="btn" to={`contact/edit/${state.id}`}>
							<i className="fas fa-pencil-alt mr-3" />
						</Link>
						<button className="btn" onClick={handleDelete}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<label className="name lead">{name}</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">{address}</span>
					<br />
					<span className="fa fa-phone fa-fw text-muted mr-3" data-toggle="tooltip" title="" />
					<span className="text-muted small">{phone}</span>
					<br />
					<span
						className="fa fa-envelope fa-fw text-muted mr-3"
						data-toggle="tooltip"
						data-original-title=""
						title=""
					/>
					<span className="text-muted small text-truncate">{email}</span>
				</div>
			</div>
		</li>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func,
	id: PropTypes.string,
	name: PropTypes.string,
	address: PropTypes.string,
	phone: PropTypes.string,
	email: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
