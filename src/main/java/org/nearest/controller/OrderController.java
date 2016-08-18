package org.nearest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.nearest.service.OrderService;
import org.nearest.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/order/")
public class OrderController {
  
  @Autowired
  OrderService orderService;
  ProductOrderService productOrderService;
  
  @RequestMapping(path = "addOrder", produces = "applicetion/json;charset=utf-8")
  @ResponseBody
  public String addOrder(HttpSession session, List<Integer> martNo, List<Integer> prodNo, List<Integer> prodEnt){
//    int clientNo = ((Client)session.getAttribute("userId")).getNo();
    
    //마트 중복 제거
    Set<Integer> removeDuplication = new HashSet<>(martNo);
    List<Integer> noDuplMartNo = new ArrayList<>(removeDuplication);
    
    Map<String, Object> params = new HashMap<>();
    List<Integer> orderDatas = new ArrayList<>();
    
    // 주문 테이블 추가
    params.put("martNo", noDuplMartNo);
    params.put("clientNo", "1");
    
    orderService.addOrder(params);
    
    System.out.println(params.get("orderNo"));
    //상품 주문 테이블 추가
    params.put("orderNo", params.get("orderNo"));//리스트가 아닌데 포문을돌것인가??
    params.put("prodNo", prodNo);
    params.put("entity", prodEnt);
    
    
    System.out.println(params);
    productOrderService.addProdOrder(params);
    
    
    return null;
  }

}
