package org.nearest.service;

import java.util.Map;

import org.nearest.domain.Client;

public interface ClientService {
	
	Client getClient(String id);
	void addClient(Client client);
	Map<String,Object> checkAlert(int clientNo);
}
