package org.nearest.dao;

import java.util.List;

import org.nearest.domain.QNA;

public interface QNADao {
	void insert(QNA qna);
	List<QNA> selectQNAList(int clientNo);
	QNA selectOne(int no);
	int update(QNA qna);
	int delete(int no);
}
