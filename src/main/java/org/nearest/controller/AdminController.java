package org.nearest.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
	public String login(String id,
						String password,
						@RequestParam(defaultValue="web") String option,
						HttpSession session) {
		HashMap<String,Object> result = new HashMap<>(); 
		Admin admin = adminService.getAdmin(id);
		Mart mart = null;
		
		if(admin != null) {
			mart = martService.getMartByAdmin(admin.getNo());
		}
						
		try {
			if(admin.getPassword().equals(password)) {
				result.put("status", "correct");
				result.put("data", admin);
				
				if(option.equals("web")) {
					session.setAttribute("adminId", admin);
					session.setAttribute("adminMart", mart);
				}
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
	public String orderList(@RequestParam(defaultValue="0") int no, HttpSession session){
	  
	  HashMap<String, Object> result = new HashMap<>();
	  List<Order> list = null;
	  
	  try {
		  if(no == 0) {
			  list = adminService.getOrder(((Mart)session.getAttribute("adminMart")).getNo());
		  } else {
			  list = adminService.getOrder(no);
		  }
	    
	   for (Order order : list) {
	      order.setOrderRequestDate(order.getOrderRequestDate().replace(".0", ""));
	    }
	    	      
  	    result.put("state", "success");
  	    result.put("orderData", list);
  	   
	   
	  }catch (Exception e) {
	    e.printStackTrace();
	    result.put("state", "failure");
	  }
	  
	  return new Gson().toJson(result);
	}
	
	@RequestMapping(path="orderListByCalendar", produces="application/json;charset=UTF-8")
	@ResponseBody
	public String orderListByCalendar(@RequestParam(defaultValue="0") int no, 
									HttpSession session,
									String orderStatus,
									String startDate,
									String endDate) {
		int orderSt = 0;
		int martNo = 0;
		
		if(no == 0) {
			martNo = ((Mart)session.getAttribute("adminMart")).getNo();
		} else {
			martNo = no;
		}
		
		HashMap<String,Object> result = new HashMap<String,Object>();
				
		try {
			if (orderStatus.equals("새 주문")) {
				orderSt = 1;
				System.out.println("새 주문");
			} else if (orderStatus.equals("준비완료")){
				orderSt = 3;
				System.out.println("준비완료");
			} else if (orderStatus.equals("수령완료")){
				orderSt = 4;
				System.out.println("수령완료");
			}
			
			List<Order> list = adminService.getOrderListByCalendar(martNo, startDate, endDate, orderSt);
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.S");
		    List<Object> orderDateList = new ArrayList<>();
		    SimpleDateFormat resultDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		    
		    java.util.Date tempDate = null;
		    
		    for (Order order : list) {
		    	tempDate = simpleDateFormat.parse(order.getOrderRequestDate());
		    	
				orderDateList.add(resultDateFormat.format(tempDate));
			}
			
			result.put("status", "success");
			result.put("orderData", list);
	  	    result.put("orderDateList", orderDateList);
			
			
		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
		return new Gson().toJson(result);
	}
}