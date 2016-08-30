package org.nearest.service;

import java.util.List;

import org.nearest.domain.Admin;
import org.nearest.domain.Mart;
import org.nearest.domain.QNA;

public interface QNAService {
	void addQNA(QNA qna);
	List<Mart> getOrderMartList(int clientNo);
	List<QNA> getQNAList(int clientNo);
	List<QNA> getQNAListByAdmin(int pageNo, int pageSize, Admin admin);
	QNA getQNA(int no);
	int updateQNA(QNA qna);
	int deleteQNA(int no);
}
