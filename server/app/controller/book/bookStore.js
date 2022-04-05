'use strict';

const Controller = require('../base');

class BookStoreController extends Controller {
  async operateRecord() {
    const { ctx } = this;
    let body = ctx.request.body;

    const res = await ctx.service.book.bookStore.operateRecord(body);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }


  async operateStore() {
    const { ctx } = this;
    let body = ctx.request.body;

    const res = await ctx.service.book.bookStore.operateStore(body);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }

  async continueRecord() {
    const { ctx } = this;
    let body = ctx.request.body;

    const res = await ctx.service.book.bookStore.continueRecord(body);
    if (res) {
      this.success(res);
    } else {
      this.error('失败！');
    }
  }


  async analyseApply(){
    const { ctx } = this;
    let body = ctx.request.body;
    const apply = await ctx.model.Book.BookStore.findAll()
    const store = await ctx.model.Book.Store.findAll()
    let data = { apply,store }
    if (apply && store) {
      this.success(data);
    } else {
      this.error('失败！');
    }
  }


}
module.exports = BookStoreController;