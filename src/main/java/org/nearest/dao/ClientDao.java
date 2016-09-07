package org.nearest.dao;

import java.util.Map;

import org.nearest.domain.Client;

public interface ClientDao {
	
	Client selectOne(String id);
	Client selectOneByInfo(Map<String, Object> params);
	void insert(Client client);
	Map<String,Object> selectAlert(int clientNo);
	int updateClient (Map<String, Object> params);
}
