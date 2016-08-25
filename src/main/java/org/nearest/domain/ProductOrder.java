package org.nearest.domain;

import java.io.Serializable;

public class ProductOrder implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// Field
	protected Order order;
	protected Product product;
	protected int entity;
	
	// Getter, Setter
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
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
