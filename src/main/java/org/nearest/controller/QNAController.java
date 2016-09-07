package org.nearest.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Admin;
import org.nearest.domain.Client;
import org.nearest.domain.Mart;
import org.nearest.domain.QNA;
import org.nearest.service.QNAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;


@Controller
@RequestMapping("/qna/")
public class QNAController {
	
	@Autowired QNAService qnaService;
	
	@RequestMapping(path="QNAlistByAdmin", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String QNAlistByAdmin(HttpSession session) {
			
			Admin admin = (Admin)session.getAttribute("adminId");
			HashMap<String,Object> result = new HashMap<String,Object>();
			List<String> simpleDate = new ArrayList<>();
			SimpleDateFormat createDate = new SimpleDateFormat("yyyy년 MM월 dd일");
			try {
				List<QNA> list = qnaService.getQNAListByAdmin(admin);
				System.out.println(list);
				for (QNA qna : list) {
				      if(qna.getStatus() == 1){
				        qna.setReqStatus("답변하기");
				      }else if(qna.getStatus() == 2){
				        qna.setReqStatus("답변완료");
				      }else if(qna.getStatus() == 3){
				        qna.setReqStatus("고객확인");
				      }else{
				    	qna.setReqStatus("오류");
				      }
				      String birth = createDate.format(qna.getCreateDate());
				      simpleDate.add(birth);
				    }
				
				result.put("status", "success");
				result.put("qnadata", list);
				result.put("simpleDate", simpleDate);
			} catch (Exception e) {
				result.put("status", "failure");
				e.printStackTrace();
			}
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="QNAlistByCalendar", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String QNAlistByCalendar(HttpSession session,
									String qnaStatus,
									String startDate,
									String endDate) {
		int qnaSt = 0;
		Admin admin = (Admin)session.getAttribute("adminId");
		HashMap<String,Object> result = new HashMap<String,Object>();
		List<String> simpleDate = new ArrayList<>();
		SimpleDateFormat createDate = new SimpleDateFormat("yyyy년 MM월 dd일");
		try {
			if (qnaStatus.equals("답변미완료")) {
				qnaSt = 1;
				List<QNA> list = qnaService.getQNAlistByCalendar(admin, startDate, endDate, qnaSt);
				for (QNA qna : list) {
				      if(qna.getStatus() == 1){
				        qna.setReqStatus("답변하기");
				      }else if(qna.getStatus() == 2){
				        qna.setReqStatus("답변완료");
				      }else{
				        qna.setReqStatus("오류");
				      }
				      String birth = createDate.format(qna.getCreateDate());
				      simpleDate.add(birth);
				}
				result.put("status", "success");
				result.put("qnadata", list);
				result.put("simpleDate", simpleDate);
			} else if (qnaStatus.equals("답변완료")){
				qnaSt = 2;
				List<QNA> list = qnaService.getQNAlistByCalendar(admin, startDate, endDate, qnaSt);
				for (QNA qna : list) {
				      if(qna.getStatus() == 1){
				        qna.setReqStatus("답변하기");
				      }else if(qna.getStatus() == 2){
				        qna.setReqStatus("답변완료");
				      }else{
				        qna.setReqStatus("오류");
				      }
				      String birth = createDate.format(qna.getCreateDate());
				      simpleDate.add(birth);
				}
				
				result.put("status", "success");
				result.put("qnadata", list);
				result.put("simpleDate", simpleDate);
			}
			
		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="detail", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String detail(int no) {
		HashMap<String,Object> result = new HashMap<>();
		try {
			result.put("status", "success");
			result.put("data", qnaService.getQNA(no));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.put("status", "failure");
			e.printStackTrace();
		}
		
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="add", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String add(QNA qna, int martNo, HttpSession session) {
	  
		qna.setMart(new Mart(martNo));
		qna.setClient(new Client(((Client)session.getAttribute("loginId")).getNo()));
		System.out.println(qna);
		
		HashMap<String,Object> result = new HashMap<>();
		try {
			qnaService.addQNA(qna);
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
	return new Gson().toJson(result);
	}
	
	@RequestMapping(path="updateQNA", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String update(String replyContent,
						int clientNo,
						int contentNo,
						HttpSession session) {
		Admin admin = (Admin)session.getAttribute("adminId");
		QNA qna = (QNA)qnaService.getQNAForStatus(clientNo, contentNo);
		HashMap<String,Object> result = new HashMap<>();
		
		System.out.println(replyContent+" "+clientNo+" "+admin+" "+contentNo);
		try {
	      qnaService.updateQNA(replyContent, clientNo, admin, contentNo);
	      result.put("status", "success");
	      result.put("replyStatus", qna.getReqStatus());
	    } catch (Exception e) {
	      result.put("status", "failure");
	      e.printStackTrace();
	    }
	    return new Gson().toJson(result);
	  }
	
	@RequestMapping(path="reqContent", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String selectContent(int reqNo){
		HashMap<String,Object> result = new HashMap<>();
		try {
			QNA qna = (QNA)qnaService.getQNA(reqNo);
			System.out.println(qna.getClient().getName());
			result.put("clntName", qna.getClient().getName());
			result.put("status", "success");
			result.put("qnaStory", "문의내용 : "+qna.getContent());
			result.put("content", qna.getReplyContent());
			result.put("reqMessage", qna.getStatus());
		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
	return new Gson().toJson(result);
		
	}
	
	@RequestMapping(path="delete", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String delete(int no) {
	  HashMap<String,Object> result = new HashMap<>();
		try {
		  qnaService.deleteQNA(no);
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
		return new Gson().toJson(result);
	}
	
  @RequestMapping(path="QNAList", produces="application/json;charset=UTF-8")
  @ResponseBody
  public String QNAlistClient(HttpSession session) {
    
    
    HashMap<String,Object> result = new HashMap<String,Object>();
    
    try {
      List<QNA> list = qnaService.getQNAList(((Client)session.getAttribute("loginId")).getNo());
      result.put("status", "success");
      result.put("reqData", list);
        for (QNA qna : list) {
          if(qna.getStatus() == 1){
            qna.setReqStatus("읽지않음");
          }else if(qna.getStatus() == 2){
            qna.setReqStatus("답변완료");
          }else{
            qna.setReqStatus("확인");
          }
        }
      }catch (Exception e) {
        result.put("status", "failure");
        e.printStackTrace();
      } 
      return new Gson().toJson(result);
    }
  
  @RequestMapping(path="orderMartList", produces="application/json;charset=UTF-8")
  @ResponseBody
  public String orderMartList(HttpSession session) {
    
    
    HashMap<String,Object> result = new HashMap<String,Object>();
    
    try {
      List<Mart> orderMartList = qnaService.getOrderMartList(((Client)session.getAttribute("loginId")).getNo());
      result.put("status", "success");
      result.put("orderMartList", orderMartList);
        
      }catch (Exception e) {
        result.put("status", "failure");
        e.printStackTrace();
      } 
      return new Gson().toJson(result);
    }
  
  @RequestMapping(path="updateQna", produces="application/json;charset=utf-8")
  @ResponseBody
  public String updateQna(int qnaNo){
    Map<String, Object> result = new HashMap<>();
    
    try {
      qnaService.updateClientQna(qnaNo);
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    return new Gson().toJson(result);
  }
  
 
}
