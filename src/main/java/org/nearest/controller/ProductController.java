package org.nearest.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.nearest.domain.Mart;
import org.nearest.domain.Product;
import org.nearest.service.MartService;
import org.nearest.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

@Controller
@RequestMapping("/product/")
public class ProductController {
  
  @Autowired
  MartService martService;
  @Autowired
  ProductService productService;
  
  @ResponseBody
  @RequestMapping(path = "list", produces = "application/json;charset=utf-8")
  public String getProductList(@RequestParam String searchTag, 
                               @RequestParam String searchContent,
                               @RequestParam(defaultValue="1") int currentPage,
                               @RequestParam(defaultValue="9") int length,
                               @RequestParam(defaultValue="client") String option,
                               HttpSession session){
    
    
    Map<String, Object> result = new HashMap<>();
    List<Product> products = null;
    
    if(option.equals("admin")) {
    	searchTag = "marts";
    	searchContent = ((Mart)session.getAttribute("adminMart")).getName();
    }
    
    try{
      result.put("status", "success");
      if(searchTag.equals("prods")) {
        
        products = productService.getProductList(currentPage, length, searchContent);
        
        result.put("productData", products);
        result.put("total", productService.getTotal(searchContent));
        
      } 
      
      if(searchTag.equals("marts")) {
        
        products = productService.getMartList(currentPage, length, searchContent);
        
        result.put("productData", products);
        result.put("total", productService.getTotalByMart(searchContent));
      }
      
    }catch (Exception e) {
      e.printStackTrace();
      result.put("status", "failure");
    }
    
    return new Gson().toJson(result);
  }
 
  
  @ResponseBody
  @RequestMapping(path = "getProduct", produces = "application/json;charset=utf-8")
  public String getProduct(int no){
    
    Map<String, Object> result = new HashMap<>();
    Product product = productService.getProduct(no);
    product.setMart(martService.getMart(product.getMart().getNo()));
    
    System.out.println(product);
    
    try{
      result.put("status", "success");
      result.put("productData", product);
    }catch (Exception e) {
      e.printStackTrace();
      result.put("status", "failure");
    }
    
    return new Gson().toJson(result);
  }
  
  
  
  @RequestMapping(path="addProduct")
	@ResponseBody
	public String addProduct(Product product,
							 List<MultipartFile> imageFiles,
							 HttpSession session) throws IOException {
		HashMap<String,Object> result = new HashMap<>();
		product.setMart((Mart)session.getAttribute("adminMart"));
		
		MultipartFile imageFile = imageFiles.get(0);
		
		String realPath = session.getServletContext().getRealPath("/resources/images/product");
		String filePath = realPath + "\\" + imageFile.getOriginalFilename();
		File resultFile = new File(filePath);
				
		product.setPhoto("./resources/images/product/" + imageFile.getOriginalFilename());
						
		try {
			imageFile.transferTo(resultFile);
			productService.addProduct(product);
			
			result.put("photo", product.getPhoto());
			result.put("status", "success");
		} catch(Exception e) {
			e.printStackTrace();
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}

}
