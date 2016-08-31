package org.nearest.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Admin;
import org.nearest.domain.Mart;
import org.nearest.domain.Order;
import org.nearest.service.AdminService;
import org.nearest.service.MartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/admin/")
public class AdminController {
	
	@Autowired AdminService adminService;
	@Autowired MartService martService;
	
	@RequestMapping(path="login", produces="application/json;charset=utf-8")
	@ResponseBody
	public String login(String id,
						String password,
						HttpSession session) {
		HashMap<String,Object> result = new HashMap<>(); 
		Admin admin = adminService.getAdmin(id);
		Mart mart = martService.getMartByAdmin(admin.getNo());
				
		try {
			if(admin.getPassword().equals(password)) {
				result.put("status", "correct");
				result.put("data", admin);
				
				session.setAttribute("adminId", admin);
				session.setAttribute("adminMart", mart);
				
			} else {
				result.put("status", "incorrect");
			}
			
		} catch(Exception e) {
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="orderList", produces="application/json;charset=utf-8")
	@ResponseBody
	public String orderList(HttpSession session){
	  
	  HashMap<String, Object> result = new HashMap<>();
	  
	  try {
	      List<Order> list = adminService.getOrder(((Mart)session.getAttribute("adminMart")).getNo());
	      
  	    result.put("state", "success");
  	    result.put("orderData", list);
	   
	  }catch (Exception e) {
	    e.printStackTrace();
	    result.put("state", "failure");
	  }
	  
	  return new Gson().toJson(result);
	}
}