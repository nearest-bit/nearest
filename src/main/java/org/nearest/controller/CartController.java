package org.nearest.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Cart;
import org.nearest.domain.Client;
import org.nearest.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/cart/")
public class CartController {
	
	@Autowired CartService cartService;	
	
	@RequestMapping(path="addCart", produces="application/json;charset=utf-8")
	@ResponseBody
	public String addCart(@RequestParam(defaultValue="0") int no, int productNo, HttpSession session){		
		  
		Map<String, Object> result = new HashMap<>(); 
		Cart cart = new Cart();
		cart.setProductNo(productNo);
		
		if(no == 0) {
			cart.setClientNo( ((Client)session.getAttribute("loginId")).getNo());
		} else {
			cart.setClientNo(no);
		}

		try {
			cartService.addCart(cart);
			result.put("status", "success");
		} catch (DuplicateKeyException dupl) {
			result.put("status", "duplication");
		} catch(Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
		
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="getCart", produces="application/json;charset=utf-8")
  @ResponseBody
  public String getCart(@RequestParam(defaultValue="0") int no, HttpSession session){   
	
	int clientNo = 0;
	
	if(no == 0) {
		clientNo = ((Client)session.getAttribute("loginId")).getNo();
	} else {
		clientNo = no;
	}
      
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
  public String removeCart(@RequestParam(defaultValue="0") int no, String prodNo, HttpSession session){   
	int clientNo = 0;
	
	if(no == 0) {
		clientNo = ((Client)session.getAttribute("loginId")).getNo();
	} else {
		clientNo = no;
	}
	  
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
	public String removeCartList(@RequestParam(defaultValue="0") int no, HttpSession session){
	  Map<String, Object> result = new HashMap<>();
	  
	  try {
		  if(no == 0) {
			  cartService.removeCartList(((Client)session.getAttribute("loginId")).getNo()); 
		  } else {
			  cartService.removeCartList(no);
		  }
        
	    result.put("status", "success");
      } catch (Exception e) {
        result.put("status", "failure");
        e.printStackTrace();
      }
	  
	  return new Gson().toJson(result);
	}
		
}
