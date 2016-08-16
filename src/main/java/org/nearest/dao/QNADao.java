package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.QNA;

public interface QNADao {
	void insert(QNA qna);
	List<QNA> selectList(Map<String,Object> params);
	QNA selectOne(int no);
	int update(QNA qna);
	int delete(int no);
}