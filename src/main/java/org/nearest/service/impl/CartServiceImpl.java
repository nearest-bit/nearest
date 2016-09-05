package org.nearest.service.impl;

import java.util.List;
import java.util.Map;

import org.nearest.dao.CartDao;
import org.nearest.domain.Cart;
import org.nearest.domain.Product;
import org.nearest.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired CartDao cartDao;

	@Override
	public void addCart(Cart cart) {
		cartDao.insertCart(cart);
	}

  @Override
  public List<Product> getCart(int clientNo) {
    // TODO Auto-generated method stub
    return cartDao.selectCartList(clientNo);
  }

  @Override
  public void removeCart(Map<String, Object> params) {
    cartDao.deleteCart(params);
  }

  @Override
  public void removeCartList(int clientNo) {
    cartDao.deleteCartList(clientNo);
  }

}
