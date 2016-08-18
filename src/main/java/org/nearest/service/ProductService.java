package org.nearest.service;

import java.util.List;

import org.nearest.domain.Product;

public interface ProductService {
  
  List<Product> getProductList(int currentPage, int length, String searchContent);
  List<Product> getMartList(int currentPage, int length, String searchContent);
  int getTotal(String searchContent);
  int getTotalByMart(String searchContent);
  
  Product getProduct(int no);

}
