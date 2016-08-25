package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.QNA;

public interface QNADao {
	void insert(QNA qna);
	List<QNA> selectQNAList(Map<String,Object> params);
	QNA selectOne(int no);
	List<QNA> update(Map<String,Object> replyInfo);
	int delete(int no);
}
