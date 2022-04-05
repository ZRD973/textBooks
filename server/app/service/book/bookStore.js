"use strict";
const Service = require("egg").Service;
const { Op } = require("sequelize");
class BookStoreService extends Service {
  async operateRecord(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    const { flag, data } = body;
    if (flag == 1) {
      data.apply = 1;
      data.created_at = new Date();
      data.updated_at = new Date();
      data.created_id = userid;
      try {
        const res = await ctx.model.Book.BookStore.create(data);
        return res;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else if (flag == 3) {
      try {
        const record = await ctx.model.Book.BookStore.findByPk(data.id);
        if(data.store_id && data.apply==3){
            const result = await ctx.model.Book.Store.findByPk(data.store_id);
            await record.update({apply: data.apply, updated_at: new Date()});
            let total = record.dataValues.book_total + result.dataValues.book_total;
            const res = await result.update({book_total:total, updated_at: new Date()},{
                where:{ s_id:data.store_id }
            })
            return res;
        }else if(data.apply==3){
            record.dataValues.record_id = data.id;
            const result = await ctx.model.Book.Store.create(record.dataValues);
            const res = await record.update( { apply: data.apply, store_id:result.s_id, updated_at: new Date() },
                {  where: { id: data.id }, } );
            return res;
        }else{
           const res = await record.update( { apply: data.apply, updated_at: new Date() },
            {  where: { id: data.id }, } );
            return res;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
        let limit = body.limit;
        let page = body.page;
        let store = body.store;
        let record = body.record;
        if (!limit) { limit = 8 }
        if (!page) { page = 1 }
        let where = {};
        // where.apply = { [Op.ne]:4 }
        if (store) { where.apply = 3 } 
        if (record) { where.apply = { [Op.in]: [3,4]} } 
        //   else { where.apply = { [Op.ne]: 3 } }
        if(body.role == "teacher"){ where.created_id = userid}
        if(body.book){ where.book = { [Op.like]: `%${body.book}%` }; }
        if(body.ISBN){ where.ISBN = { [Op.like]: `%${body.ISBN}%` }; }
        if(body.teacher){ where.teacher = { [Op.like]: `%${body.teacher}%` }; }
        if(body.apply){ where.apply = body.apply }
        try {
            const res = await ctx.model.Book.BookStore.findAndCountAll({
                offset: (page - 1) * limit,
                limit: parseInt(limit),
                where,
                // order:['apply']
            });
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
  }


  async operateStore(body){
    const { ctx } =this;
    const { userid } = ctx.state.user;
    if(body.flag == 3){
        try { 
            body.data.updated_at = new Date();
            const res = await ctx.model.Book.Store.update({book_total:body.data.book_total},{
                where:{ s_id : body.data.s_id}
            });
            if(res){
                delete body.record.id;
                body.record.created_id = userid;
                body.record.apply = 4;
                body.record.updated_at = new Date();
                body.record.created_at = new Date();
                await ctx.model.Book.BookStore.create(body.record)
            }
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }



    }else{

        let limit = body.limit;
        let page = body.page;
        if (!limit) { limit = 8 }
        if (!page) { page = 1 }
        let where = {};
        if(body.book){ where.book = { [Op.like]: `%${body.book}%` }; }
        if(body.ISBN){ where.ISBN = { [Op.like]: `%${body.ISBN}%` }; }
        try {
            const res = await ctx.model.Book.Store.findAndCountAll({
            offset: (page - 1) * limit,
            limit: parseInt(limit),
            where,
        });
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

  }


  async continueRecord(body){
    const { ctx } =this;
    const { userid } = ctx.state.user;
    try {
        // const res = await ctx.model.Book.BookStore.create()
    } catch (error) {
        console.log(error);
        return null;
    }
  }

}
module.exports = BookStoreService;
