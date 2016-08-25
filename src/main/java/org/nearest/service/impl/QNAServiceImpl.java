package org.nearest.service.impl;

import java.util.HashMap;
import java.util.List;

import org.nearest.dao.QNADao;
import org.nearest.domain.Admin;
import org.nearest.domain.QNA;
import org.nearest.service.QNAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QNAServiceImpl implements QNAService{
	
	@Autowired QNADao qnaDao;
	
	@Override
	public void addQNA(QNA qna){
		qnaDao.insert(qna);
	}
	
	@Override
	public List<QNA> getQNAListByAdmin(int pageNo, int pageSize, Admin admin){
		HashMap<String,Object> params = new HashMap<>();
		params.put("startIndex", (pageNo - 1) * pageSize);
		params.put("len", pageSize);
		params.put("adminInfo", admin.getNo());
		return qnaDao.selectQNAListByAdmin(params);
	}
	
	@Override
	public QNA getQNA(int no){
		return qnaDao.selectOne(no);
	}
	
	@Override
	public List<QNA> updateQNA(String replyContent, Admin admin){
		HashMap<String,Object> replyInfo = new HashMap<>();
		replyInfo.put("replyContent", replyContent);
		replyInfo.put("adminNo", admin.getNo());
		return qnaDao.update(replyInfo);
	}
	
	@Override
	public int deleteQNA(int no){
		return qnaDao.delete(no);
	}
}
