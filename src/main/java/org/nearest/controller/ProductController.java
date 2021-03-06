package org.nearest.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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
                               @RequestParam(defaultValue="") String martNo,
                               @RequestParam(defaultValue="") String majorCat,
                               @RequestParam(defaultValue="") String subCat,
                               @RequestParam(defaultValue="") String searchLat,
                               @RequestParam(defaultValue="") String searchLng,
                               @RequestParam(defaultValue="") String martName,
                               HttpSession session){
    System.out.println("searchTag : " + searchTag);
    System.out.println("searchContent : " + searchContent);
    System.out.println("martNo : " + martNo);
    System.out.println("majorCat : " + majorCat);
    System.out.println("subCat : " + subCat);
    
    Map<String, Object> result = new HashMap<>();
    List<Product> products = null;

    if(option.equals("admin")) {
    	searchTag = "marts";
    	
    	if(martName.equals("")) {
    		searchContent = ((Mart)session.getAttribute("adminMart")).getName();
    	} else {
    		searchContent = martName;
    	}
    }
    
    result.put("currentPage", currentPage);
    
    try{
      result.put("status", "success");
      if(searchTag.equals("prods")) {
        System.out.println(searchLat+"//"+searchLng);
        products = productService.getProductList(currentPage, length, searchContent, searchLat, searchLng);
        result.put("searchKeyword", "prods");
        result.put("productData", products);
        result.put("searchContent", searchContent);
        result.put("total", productService.getTotal(searchContent));
        System.out.println("prods : "+result.get("productData"));
      } 
      
      if(searchTag.equals("marts") && majorCat.length() == 0 && subCat.length() == 0) {
        products = productService.getMartList(currentPage, length, searchContent);
        result.put("searchKeyword", "marts");
        result.put("productData", products);
        result.put("searchContent", searchContent);
        result.put("total", productService.getTotalByMart(searchContent));
        System.out.println("marts : "+result.get("productData"));
      }
      
      
      if(majorCat.length() != 0 && subCat.length() != 0 && martNo.length() != 0){
        System.out.println("category search");
        products = productService.getMartCategoryList(currentPage, length, martNo, majorCat, subCat);
        result.put("searchKeyword", "marts");
        result.put("productData", products);
        result.put("searchContent", searchContent);
        result.put("total", productService.getTotalByMart(searchContent));
        System.out.println("marts : "+result.get("productData"));
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
    
//    System.out.println(product);
    
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
		
		String name = product.getName();
		/*name = URLEncoder.encode(name, "utf-8");
		
		System.out.println(name);*/
	
		MultipartFile imageFile = null;
		String realPath = null;
		String filePath = null;
		File resultFile = null;
		
		String currentTime = String.valueOf(System.currentTimeMillis()); 
	
		try {
		
			if(imageFiles.size() != 0) {
				imageFile = imageFiles.get(0);
				
				realPath = session.getServletContext().getRealPath("/resources/images/product");
				
				File folder = new File(realPath);
				
				if(!folder.exists()) {
					folder.mkdir();
				}
				
				filePath = realPath + "/" + currentTime + imageFile.getOriginalFilename();
				resultFile = new File(filePath);
						
				product.setPhoto("./resources/images/product/" + currentTime + imageFile.getOriginalFilename());
//				product.setPhoto(filePath);
				
				imageFile.transferTo(resultFile);
				result.put("photo", product.getPhoto());
			}
			
			productService.addProduct(product);
			
			result.put("status", "success");
		} catch(Exception e) {
			e.printStackTrace();
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}

  	
  @RequestMapping(path="updateProduct")
	@ResponseBody
	public String updateProduct(Product product,
							 List<MultipartFile> imageFiles,
							 @RequestParam(defaultValue="0") int no,
							 HttpSession session) throws IOException {
		HashMap<String,Object> result = new HashMap<>();
		Mart mart = null;
		
		if(no == 0) {
			mart = (Mart)session.getAttribute("adminMart");
		} else {
			mart = new Mart();
			mart.setNo(no);
		}
		
		product.setMart(mart);
		
		System.out.println(imageFiles.get(0).getOriginalFilename());
				
		MultipartFile imageFile = null;
		String realPath = session.getServletContext().getRealPath("/resources/images/product");
		String filePath = null;
		File resultFile = null;
		File prevFile = null;
		
		String prevPath = realPath + (productService.getProduct(product.getNo()).getPhoto()).replace("./resources/images/product/", "/");
		
		String currentTime = String.valueOf(System.currentTimeMillis()); 
		
		File folder = new File(realPath);
		
		if(!folder.exists()) {
			folder.mkdir();
		}
	
		try {
		
			if(imageFiles != null) {
				imageFile = imageFiles.get(0);
				
				filePath = realPath + "/" + currentTime + imageFile.getOriginalFilename();
				resultFile = new File(filePath);
				prevFile = new File(prevPath);
				
				System.out.println("filePath : " + filePath);
				System.out.println("prevPath : " + prevPath);
						
				product.setPhoto("./resources/images/product/" + currentTime + imageFile.getOriginalFilename());
				
				prevFile.delete();
				imageFile.transferTo(resultFile);
				result.put("photo", product.getPhoto());
			}
			
			System.out.println(product);
			
			productService.updateProduct(product);
			
			result.put("status", "success");
		} catch(Exception e) {
			e.printStackTrace();
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
  
  @RequestMapping(path = "decreaseProdEnt", produces = "application/json;charset=utf-8")
  @ResponseBody
  public String decreaseProdEnt(@RequestParam(value="prodNo") List<Integer> prodNo,
                                @RequestParam(value="prodEnt") List<Integer> prodEnt){

    System.out.println(prodNo+".."+prodEnt);
    
    List<Integer> beforeMinusEnt = productService.getProdEnt(prodNo);
    List<Integer> afterMinusEnt = new ArrayList<>();
    
    System.out.println("decreaseProdEnt start......");
    
    
    for(int i=0; i<prodEnt.size(); i++){
      afterMinusEnt.add(beforeMinusEnt.get(i) - prodEnt.get(i));
    }
    
    System.out.println(afterMinusEnt);
    
    List<Product> productList = new ArrayList<>();
    
    for(int i=0; i<prodNo.size(); i++){
      Product product = new Product();
      product.setEntity(afterMinusEnt.get(i));
      product.setNo(prodNo.get(i));
      productList.add(product);
    }
    
    System.out.println(productList);
    
    Map<String, Object> result = new HashMap<>();
    try {
      for(int i=0; i<productList.size(); i++){
        productService.updateProductEnd(productList.get(i));
      }
      result.put("prodEntUpdate", "success");
    } catch (Exception e) {
      e.printStackTrace();
      result.put("prodEntUpdate", "failure");
    }
    return new Gson().toJson(result);
  }
  
  
  @RequestMapping(path="updateProductInfo")
	@ResponseBody
	public String updateProductInfo(Product product,
							 HttpSession session) throws IOException {
		HashMap<String,Object> result = new HashMap<>();
		Mart mart = (Mart)session.getAttribute("adminMart");
		
		product.setMart(mart);
	
		try {			
			productService.updateProduct(product);
			
			result.put("status", "success");
		} catch(Exception e) {
			e.printStackTrace();
			result.put("status", "error");
		}
		
		return new Gson().toJson(result);
	}
  
}
