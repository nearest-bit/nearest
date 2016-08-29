package org.nearest.controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Admin;
import org.nearest.domain.Mart;
import org.nearest.service.AdminService;
import org.nearest.service.MartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/session/")
public class SessionController {
		
	@RequestMapping(path="check",produces="application/json;charset=utf-8")
	@ResponseBody
	public String check(HttpSession session) {
		HashMap<String,Object> result = new HashMap<>();
						
		try {
			if(session.getAttribute("adminId") != null || session.getAttribute("loginId") != null) {
				result.put("status", "true");
			} else {
				result.put("status", "false");
			}
			
		} catch(Exception e) {
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
	
	
	@RequestMapping(path="logout",produces="application/json;charset=utf-8")
	@ResponseBody
	public String logout(HttpSession session) {
		HashMap<String,Object> result = new HashMap<>();
						
		try {
			session.invalidate();
			
			result.put("status", "success");
			
		} catch(Exception e) {
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
}