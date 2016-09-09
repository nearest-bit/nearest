package org.nearest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.nearest.dao.ProductDao;
import org.nearest.domain.Product;
import org.nearest.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

  @Autowired
  ProductDao productDao;
  
  @Override
  public List<Product> getProductList(int currentPage, int length, String searchContent, String searchLat, String searchLng) {
     Map<String, Object> params = new HashMap<>();
     params.put("startIndex", (currentPage - 1) * length);
     params.put("len", length);
     params.put("prodName", searchContent);
     params.put("searchLat", searchLat);
     params.put("searchLng", searchLng);
     return productDao.selectProdList(params);
  }

  @Override
  public List<Product> getMartList(int currentPage, int length, String searchContent) {
      Map<String, Object> params = new HashMap<>();
      params.put("startIndex", (currentPage - 1) * length);
      params.put("len", length);
      params.put("martName", searchContent);
      return productDao.selectMartList(params);
  }

  @Override
  public int getTotal(String searchContent) {
    return productDao.selectProdTotal(searchContent);
  }

  @Override
  public int getTotalByMart(String searchContent) {
    return productDao.selectProdTotalByMart(searchContent);
  }

  @Override
  public Product getProduct(int no) {
	  return productDao.selectProd(no);
  }
  
  @Override
  public void addProduct(Product product) {
	  productDao.insertProd(product);
  }
  
  @Override
  public int updateProduct(Product product) {
	  return productDao.updateProd(product);
  }

  @Override
  public List<Product> getMartCategoryList(int currentPage, int length, String martNo, String majorCat, String subCat) {
    Map<String, Object> params = new HashMap<>();
    params.put("startIndex", (currentPage - 1) * length);
    params.put("len", length);
    params.put("martNo", martNo);
    params.put("majorCat", majorCat);
    params.put("subCat", subCat);
    return productDao.selectMartCategoryList(params);
  }
}
