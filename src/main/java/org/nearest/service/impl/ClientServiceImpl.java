package org.nearest.service.impl;

import org.nearest.dao.ClientDao;
import org.nearest.domain.Client;
import org.nearest.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService{
	
	@Autowired ClientDao clientDao;
	
	@Override
	public Client getClient(String id) {
		return clientDao.selectOne(id);
	}

  @Override
  public void addClient(Client client) {
    clientDao.insert(client);
  }
}
