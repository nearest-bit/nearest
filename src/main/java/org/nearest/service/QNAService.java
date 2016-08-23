package org.nearest.service;

import java.util.List;

import org.nearest.domain.QNA;

public interface QNAService {
	
	void addQNA(QNA qna);
	
	List<QNA> getQNAList(int clientNo);
	QNA getQNA(int no);
	int updateQNA(QNA qna);
	int deleteQNA(int no);
}
