package org.nearest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Client;
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
  
  @Autowired
  OrderService orderService;
  @Autowired
  ProductOrderService productOrderService;
  
  @RequestMapping(path = "addOrder", method=RequestMethod.POST, produces = "applicetion/json;charset=utf-8")
  @ResponseBody
  public String addOrder(HttpSession session, @RequestParam(value="martNo") List<Integer> martNo,
                                              @RequestParam(value="prodNo") List<Integer> prodNo,
                                              @RequestParam(value="prodEnt") List<Integer> prodEnt){

    int clientNo = ((Client)session.getAttribute("loginId")).getNo();
    //마트 중복 제거
    Set<Integer> removeDuplication = new HashSet<>(martNo);
    List<Integer> noDuplMartNo = new ArrayList<>(removeDuplication);
    
    Map<String, Object> params = new HashMap<>();
    params.put("noDuplMartNo", noDuplMartNo);
    params.put("clientNo", clientNo);
    
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
    Map<String, Object> result = null;
    int clientNo = ((Client)session.getAttribute("loginId")).getNo();
    try {
      result = orderService.getOrderCount(clientNo);
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    return new Gson().toJson(result);
  }

}
