package org.nearest.dao;

import org.nearest.domain.Admin;

public interface AdminDao {
	
	Admin selectOne (String id);
	Admin getManagerLogin (String id);
}
