package org.nearest.controller;

import java.util.HashMap;

import org.nearest.service.MartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/mart/")
public class MartController {
	
	@Autowired MartService martService;
	
	@RequestMapping(path="martList",produces="application/json;charset=utf-8")
	@ResponseBody
	public String martList() {
		
		HashMap<String,Object> result = new HashMap<>();
		
		try {
			result.put("state", "success");
			result.put("data", martService.getMartList());
		} catch (Exception e) {
			result.put("state", "failure");
		}
		
		return new Gson().toJson(result);		
	}
	
}
