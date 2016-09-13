package org.nearest.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Client;
import org.nearest.domain.Mart;
import org.nearest.service.OrderService;
import org.nearest.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/order/")
public class OrderController {
	
	public static final int ORDER_STATE_OPTION_READY = 1;
	public static final int ORDER_STATE_OPTION_READY_END = 2;
  
  @Autowired
  OrderService orderService;
  @Autowired
  ProductOrderService productOrderService;
  
  @RequestMapping(path = "addOrder", method=RequestMethod.POST, produces = "applicetion/json;charset=utf-8")
  @ResponseBody 
  public String addOrder(HttpSession session, @RequestParam(value="martNo") List<Integer> martNo,
                                              @RequestParam(value="prodNo") List<Integer> prodNo,
                                              @RequestParam(value="prodEnt") List<Integer> prodEnt,
                                              @RequestParam(value="prodName") List<String> prodName,
                                              @RequestParam(value="price") List<String> price,
                                              @RequestParam(value="discount") List<String> discount,
                                              String receiveDataTime
                                              ){
    
    int clientNo = ((Client)session.getAttribute("loginId")).getNo();
    //마트 중복 제거
    Set<Integer> removeDuplication = new HashSet<>(martNo);
    List<Integer> noDuplMartNo = new ArrayList<>(removeDuplication);
    
    Map<String, Object> params = new HashMap<>();
    params.put("noDuplMartNo", noDuplMartNo);
    params.put("clientNo", clientNo);
    params.put("receiveDataTime", receiveDataTime);
    
    Map<String, Object> result = new HashMap<>();
    try{
      orderService.addOrder(params);
      result.put("addOrder", "success");
    }catch (Exception e) {
      e.printStackTrace();
      result.put("addOrder", "failure");
    }
    
    
    Map<String, Object> data = new HashMap<>();
    
    List<Map<String, Object>> prodDataList  = new ArrayList<>();
    
    List<Integer> orderNo = new ArrayList<>();
    for (int i = 0; i < noDuplMartNo.size(); i++) {
      orderNo.add((Integer)params.get("orderNo") + i);
    }
    
    for(int i=0; i<prodEnt.size(); i++){
      Map<String, Object> prodData = new HashMap<>();
      prodData.put("prodNo", prodNo.get(i));
      prodData.put("entity", prodEnt.get(i));
      prodData.put("prodName", prodName.get(i));
      prodData.put("price", price.get(i));
      prodData.put("discount", discount.get(i));
      
      for (int j = 0; j < orderNo.size(); j++) {
        if(martNo.get(i).equals(noDuplMartNo.get(j))){
          prodData.put("orderNo", orderNo.get(j));
        }
      }
      prodDataList.add(prodData);
    }
    
    data.put("prodDataList", prodDataList);
    data.put("orderNo", params.get("orderNo"));
    
    
    //상품정보
    try{
      productOrderService.addProdOrder(data);
      result.put("addProdOrder", "success");
    }catch (Exception e) {
      e.printStackTrace();
      result.put("addProdOrder", "failure");
    }
    
    return new Gson().toJson(result);
  }
  
  @RequestMapping(path = "orderCount", produces="application/json;charset=utf-8")
  @ResponseBody
  public String orderCount(HttpSession session){
    
    int clientNo = ((Client)session.getAttribute("loginId")).getNo();
    Map<String, Object> result = new HashMap<>();
    
    
    
    try {
      if( orderService.getOrderCount(clientNo) != null ) {
        result = orderService.getOrderCount(clientNo);
      }
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    return new Gson().toJson(result);
  }
  
  @RequestMapping(path = "orderList", produces = "application/json;charset=utf-8")
  @ResponseBody
  public String orderList(HttpSession session,
                          @RequestParam(defaultValue = "") String startDate, 
                          @RequestParam(defaultValue = "") String endDate){
    
    int clientNo = ((Client)session.getAttribute("loginId")).getNo();
    System.out.println("clientNo : "+clientNo);
    Map<String, Object> params = new HashMap<>();
    params.put("clientNo", clientNo);
    params.put("startDate", startDate);
    params.put("endDate", endDate);
    
    Map<String, Object> result = new HashMap<>();
        
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"); 
    Set<String> table = new TreeSet<>();
    List<Object> compareDateDataOrder = new ArrayList<>();
    Set<Object> compareDateData = new TreeSet<>();
    List<Object> compareDateDataList = new ArrayList<>();
    
    try {
      List<Object> orderList = orderService.getOrderList(params);
      result.put("orderList", orderList);
      for (int i=0; i < orderList.size(); i++) {
        table.add(simpleDateFormat.format(((Map<String,Date>)orderList.get(i)).get("orderDate")));
        compareDateData.add(((Map<String,Date>)orderList.get(i)).get("orderDate"));
     }
      
      compareDateDataList.addAll(compareDateData);      
      Collections.reverse(compareDateDataList);
      compareDateDataOrder.addAll(table);      
      Collections.reverse(compareDateDataOrder);
      
      result.put("orderDate", compareDateDataOrder);
      result.put("compareDateData", compareDateDataList);
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    
    System.out.println(new Gson().toJson(result));
//    System.out.println(result.get("orderDate"));
//    System.out.println(result.get("compareDateData"));
    return new Gson().toJson(result);
  }
  
  @RequestMapping(value = "myOrderList",produces="application/json;charset=utf-8")
  @ResponseBody
  public String myOrderList(@RequestParam(defaultValue = "0") int martNo,
            		  					@RequestParam(defaultValue = "0") int clientNo,
            		  					int orderNo, 
            		  					HttpSession session){
	String option = null;
	  
	if(martNo == 0) {
		martNo = ((Mart)session.getAttribute("adminMart")).getNo();
		option = "admin";
	} else if(clientNo == 0) {
		clientNo = ((Client)session.getAttribute("loginId")).getNo();
	}
	
	System.out.println(martNo);
	System.out.println(orderNo);
	System.out.println(clientNo);
    
    Map<String, Integer> params = new HashMap<>();
    params.put("martNo", martNo);
    params.put("orderNo", orderNo);
    params.put("clientNo", clientNo);
    Map<String, Object> result = new HashMap<>();
    
    try{
      result.put("status", "success");
      
      if(option != null) {
    	  result.put("orderInfo", orderService.getOrderInfoByAdmin(params));
          result.put("orderDetail", orderService.getOrderDetailListByAdmin(params));  
      } else {
    	  result.put("orderInfo", orderService.getOrderInfo(params));
          result.put("orderDetail", orderService.getOrderDetailList(params));
      }
    }catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    System.out.println(result.get("orderInfo"));
    System.out.println(result.get("orderDetail"));
    return new Gson().toJson(result);
  }


  @RequestMapping(path = "updateOrderState", method=RequestMethod.POST, produces = "applicetion/json;charset=utf-8")
  @ResponseBody 
  public String updateOrderState(int orderNo, int orderState, int option){

    Map<String, Object> result = new HashMap<>();
    Map<String, Integer> params = new HashMap<>();
    
    System.out.println("=================updateOrderState=================");
    System.out.println("orderNo : " + orderNo);
    System.out.println("orderState : " + orderState);
    System.out.println("option : " + option);
    
    switch(option) {
    	case ORDER_STATE_OPTION_READY:
    		if(orderState == 1) {
    	    	params.put("orderNo", orderNo);
    	    	params.put("orderState", 2);
    	    } else {
    	    	result.put("state", "Already OrderState >= 2");
    	    	return new Gson().toJson(result);
    	    }
    		
    		break;
    	case ORDER_STATE_OPTION_READY_END:
    		if(orderState == 1 || orderState == 2) {
		    	params.put("orderNo", orderNo);
		    	params.put("orderState", 3);
		    } else {
		    	result.put("state", "OrderState 1 or 2");
		    	return new Gson().toJson(result);
		    }
    		break;
    	default:
    		break;
    }
    
    try{
      orderService.updateOrderState(params);
      result.put("state", "success");
    }catch (Exception e) {
      e.printStackTrace();
      result.put("state", "failure");
    }
   
    return new Gson().toJson(result);
  }
}
