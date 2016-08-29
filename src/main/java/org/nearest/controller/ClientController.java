package org.nearest.controller;

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

	@RequestMapping(path = "checkDupl", produces = "application/json;charset=utf-8")
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
	}
	
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
}
