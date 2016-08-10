package org.nearest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nearest.domain.Product;
import org.nearest.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/product/")
public class ProductController {
  
  @Autowired
  ProductService productService;
  
  @ResponseBody
  @RequestMapping(path = "list", produces = "application/json;charset=utf-8")
  public String getProductList(@RequestParam String searchTag, 
                               @RequestParam String searchContent,
                               @RequestParam(defaultValue="1") int currentPage,
                               @RequestParam(defaultValue="9") int length){
    
    
    Map<String, Object> result = new HashMap<>();
    List<Product> products = null;
    
    try{
      result.put("status", "success");
      if (searchTag.equals("prods")) {
        
        products = productService.getProductList(currentPage, length, searchContent);
        
        result.put("productData", products);
        result.put("total", productService.getTotal(searchContent));
        
      } 
      
      if(searchTag.equals("marts")){
        
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

}
