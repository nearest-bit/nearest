package org.nearest.service;

import org.nearest.domain.Client;

public interface ClientService {
	
	Client getClient(String id);
	void addClient(Client client);
}
