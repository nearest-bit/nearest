package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Mart;
import org.nearest.domain.QNA;

public interface QNADao {
	List<QNA> selectQNAList(int clientNo);
	List<QNA> selectQNAListByAdmin(Map<String,Object> params);
	QNA selectOne(int no);
	int update(QNA qna);
	int delete(int no);
	List<Mart> selectOrderMartList(int clientNo);
	void insertQNA(QNA qna);
}
