package org.nearest.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Client;
import org.nearest.domain.QNA;
import org.nearest.service.QNAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;


@Controller
@RequestMapping("/qna/")
public class QNAController {
	
	@Autowired QNAService qnaService;
	
	@RequestMapping(path="QNAList", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String QNAlist(HttpSession session) {
		
			
	  HashMap<String,Object> result = new HashMap<String,Object>();
	  
			
			try {
				List<QNA> list = qnaService.getQNAList(((Client)session.getAttribute("loginId")).getNo());
				for (QNA qna : list) {
          if(qna.getStatus() == 1){
            qna.setReqStatus("읽지않음");
          }else if(qna.getStatus() == 2){
            qna.setReqStatus("읽음");
          }else{
            qna.setReqStatus("답변완료");
          }
        }
				result.put("status", "success");
				result.put("reqData", list);
			} catch (Exception e) {
				result.put("status", "failure");
				e.printStackTrace();
			}
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="detail", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String detail(int no) {
		HashMap<String,Object> result = new HashMap<>();try {
			result.put("status", "success");
			result.put("data", qnaService.getQNA(no));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result.put("status", "failure");
			e.printStackTrace();
		}
		
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="add", method=RequestMethod.GET)
	public String form() {
		return "qna/form";
	}
	
	@RequestMapping(path="add", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String add(QNA qna) {
		
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
	
	@RequestMapping(path="update", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String update(QNA qna) {
		HashMap<String,Object> result = new HashMap<>();
		try {
	      qnaService.updateQNA(qna);
	      result.put("status", "success");
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
	
}
