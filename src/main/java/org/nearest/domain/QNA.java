package org.nearest.domain;

import java.io.Serializable;
import java.sql.Date;
import org.nearest.domain.Mart;
import org.nearest.domain.Client;

public class QNA implements Serializable{
  
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected Date createDate;
  protected String content;
  protected int status;
  protected String replyContent;
  protected Date replyDate;
  protected Mart mart;
  protected Client client;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public Date getCreateDate() {
    return createDate;
  }
  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public int getStatus() {
    return status;
  }
  public void setStatus(int status) {
    this.status = status;
  }
  public String getReplyContent() {
    return replyContent;
  }
  public void setReplyContent(String replyContent) {
    this.replyContent = replyContent;
  }
  public Date getReplyDate() {
    return replyDate;
  }
  public void setReplyDate(Date replyDate) {
    this.replyDate = replyDate;
  }
  public Mart getMart() {
    return mart;
  }
  public void setMart(Mart mart) {
    this.mart = mart;
  }
  public Client getClient() {
    return client;
  }
  public void setClient(Client client) {
    this.client = client;
  }

}
