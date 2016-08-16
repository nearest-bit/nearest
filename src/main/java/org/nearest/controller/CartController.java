package org.nearest.controller;

import java.util.HashMap;
import java.util.Map;

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
	public String addCart(Cart cart){		
		  
		Map<String, Object> result = new HashMap<>(); 

		try {
			cartService.addCart(cart);
			result.put("status", "success");
		} catch(Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}
		
		return new Gson().toJson(result);
	}
		
}
