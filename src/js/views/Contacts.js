import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

// Importing the context
import { Context } from "../store/appContext";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false
	});
	// Using the context
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/contact/add/null">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{/*<ContactCard onDelete={() => setState({ showModal: true })} />*/}
						{store.contactsList.map(element => {
							return (
								<ContactCard
									key={element.id}
									id={element.id}
									name={element.full_name}
									address={element.address}
									phone={element.phone}
									email={element.email}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
