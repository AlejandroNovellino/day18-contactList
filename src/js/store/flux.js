const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			baseUrl: "https://assets.breatheco.de/apis/fake/contact/",
			agenda_slug: "daniilKvyatAgenda",
			contactsList: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			createContact: async newContact => {
				const store = getStore();
				try {
					const response = await fetch(store.baseUrl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newContact)
					});

					if (response.ok) return null;

					throw new Error(response.status);
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 22 ~ getState ~ error`, error);
				}
			},
			deleteContact: async id => {
				const store = getStore();

				try {
					const response = await fetch(`${store.baseUrl}/${id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (response.ok) return null;

					throw new Error(response.status);
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 34 ~ getState ~ error`, error);
				}
			},
			editContact: async (id, editedContact) => {
				const store = getStore();

				try {
					const response = await fetch(`${store.baseUrl}/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(editedContact)
					});

					if (response.ok) return null;

					throw new Error(response.status);
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 52 ~ getState ~ error`, error);
				}
			},
			createAgenda: async _ => {
				// Create the agenda for the contact
				const store = getStore();

				const newContact = {
					full_name: "Daniil Kvyat",
					email: "torpedo@gmail.com",
					agenda_slug: "daniilKvyatAgenda",
					address: "00099 RS 26ST, 33434 UFA, RS",
					phone: "9990009999"
				};

				await getActions().createContact(newContact);
			},
			fetchAgenda: async _ => {
				// Fetch the agenda

				const store = getStore();
				const actions = getActions();

				try {
					const response = await fetch(store.baseUrl + "agenda/" + store.agenda_slug);

					if (response.ok) {
						const body = await response.json();

						setStore({
							contactsList: body
						});
					} else {
						await actions.createAgenda();
						actions.fetchAgenda();
					}
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 54 ~ getState ~ error`, error);
				}
			},
			addNewContact: async newContact => {
				newContact["agenda_slug"] = getStore().agenda_slug;

				try {
					await getActions().createContact(newContact);
					await getActions().fetchAgenda();
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 72 ~ getState ~ error`, error);
				}
			},
			deleteContactFromAgenda: async id => {
				try {
					await getActions().deleteContact(id);
					await getActions().fetchAgenda();
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 113 ~ getState ~ error`, error);
				}
			},
			getContactInfo: id => {
				// Get element from id

				if (id != "null") {
					const store = getStore();

					return store.contactsList.filter(element => {
						return element.id == id;
					})[0];
				} else {
					return {
						full_name: "",
						email: "",
						phone: "",
						address: ""
					};
				}
			},
			editNewContact: async (id, editedContact) => {
				try {
					await getActions().editContact(id, editedContact);
					await getActions().fetchAgenda();
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 143 ~ getState ~ error`, error);
				}
			}
		}
	};
};

export default getState;
