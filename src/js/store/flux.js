const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			baseUrl: "https://assets.breatheco.de/apis/fake/contact/",
			agendaSlug: "daniilKvyatAgenda",
			contactsList: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
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

				try {
					const response = await fetch(store.baseUrl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newContact)
					});
				} catch (error) {
					console.log(`🚀 ~ file: flux.js ~ line 14 ~ getState ~ error`, error);
				}
			},
			fetchAgenda: async _ => {
				// Fetch the agenda

				const store = getStore();
				const actions = getActions();

				try {
					const response = await fetch(store.baseUrl + "agenda/" + store.agendaSlug);

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
			}
		}
	};
};

export default getState;
