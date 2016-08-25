package org.nearest.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Admin;
import org.nearest.domain.Order;
import org.nearest.service.AdminService;
import org.nearest.service.MartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/admin/")
public class AdminController {
	
	@Autowired AdminService adminService;
	@Autowired MartService martService;
	
	@RequestMapping(path="login", produces="application/json;charset=utf-8")
	@ResponseBody
	public String login(@RequestParam String id,
						@RequestParam String password,
						HttpSession session) {
		HashMap<String,Object> result = new HashMap<>(); 
		Admin admin = adminService.getAdmin(id);
	
				
		try {
			if(admin.getPassword().equals(password)) {
				result.put("status", "correct");
				result.put("data", admin);
				session.setAttribute("loginSession", admin);
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
	    
	      Admin admin = (Admin)session.getAttribute("loginSession");
	      
	      int adminNo = admin.getNo();
	      System.out.println("adminNo: "+adminNo);
	      
	      int martNo = adminService.getMartNo(adminNo);
	      System.out.println("martNo: "+ martNo);    
	      
	      
	      List<Order> list = adminService.getOrder(martNo);
	      
	      
  	    result.put("orderList", "success");
  	    result.put("data", list);
  	    System.out.println("list: "+list);
	   
	  }catch (Exception e) {
	    e.printStackTrace();
	    result.put("orderList", "failure");
	  }
    return new Gson().toJson(result);
	}
	
	
}