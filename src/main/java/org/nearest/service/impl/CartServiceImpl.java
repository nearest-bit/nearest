package org.nearest.service.impl;

import org.nearest.dao.CartDao;
import org.nearest.domain.Cart;
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

}
