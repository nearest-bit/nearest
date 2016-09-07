package org.nearest.dao;

import java.util.List;
import java.util.Map;

import org.nearest.domain.Product;

public interface ProductDao {
  List<Product> selectProdList(Map<String, Object> params);
  List<Product> selectMartList(Map<String, Object> params);
  int selectProdTotal(String searchContent);
  int selectProdTotalByMart(String searchContent);
  List<Product> selectMartCategoryList(Map<String, Object> params);
  Product selectProd(int no);
  void insertProd(Product product);
  int updateProd(Product product);
}
