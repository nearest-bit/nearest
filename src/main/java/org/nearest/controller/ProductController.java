package org.nearest.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
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
    	searchContent = ((Mart)session.getAttribute("adminMart")).getName();
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
				
				filePath = realPath + "\\" + currentTime + imageFile.getOriginalFilename();
				resultFile = new File(filePath);
						
				product.setPhoto("./resources/images/product/" + currentTime + imageFile.getOriginalFilename());
				
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
							 HttpSession session) throws IOException {
		HashMap<String,Object> result = new HashMap<>();
		product.setMart((Mart)session.getAttribute("adminMart"));
		
		System.out.println(imageFiles.get(0).getOriginalFilename());
				
		MultipartFile imageFile = null;
		String realPath = session.getServletContext().getRealPath("/resources/images/product");
		String filePath = null;
		File resultFile = null;
		File prevFile = null;
		
		String prevPath = realPath + (productService.getProduct(product.getNo()).getPhoto()).replace("./resources/images/product/", "\\");
		
		String currentTime = String.valueOf(System.currentTimeMillis()); 
		
		File folder = new File(realPath);
		
		if(!folder.exists()) {
			folder.mkdir();
		}
	
		try {
		
			if(imageFiles != null) {
				imageFile = imageFiles.get(0);
				
				filePath = realPath + "\\" + currentTime + URLEncoder.encode(imageFile.getOriginalFilename(), "utf-8");
				resultFile = new File(filePath);
				prevFile = new File(prevPath);
				
				System.out.println("filePath : " + filePath);
				System.out.println("prevPath : " + prevPath);
						
				product.setPhoto("./resources/images/product/" + currentTime + URLEncoder.encode(imageFile.getOriginalFilename(), "utf-8"));
				
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
}
