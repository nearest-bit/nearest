package org.nearest.controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Admin;
import org.nearest.domain.Product;
import org.nearest.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

@Controller
@RequestMapping("/admin/")
public class AdminController {
	
	@Autowired AdminService adminService;
	
	@RequestMapping(path="login",produces="application/json;charset=utf-8")
	@ResponseBody
	public String login(String id,
						String password,
						HttpSession session) {
		HashMap<String,Object> result = new HashMap<>(); 
		Admin admin = adminService.getAdmin(id);
				
		try {
			if(admin.getPassword().equals(password)) {
				result.put("status", "correct");
				result.put("data", admin);
				
				session.setAttribute("loginId", admin);
			} else {
				result.put("status", "incorrect");
			}
			
		} catch(Exception e) {
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="productUpload")
	@ResponseBody
	public String productUpload(Product product,
								MultipartFile imageFile,
								HttpSession session) {
		HashMap<String,Object> result = new HashMap<>();
		System.out.println(product);
		System.out.println(imageFile.getName());
				
		try {
			System.out.println(session.getServletContext().getRealPath("/"));
		} catch(Exception e) {
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
}