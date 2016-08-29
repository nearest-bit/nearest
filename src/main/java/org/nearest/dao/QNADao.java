package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.QNA;

public interface QNADao {
	void insert(QNA qna);
	List<QNA> selectQNAList(int clientNo);
	List<QNA> selectQNAListByAdmin(Map<String,Object> params);
	QNA selectQNA(int no);
	QNA selectQNAForStatus(Map<String,Object> param);
	int updateQNA(Map<String,Object> replyInfo);
	int delete(int no);
}
