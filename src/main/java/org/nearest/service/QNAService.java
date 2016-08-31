package org.nearest.service;

import java.util.List;

import org.nearest.domain.Admin;
import org.nearest.domain.Mart;
import org.nearest.domain.QNA;

public interface QNAService {
	void addQNA(QNA qna);
	List<Mart> getOrderMartList(int clientNo);
	List<QNA> getQNAList(int clientNo);
	List<QNA> getQNAListByAdmin(Admin admin);
	QNA getQNA(int no);
	QNA getQNAForStatus(int clientNo, int contentNo);
	int updateQNA(String replyContent, int clientNo, Admin admin, int contentNo);
	int deleteQNA(int no);

}
