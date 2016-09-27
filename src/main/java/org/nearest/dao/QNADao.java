package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Mart;
import org.nearest.domain.QNA;

public interface QNADao {
	List<QNA> selectQNAList(int clientNo);
	List<QNA> selectQNAListByAdmin(Map<String,Object> params);
	List<QNA> selectQNAlistByCalendar(Map<String,Object> params);
	QNA selectQNA(int no);
	QNA selectQNAForStatus(Map<String,Object> param);
	int updateQNA(Map<String,Object> replyInfo);
	int delete(int no);
	List<Mart> selectOrderMartList(int clientNo);
	void insertQNA(QNA qna);
	int updateClientQna(int qnaNo);
	
}
