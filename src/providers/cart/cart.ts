import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  allItems:any=[];

  constructor(private storage:Storage) {
    console.log('Hello CartProvider Provider');
    //this.storage.clear();
  }

  initDB()
  {
    this.storage.get('cart').then((res)=>{
      if(res != null)
      {
        this.allItems = res;
      }
      console.log('init vart',this.allItems);
    });

    this.storage.get('cart-warung').then((res)=>{
      if(res != null)
      {
        this.allItems = res;
      }
      console.log('init vart',this.allItems);
    });

    //this.storage.remove('cart-warung');
  
  }

  addCart(id_produk,nama_produk,img_url,jumlah,harga,berat)
  {
    var timeStamp = new Date().toISOString(),
        item = {
          _id : timeStamp,
          id_produk : id_produk,
          nama_produk : nama_produk,
          img_url : img_url,
          jumlah : jumlah,
          harga : harga,
          berat : berat
        };
    
   
    this.allItems.push(item);
    
    return new Promise(resolve =>{
   
      this.storage.set('cart',this.allItems).then((res)=> {
        console.log('hasil cart', res);
        resolve(true);
      }).catch((err)=>{
        console.log(this.allItems);
        resolve(false);
      })
      
    });
  }

  updateCart(id,id_produk,nama_produk,img_url,jumlah,harga,berat,revisi)
  {

    var  comic    = {
             _id       : id,
             id_produk : id_produk,
             _rev        : revisi,
             nama_produk : nama_produk,
             img_url      : img_url,
             jumlah        : jumlah,
             harga : harga,
             berat : berat
          };

    return new Promise(resolve =>{
      this.storage.get('cart').then((res)=>{
        let items = res;

        for(var i in items)
        {
          if(items[i].id_produk == id_produk)
          {
            items[i].jumlah = jumlah;
            items[i].harga = harga;
            items[i].berat = berat;
            
            this.storage.set('cart',items);

            break;
          }
        }
        resolve(true);
      })
    });
  }

  deleteCart(id,rev)
  {
    return new Promise(resolve =>{
      this.storage.get('cart').then((res)=>{
        var items:any = res;
        //let test = [];
        var idx:number=0;
        console.log('id yg d delete',id);
        for(var i in items)
        {
          if(items[i]._id == id)
          {
            items.splice(idx,1);

            this.storage.set('cart',items);
            break;
          }
          idx++;
        }
      });
      resolve(true);
      
    });
  }

  clearCart()
  {
    return new Promise(resolve =>{
     
      this.storage.remove('cart');
     
      resolve(true);
    });
  }

  cekAdaProduk(id)
  {
    return new Promise(resolve =>{
      var isAda:boolean=false;
      this.storage.get('cart').then((res)=>{
        if(res != null)
        {
          let items = res;
          for(var i in items)
          {
            if(items[i].id_produk == id)
            {
              console.log('barang sama');
              isAda = true
              break;
            } 
          }
        } else {
          isAda = false;
        }
        resolve(isAda);
      });
    });
    
  }

  showCart() {  
    return new Promise(resolve =>
    {
      this.storage.get('cart').then((res)=>{
        resolve(res);
      })
    });
  }



  //cart warungg
  addCartWwarung(id_produk,nama_produk,nama_warung,jumlah,harga,berat)
  {
    var timeStamp = new Date().toISOString(),
        item = {
          _id : timeStamp,
          id_produk_warung : id_produk,
          nama_produk : nama_produk,
          nama_warung : nama_warung,
          jumlah : jumlah,
          harga : harga,
          berat : berat
        };
    
   
    this.allItems.push(item);
    
    return new Promise(resolve =>{
   
      this.storage.set('cart-warung',this.allItems).then((res)=> {
        console.log('hasil cart', res);
        resolve(true);
      }).catch((err)=>{
        console.log(this.allItems);
        resolve(false);
      })
      
    });
  }

  updateCartWarung(id,id_produk,nama_produk,img_url,jumlah,harga,berat,revisi)
  {

    var  comic    = {
             _id       : id,
             id_produk : id_produk,
             _rev        : revisi,
             nama_produk : nama_produk,
             img_url      : img_url,
             jumlah        : jumlah,
             harga : harga,
             berat : berat
          };

    return new Promise(resolve =>{
      this.storage.get('cart-warung').then((res)=>{
        let items = res;

        for(var i in items)
        {
          if(items[i].id_produk == id_produk)
          {
            items[i].jumlah = jumlah;
            items[i].harga = harga;
            items[i].berat = berat;
            
            this.storage.set('cart-warung',items);

            break;
          }
        }
        resolve(true);
      })
    });
  }

  deleteCartWarung(id,rev)
  {
    return new Promise(resolve =>{
      this.storage.get('cart-warung').then((res)=>{
        var items:any = res;
        //let test = [];
        var idx:number=0;
        console.log('id yg d delete',id);
        for(var i in items)
        {
          if(items[i].id_produk_warung == id)
          {
            items.splice(idx,1);

            this.storage.set('cart-warung',items);
            break;
          }
          idx++;
        }
      });
      resolve(true);
      
    });
  }

  clearCartWarung()
  {
    return new Promise(resolve =>{
     
      this.storage.remove('cart-warung');
     
      resolve(true);
    });
  }

  cekAdaProdukWarung(id)
  {
    return new Promise(resolve =>{
      var isAda:boolean=false;
      this.storage.get('cart-warung').then((res)=>{
        if(res != null)
        {
          let items = res;
          for(var i in items)
          {
            if(items[i].id_produk_warung == id)
            {
              console.log('barang sama');
              isAda = true
              break;
            } 
          }
        } else {
          isAda = false;
        }
        resolve(isAda);
      });
    });
    
  }

  showCartWarung() {  
    return new Promise(resolve =>
    {
      this.storage.get('cart-warung').then((res)=>{
        resolve(res);
      })
    });
  }


}
