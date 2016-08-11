package org.nearest.dao;

import org.nearest.domain.Client;

public interface ClientDao {
	
	Client selectOne(String id);
	void insert(Client client);
}
