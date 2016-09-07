package org.nearest.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Client;
import org.nearest.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/client/")
public class ClientController {

	@Autowired
	ClientService clientService;

	@RequestMapping(path = "login", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String login(@RequestParam String id, @RequestParam String password, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		Client client = clientService.getClient(id);

		try {
			if (client.getPassword().equals(password)) {
				result.put("status", "correct");
				result.put("data", client);

				session.setAttribute("loginId", client);
			} else {
				result.put("status", "incorrect");
			}

		} catch (Exception e) {
			result.put("status", "error");
		}

		return new Gson().toJson(result);
	}
	
	@RequestMapping(path = "findId", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String findId(@RequestParam String name, 
						@RequestParam String phone1,
						@RequestParam String phone2,
						@RequestParam String phone3,
						@RequestParam String email	){
		
		Map<String, Object> params = new HashMap<>();
		HashMap<String, Object> result = new HashMap<>();
		String phoneNumber = (phone1+phone2+phone3).trim();
		System.out.println(name+":"+phoneNumber+","+email);
		params.put("name", name);
		params.put("phoneNumber", phoneNumber);
		params.put("email", email);
		Client client = clientService.getClientByInfo(params);
		
		try {
			if (client.getEmail().equals(email) && client.getPhone().equals(phoneNumber)) {
				result.put("status", "success");
				result.put("id", client.getId());

			} else {
				result.put("status", "fail");
			}

		} catch (Exception e) {
			result.put("status", "error");
		}

		return new Gson().toJson(result);
	}
	
	@RequestMapping(path = "register", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addClient(Client client) {

		Map<String, Object> result = new HashMap<>();

		try {
			clientService.addClient(client);
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}

		return new Gson().toJson(result);
	}

	/*@RequestMapping(path = "checkDupl", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String checkDuplication(@RequestParam String id) {

		Map<String, Object> result = new HashMap<>();

		try {
			Client client = clientService.getClient(id);
			result.put("status", "success");

			if (client != null) {
				result.put("check", "true");
			} else {
				result.put("check", "false");
			}

		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}

		return new Gson().toJson(result);
	}*/
	
	@RequestMapping(path = "checkAlert", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String checkAlert(HttpSession session) {

		Map<String, Object> result = new HashMap<>();
		Map<String, Object> counts = clientService.checkAlert(((Client)session.getAttribute("loginId")).getNo());

		try {
			result.put("alertData", counts);
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "failure");
			e.printStackTrace();
		}

		return new Gson().toJson(result);
	}
	@RequestMapping(path="myinfo", produces="application/json;charset=utf-8")
	@ResponseBody
	public String myinfo(HttpSession session){
	  
	  Map<String, Object> result = new HashMap<>();
	  SimpleDateFormat birth = new SimpleDateFormat("yyyy년 MM월 dd일");
	  Client clientInfo;
	  
	  try {
	    clientInfo = clientService.getClient(((Client)session.getAttribute("loginId")).getId());
	    result.put("data", clientInfo);
	    result.put("birth", birth.format(clientInfo.getBirth()));
	    result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
      
    }
	  
	  return new Gson().toJson(result);
	}
	
	@RequestMapping(path="update", produces="application/json;charset=utf-8")
	@ResponseBody
	public String update(HttpSession session, String password, String email){
	  
	  
	  Map<String, Object> params = new HashMap<>();
	  params.put("clientNo", ((Client)session.getAttribute("loginId")).getNo());
	  params.put("password", password);
	  params.put("email", email);
	  Map<String, Object> result = new HashMap<>();
	  System.out.println("email : "+email);
    System.out.println("password : "+password);
    System.out.println("clientNo : "+((Client)session.getAttribute("loginId")).getNo());
	  
	  try {
      System.out.println(clientService.changeClientInfo(params));
      result.put("status", "success");
    } catch (Exception e) {
      result.put("status", "failure");
      e.printStackTrace();
    }
	  
	  return new Gson().toJson(result);
	}
	
	@RequestMapping(path="purchaseInfo", produces="application/json;charset=utf-8")
	@ResponseBody
	public String purchaseInfo(HttpSession session){
	  Map<String, Object> result = new HashMap<>();
	  
	  try {
	    result.put("status", "success");
	    result.put("data", clientService.getClient(((Client)session.getAttribute("loginId")).getId()));
	    
    } catch (Exception e) {
      result.put("status", "failure");
    }
	  
	  return new Gson().toJson(result);
	}
}
