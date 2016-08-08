package org.nearest.domain;

import java.io.Serializable;

public class Cart implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// Field
	protected Client client;
	protected Product product;
	
	// Getter, Setter
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	
	
}
