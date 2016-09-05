package org.nearest.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Cart;
import org.nearest.domain.Client;
import org.nearest.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/cart/")
public class CartController {
	
	@Autowired CartService cartService;	
	
	@RequestMapping(path="addCart", produces="application/json;charset=utf-8")
	@ResponseBody
	public String addCart(int productNo, HttpSession session){		
		  
		Map<String, Object> result = new HashMap<>(); 
		Cart cart = new Cart();
		cart.setProductNo(productNo);
		cart.setClientNo( ((Client)session.getAttribute("loginId")).getNo());

		try {
			cartService.addCart(cart);
			result.put("status", "success");
		} catch(Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
		
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="getCart", produces="application/json;charset=utf-8")
  @ResponseBody
  public String getCart(HttpSession session){   
	
	int clientNo = ((Client)session.getAttribute("loginId")).getNo();
      
    Map<String, Object> result = new HashMap<>(); 
    try {
      result.put("cartData", cartService.getCart(clientNo));
      result.put("status", "success");
    } catch(Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    
    return new Gson().toJson(result);
  }
	
	@RequestMapping(path="removeCart", produces="application/json;charset=utf-8")
  @ResponseBody
  public String removeCart(String prodNo, HttpSession session){   
	int clientNo = ((Client)session.getAttribute("loginId")).getNo();
	  
	Map<String, Object> params = new HashMap<>();
	params.put("prodNo", prodNo);
	params.put("clientNo", clientNo);
	  
    Map<String, Object> result = new HashMap<>();
    
    try {
      cartService.removeCart(params);
      result.put("status", "success");
    } catch(Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
    
    return new Gson().toJson(result);
  }
	
	@RequestMapping(path="removeCartList", produces="application/json;charset=utf-8")
	@ResponseBody
	public String removeCartList(HttpSession session){
	  Map<String, Object> result = new HashMap<>();
	  
	  try {
	    cartService.removeCartList(((Client)session.getAttribute("loginId")).getNo());
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
	  
	  return new Gson().toJson(result);
	}
		
}
