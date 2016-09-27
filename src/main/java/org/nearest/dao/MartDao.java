package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Mart;

public interface MartDao {
	
	List<Mart> selectMartList();
	
	Mart selectMart(int no);
	Mart selectMartByAdmin(int adminNo);
}
