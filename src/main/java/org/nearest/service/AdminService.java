package org.nearest.service;

import org.nearest.domain.Admin;

public interface AdminService {
	
	Admin getAdmin(String id);
	Admin checkboxLogin(String id);
}
