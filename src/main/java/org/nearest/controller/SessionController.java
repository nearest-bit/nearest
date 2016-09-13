package org.nearest.controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

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
		boolean adminCheck = session.getAttribute("adminId") != null;
		boolean clientCheck = session.getAttribute("loginId") != null;
						
		try {
			if(adminCheck || clientCheck) {
				result.put("status", "true");

				if(adminCheck) result.put("role", "admin");
				if(clientCheck) result.put("role", "client");
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