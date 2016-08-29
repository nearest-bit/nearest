package org.nearest.service;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Mart;

public interface MartService {
	List<Mart> getMartList();
	
	Mart getMart(int no);
	Mart getMartByAdmin(int adminNo);
}
