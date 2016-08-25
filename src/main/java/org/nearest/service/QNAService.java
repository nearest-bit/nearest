package org.nearest.service;

import java.util.List;

import org.nearest.domain.Admin;
import org.nearest.domain.QNA;

public interface QNAService {
	
	void addQNA(QNA qna);
	
	List<QNA> getQNAListByAdmin(int pageNo, int pageSize, Admin admin);
	QNA getQNA(int no);
	List<QNA> updateQNA(String replyContent, Admin admin);
	int deleteQNA(int no);
}
