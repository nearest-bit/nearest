package org.nearest.service.impl;

import java.util.HashMap;
import java.util.List;

import org.nearest.dao.QNADao;
import org.nearest.domain.Admin;
import org.nearest.domain.Mart;
import org.nearest.domain.QNA;
import org.nearest.service.QNAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QNAServiceImpl implements QNAService{
	
	@Autowired QNADao qnaDao;
	
	@Override
	public void addQNA(QNA qna){
		qnaDao.insertQNA(qna);
	}
	
	@Override
	public List<QNA> getQNAList(int clientNo){
		return qnaDao.selectQNAList(clientNo);
	}
	
	@Override
	public List<QNA> getQNAListByAdmin(Admin admin){
		HashMap<String,Object> params = new HashMap<>();
		params.put("adminInfo", admin.getNo());
		return qnaDao.selectQNAListByAdmin(params);
	}
	
	@Override
	public QNA getQNA(int no){
		return qnaDao.selectQNA(no);
	}
	
	@Override
	public QNA getQNAForStatus(int clientNo, int contentNo){
		HashMap<String,Object> param = new HashMap<>();
		param.put("clientNo", clientNo);
		param.put("contentNo", contentNo);
		return qnaDao.selectQNAForStatus(param);
	}
	
	@Override
	public int updateQNA(String replyContent, int clientNo, Admin admin, int contentNo){
		HashMap<String,Object> replyInfo = new HashMap<>();
		replyInfo.put("replyContent", replyContent);
		replyInfo.put("clientNo", clientNo);
		replyInfo.put("adminNo", admin.getNo());
		replyInfo.put("contentNo", contentNo);
		return qnaDao.updateQNA(replyInfo);
	}
	
	@Override
	public int deleteQNA(int no){
		return qnaDao.delete(no);
	}

  @Override
  public List<Mart> getOrderMartList(int clientNo) {
    
    return qnaDao.selectOrderMartList(clientNo);
  }


}
