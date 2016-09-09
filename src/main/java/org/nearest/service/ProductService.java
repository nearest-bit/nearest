package org.nearest.service;

import java.util.List;

import org.nearest.domain.Product;

public interface ProductService {
  
  List<Product> getProductList(int currentPage, int length, String searchContent, String searchLat, String searchLng);
  List<Product> getMartList(int currentPage, int length, String searchContent);
  int getTotal(String searchContent);
  int getTotalByMart(String searchContent);
  List<Product> getMartCategoryList(int currentPage, int length, String martNo, String majorCat, String subCat);
  Product getProduct(int no);
  void addProduct(Product product);
  int updateProduct(Product product);
}
