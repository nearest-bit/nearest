package org.nearest.domain;

import java.io.Serializable;
import java.util.List;

public class ProductOrder implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// Field
	protected List<Order> order;
	protected List<Product> product;
	protected int entity;
	
	// Getter, Setter
	public List<Order> getOrder() {
		return order;
	}
	public void setOrder(List<Order> order) {
		this.order = order;
	}
	public List<Product> getProduct() {
		return product;
	}
	public void setProduct(List<Product> product) {
		this.product = product;
	}
	public int getEntity() {
		return entity;
	}
	public void setEntity(int entity) {
		this.entity = entity;
	}
	
	@Override
	public String toString() {
		return "ProductOrder [order=" + order + ", product=" + product + ", entity=" + entity + "]";
	}
	
}
