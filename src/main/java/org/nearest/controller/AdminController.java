package org.nearest.controller;

import java.util.HashMap;

import org.nearest.domain.Admin;
import org.nearest.service.AdminService;
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
	
	@RequestMapping(path="login",produces="application/json;charset=utf-8")
	@ResponseBody
	public String login(@RequestParam String id,
						@RequestParam String password) {
		HashMap<String,Object> result = new HashMap<>();
		Admin admin = adminService.getAdmin(id);
		
		try {
			if(admin.getPassword().equals(password)) {
				result.put("status", "correct");
				result.put("data", admin);
			} else {
				result.put("status", "incorrect");
			}
			
		} catch(Exception e) {
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
}
